export interface RemotePlayer {
  id: string;
  nickname: string;
  avatar?: string;
  friend_code: string;
  coin: number;
  current_level: number;
  highest_level: number;
  total_stars: number;
  total_score: number;
  last_seen_at: string;
  created_at: string;
  updated_at: string;
}

export interface RemoteFriend {
  id: string;
  nickname: string;
  avatar?: string;
  friend_code: string;
  current_level: number;
  highest_level: number;
  total_stars: number;
  total_score: number;
  last_seen_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  player_id: string;
  nickname: string;
  avatar?: string;
  current_level: number;
  highest_level: number;
  total_stars: number;
  total_score: number;
}

export interface NearbySummary {
  region_key?: string;
  world_id?: number;
  level_id?: number;
  active_players: number;
  active_window_seconds: number;
}

export interface NearbyPlayer {
  player_id: string;
  nickname: string;
  friend_code: string;
  current_level: number;
  total_stars: number;
  world_id: number;
  level_id: number;
  region_key: string;
  latitude?: number | null;
  longitude?: number | null;
  last_seen_at: string;
  is_self: boolean;
}

export interface WorldPopulation {
  world_id: number;
  active_players: number;
}

export interface LocationSummary {
  region_key: string;
  source: string;
  province?: string;
  city?: string;
  adcode?: string;
  rectangle?: string;
  longitude?: number | null;
  latitude?: number | null;
}

export interface RemoteState {
  connected: boolean;
  player?: RemotePlayer;
  authenticated: boolean;
  nearbyPlayers: number;
  regionKey: string;
  message: string;
}

export interface AuthSession {
  access_token: string;
  token_type: string;
  expires_at: number;
  player: RemotePlayer;
}
