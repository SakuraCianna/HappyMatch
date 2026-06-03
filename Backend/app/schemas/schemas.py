from datetime import datetime
from typing import Literal

from sqlmodel import Field, SQLModel


class PlayerUpdate(SQLModel):
  nickname: str | None = Field(default=None, max_length=32)
  avatar: str | None = Field(default=None, max_length=255)
  coin: int | None = Field(default=None, ge=0)
  current_level: int | None = Field(default=None, ge=1, le=100)


class PlayerPublic(SQLModel):
  id: str
  nickname: str
  avatar: str | None
  friend_code: str
  coin: int
  current_level: int
  highest_level: int
  total_stars: int
  total_score: int
  last_seen_at: datetime
  created_at: datetime
  updated_at: datetime


class AuthRegisterRequest(SQLModel):
  nickname: str = Field(min_length=1, max_length=32)
  password: str = Field(min_length=6, max_length=72)


class AuthLoginRequest(SQLModel):
  nickname: str = Field(min_length=1, max_length=32)
  password: str = Field(min_length=6, max_length=72)


class AuthSession(SQLModel):
  access_token: str
  token_type: str
  expires_at: int
  player: PlayerPublic


class LevelRecordCreate(SQLModel):
  level_id: int = Field(ge=1, le=100)
  score: int = Field(default=0, ge=0)
  stars: int = Field(default=0, ge=0, le=3)
  best_combo: int = Field(default=0, ge=0)
  moves_left: int = Field(default=0, ge=0)


class LevelRecordPublic(SQLModel):
  id: int
  player_id: str
  level_id: int
  score: int
  stars: int
  best_combo: int
  moves_left: int
  updated_at: datetime


class FriendAddRequest(SQLModel):
  friend_code: str = Field(min_length=4, max_length=16)


class FriendPublic(SQLModel):
  id: str
  nickname: str
  avatar: str | None
  friend_code: str
  current_level: int
  highest_level: int
  total_stars: int
  total_score: int
  last_seen_at: datetime


class LeaderboardEntry(SQLModel):
  rank: int
  player_id: str
  nickname: str
  avatar: str | None
  current_level: int
  highest_level: int
  total_stars: int
  total_score: int


class PresenceUpdate(SQLModel):
  player_id: str
  world_id: int = Field(default=1, ge=1, le=5)
  level_id: int = Field(default=1, ge=1, le=100)
  region_key: str | None = Field(default=None, max_length=64)
  latitude: float | None = Field(default=None, ge=-90, le=90)
  longitude: float | None = Field(default=None, ge=-180, le=180)


class NearbySummary(SQLModel):
  region_key: str | None
  world_id: int | None
  level_id: int | None
  active_players: int
  active_window_seconds: int


class WorldPopulation(SQLModel):
  world_id: int
  active_players: int


class LocationSummary(SQLModel):
  region_key: str
  source: str
  province: str | None = None
  city: str | None = None
  adcode: str | None = None
  rectangle: str | None = None
  longitude: float | None = None
  latitude: float | None = None


LeaderboardScope = Literal["stars", "level", "score"]
