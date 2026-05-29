import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';
import { BackendHttpClient } from './BackendHttpClient';
import {
  LeaderboardEntry,
  LocationSummary,
  NearbySummary,
  RemoteFriend,
  RemotePlayer,
  RemoteState,
  WorldPopulation
} from './RemoteModels';

const STORE_NAME = 'happy_match_remote';
const KEY_PLAYER_ID = 'player_id';
const KEY_FRIEND_CODE = 'friend_code';
const KEY_NICKNAME = 'nickname';

interface CreatePlayerRequest {
  nickname: string;
}

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

interface PresenceRequest {
  player_id: string;
  world_id: number;
  level_id: number;
  region_key: string;
}

export class RemoteGameService {
  private client: BackendHttpClient = new BackendHttpClient();
  private store?: preferences.Preferences;
  private player?: RemotePlayer;
  private location?: LocationSummary;
  private state: RemoteState = {
    connected: false,
    nearbyPlayers: 0,
    regionKey: '',
    message: '云端未连接'
  };

  async init(context: common.Context): Promise<RemoteState> {
    await this.ensureStore(context);
    if (!this.player) {
      const savedPlayerId = await this.savedString(KEY_PLAYER_ID);
      if (savedPlayerId.length > 0) {
        const player = await this.client.get<RemotePlayer>(`/players/${savedPlayerId}`);
        if (player) {
          this.player = player;
        }
      }
    }
    if (!this.player) {
      await this.createGuestPlayer();
    }
    if (this.player) {
      this.state.connected = true;
      this.state.player = this.player;
      this.state.message = `云端 ${this.player.friend_code}`;
    }
    return this.getState();
  }

  getState(): RemoteState {
    return {
      connected: this.state.connected,
      player: this.player,
      nearbyPlayers: this.state.nearbyPlayers,
      regionKey: this.state.regionKey,
      message: this.state.message
    };
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
    const updated = await this.client.patch<RemotePlayer>(`/players/${player.id}`, payload as Object);
    if (updated) {
      this.player = updated;
      await this.savePlayer(updated);
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

  private async createGuestPlayer(): Promise<void> {
    const nickname = await this.savedString(KEY_NICKNAME);
    const payload: CreatePlayerRequest = {
      nickname: nickname.length > 0 ? nickname : '糖果玩家'
    };
    const player = await this.client.post<RemotePlayer>('/players/guest', payload as Object);
    if (player) {
      this.player = player;
      await this.savePlayer(player);
    } else {
      this.state = {
        connected: false,
        nearbyPlayers: 0,
        regionKey: '',
        message: '后端未启动'
      };
    }
  }

  private async savePlayer(player: RemotePlayer): Promise<void> {
    if (!this.store) {
      return;
    }
    try {
      await this.store.put(KEY_PLAYER_ID, player.id);
      await this.store.put(KEY_FRIEND_CODE, player.friend_code);
      await this.store.put(KEY_NICKNAME, player.nickname);
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
