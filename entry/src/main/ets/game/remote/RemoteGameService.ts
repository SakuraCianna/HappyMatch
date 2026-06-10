import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';
import { BackendHttpClient } from './BackendHttpClient';
import {
  FriendLevelScore,
  LeaderboardEntry,
  LocationSummary,
  NearbyPlayer,
  NearbySummary,
  RemoteFriend,
  RemotePlayer,
  RemoteState,
  AuthSession,
  WorldPopulation
} from './RemoteModels';

const STORE_NAME = 'happy_match_remote';
const KEY_AUTH_TOKEN = 'auth_token';

interface UpdatePlayerRequest {
  nickname?: string;
  coin?: number;
  current_level?: number;
}

interface LevelRecordRequest {
  level_id: number;
  score: number;
  stars: number;
  best_combo: number;
  moves_left: number;
}

interface FriendAddRequest {
  friend_code: string;
}

interface AuthRegisterRequest {
  nickname: string;
  password: string;
}

interface AuthLoginRequest {
  nickname: string;
  password: string;
}

interface PresenceRequest {
  player_id: string;
  world_id: number;
  level_id: number;
  region_key: string;
  latitude?: number;
  longitude?: number;
}

export class RemoteGameService {
  private client: BackendHttpClient = new BackendHttpClient();
  private store?: preferences.Preferences;
  private player?: RemotePlayer;
  private authToken: string = '';
  private location?: LocationSummary;
  private state: RemoteState = {
    connected: false,
    authenticated: false,
    nearbyPlayers: 0,
    regionKey: '',
    message: '请登录玩家'
  };

  async init(context: common.Context): Promise<RemoteState> {
    await this.ensureStore(context);
    if (this.authToken.length === 0) {
      this.authToken = await this.savedString(KEY_AUTH_TOKEN);
      this.client.setAuthToken(this.authToken);
    }
    if (!this.player && this.authToken.length > 0) {
      const player = await this.client.get<RemotePlayer>('/auth/me');
      if (player) {
        this.player = player;
      } else {
        await this.clearSession();
      }
    }
    if (this.player) {
      this.state.connected = true;
      this.state.authenticated = this.authToken.length > 0;
      this.state.player = this.player;
      this.state.message = `玩家 ${this.player.nickname}`;
    } else {
      this.state.connected = false;
      this.state.authenticated = false;
      this.state.player = undefined;
      this.state.message = this.authToken.length > 0 ? '登录状态失效, 请重新登录' : '请登录玩家';
    }
    return this.getState();
  }

  getState(): RemoteState {
    return {
      connected: this.state.connected,
      player: this.player,
      authenticated: this.state.authenticated,
      nearbyPlayers: this.state.nearbyPlayers,
      regionKey: this.state.regionKey,
      message: this.state.message
    };
  }

  hasAuthenticatedPlayer(): boolean {
    return this.player !== undefined && this.state.authenticated;
  }

  getLocation(): LocationSummary | undefined {
    return this.location;
  }

  async syncPlayerProgress(currentLevel: number, coins: number): Promise<void> {
    const player = this.player;
    if (!player) {
      return;
    }
    const payload: UpdatePlayerRequest = {
      current_level: Math.max(1, Math.min(100, currentLevel)),
      coin: Math.max(0, coins)
    };
    const updated = await this.client.put<RemotePlayer>(`/players/${player.id}`, payload as Object);
    if (updated) {
      this.player = updated;
      this.state.player = updated;
    }
  }

  async uploadLevelRecord(levelId: number, score: number, stars: number, bestCombo: number, movesLeft: number): Promise<void> {
    const player = this.player;
    if (!player) {
      return;
    }
    const payload: LevelRecordRequest = {
      level_id: levelId,
      score,
      stars,
      best_combo: bestCombo,
      moves_left: movesLeft
    };
    await this.client.post<Object>(`/players/${player.id}/records`, payload as Object);
  }

  async refreshLocation(): Promise<LocationSummary | undefined> {
    const location = await this.client.get<LocationSummary>('/map/location/ip');
    if (location) {
      this.location = location;
      this.state.regionKey = location.region_key;
    }
    return location;
  }

  async updatePresence(worldId: number, levelId: number): Promise<NearbySummary | undefined> {
    const player = this.player;
    if (!player) {
      return undefined;
    }
    if (!this.location) {
      await this.refreshLocation();
    }
    const regionKey = this.location?.region_key ?? `world:${worldId}`;
    const payload: PresenceRequest = {
      player_id: player.id,
      world_id: worldId,
      level_id: levelId,
      region_key: regionKey
    };
    const latitude = this.location?.latitude;
    const longitude = this.location?.longitude;
    if (typeof latitude === 'number' && typeof longitude === 'number') {
      payload.latitude = latitude;
      payload.longitude = longitude;
    }
    const nearby = await this.client.post<NearbySummary>('/map/presence', payload as Object);
    if (nearby) {
      this.state.connected = true;
      this.state.nearbyPlayers = nearby.active_players;
      this.state.regionKey = nearby.region_key ?? regionKey;
      this.state.message = `附近 ${nearby.active_players} 人`;
    }
    return nearby;
  }

  async listWorldPopulation(): Promise<WorldPopulation[]> {
    const result = await this.client.get<WorldPopulation[]>('/map/worlds');
    return result ?? [];
  }

  async listNearbyPlayers(worldId: number): Promise<NearbyPlayer[]> {
    const regionKey = this.state.regionKey;
    if (regionKey.length === 0) {
      return [];
    }
    const result = await this.client.get<NearbyPlayer[]>(
      `/map/nearby/players?region_key=${encodeURIComponent(regionKey)}&world_id=${worldId}&include_self=true`
    );
    return result ?? [];
  }

  async fetchMapSnapshot(worldId: number, cacheKey: number): Promise<ArrayBuffer | undefined> {
    const regionKey = this.state.regionKey;
    const regionQuery = regionKey.length > 0 ? `region_key=${encodeURIComponent(regionKey)}&` : '';
    return this.client.getArrayBuffer(`/map/static?${regionQuery}world_id=${worldId}&t=${cacheKey}`);
  }

  async listLeaderboard(scope: string = 'stars'): Promise<LeaderboardEntry[]> {
    const result = await this.client.get<LeaderboardEntry[]>(`/leaderboard?scope=${scope}`);
    return result ?? [];
  }

  async listFriends(): Promise<RemoteFriend[]> {
    const player = this.player;
    if (!player) {
      return [];
    }
    const result = await this.client.get<RemoteFriend[]>(`/friends/${player.id}`);
    return result ?? [];
  }

  async listFriendLevelScores(levelId: number): Promise<FriendLevelScore[]> {
    const player = this.player;
    if (!player) {
      return [];
    }
    const safeLevelId = Math.max(1, Math.min(100, levelId));
    const result = await this.client.get<FriendLevelScore[]>(`/friends/${player.id}/levels/${safeLevelId}/scores`);
    return result ?? [];
  }

  async addFriend(friendCode: string): Promise<RemoteFriend | undefined> {
    const player = this.player;
    if (!player) {
      return undefined;
    }
    const code = friendCode.trim().toUpperCase();
    if (code.length === 0) {
      return undefined;
    }
    const payload: FriendAddRequest = { friend_code: code };
    return this.client.post<RemoteFriend>(`/friends/${player.id}`, payload as Object);
  }

  async registerAccount(nickname: string, password: string): Promise<boolean> {
    const payload: AuthRegisterRequest = {
      nickname: nickname.trim(),
      password
    };
    const session = await this.client.post<AuthSession>('/auth/register', payload as Object);
    return this.applyAuthSession(session);
  }

  async loginAccount(nickname: string, password: string): Promise<boolean> {
    const payload: AuthLoginRequest = {
      nickname: nickname.trim(),
      password
    };
    const session = await this.client.post<AuthSession>('/auth/login', payload as Object);
    return this.applyAuthSession(session);
  }

  async logoutAccount(): Promise<void> {
    await this.clearSession();
  }

  private async applyAuthSession(session: AuthSession | undefined): Promise<boolean> {
    if (!session) {
      return false;
    }
    this.authToken = session.access_token;
    this.client.setAuthToken(this.authToken);
    this.player = session.player;
    this.state.connected = true;
    this.state.authenticated = true;
    this.state.player = session.player;
    this.state.message = `玩家 ${session.player.nickname}`;
    await this.saveAuthToken(session.access_token);
    return true;
  }

  private async saveAuthToken(token: string): Promise<void> {
    if (!this.store) {
      return;
    }
    try {
      await this.store.put(KEY_AUTH_TOKEN, token);
      await this.store.flush();
    } catch (_error) {
    }
  }

  private async clearSession(): Promise<void> {
    this.authToken = '';
    this.client.setAuthToken('');
    this.player = undefined;
    this.state.connected = false;
    this.state.authenticated = false;
    this.state.player = undefined;
    this.state.nearbyPlayers = 0;
    this.state.regionKey = '';
    this.state.message = '请登录玩家';
    if (!this.store) {
      return;
    }
    try {
      await this.store.delete(KEY_AUTH_TOKEN);
      await this.store.delete('player_id');
      await this.store.delete('friend_code');
      await this.store.delete('nickname');
      await this.store.flush();
    } catch (_error) {
    }
  }

  private async ensureStore(context: common.Context): Promise<void> {
    if (this.store) {
      return;
    }
    try {
      this.store = await preferences.getPreferences(context, STORE_NAME);
    } catch (_error) {
      this.store = undefined;
    }
  }

  private async savedString(key: string): Promise<string> {
    if (!this.store) {
      return '';
    }
    try {
      const value = await this.store.get(key, '');
      if (typeof value === 'string') {
        return value;
      }
    } catch (_error) {
    }
    return '';
  }
}

export const remoteGameService = new RemoteGameService();
