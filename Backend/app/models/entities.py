from datetime import datetime, timezone
from uuid import uuid4

from sqlalchemy import UniqueConstraint
from sqlmodel import Field, SQLModel


def utc_now() -> datetime:
  return datetime.now(timezone.utc)


def new_id() -> str:
  return uuid4().hex


class Player(SQLModel, table=True):
  __tablename__ = "players"
  __table_args__ = (UniqueConstraint("friend_code", name="uq_players_friend_code"),)

  id: str = Field(default_factory=new_id, primary_key=True)
  nickname: str = Field(index=True, max_length=32)
  avatar: str | None = Field(default=None, max_length=255)
  friend_code: str = Field(index=True, max_length=16)
  coin: int = Field(default=0)
  current_level: int = Field(default=1, index=True)
  highest_level: int = Field(default=1, index=True)
  total_stars: int = Field(default=0, index=True)
  total_score: int = Field(default=0, index=True)
  last_seen_at: datetime = Field(default_factory=utc_now, index=True)
  created_at: datetime = Field(default_factory=utc_now)
  updated_at: datetime = Field(default_factory=utc_now)


class LevelRecord(SQLModel, table=True):
  __tablename__ = "level_records"
  __table_args__ = (UniqueConstraint("player_id", "level_id", name="uq_level_records_player_level"),)

  id: int | None = Field(default=None, primary_key=True)
  player_id: str = Field(foreign_key="players.id", index=True)
  level_id: int = Field(index=True)
  score: int = Field(default=0)
  stars: int = Field(default=0)
  best_combo: int = Field(default=0)
  moves_left: int = Field(default=0)
  updated_at: datetime = Field(default_factory=utc_now, index=True)


class Friendship(SQLModel, table=True):
  __tablename__ = "friendships"
  __table_args__ = (UniqueConstraint("player_id", "friend_id", name="uq_friendships_pair"),)

  id: int | None = Field(default=None, primary_key=True)
  player_id: str = Field(foreign_key="players.id", index=True)
  friend_id: str = Field(foreign_key="players.id", index=True)
  created_at: datetime = Field(default_factory=utc_now)


class PlayerPresence(SQLModel, table=True):
  __tablename__ = "player_presence"
  __table_args__ = (UniqueConstraint("player_id", name="uq_presence_player"),)

  id: int | None = Field(default=None, primary_key=True)
  player_id: str = Field(foreign_key="players.id", index=True)
  world_id: int = Field(default=1, index=True)
  level_id: int = Field(default=1, index=True)
  region_key: str = Field(index=True, max_length=64)
  latitude: float | None = Field(default=None)
  longitude: float | None = Field(default=None)
  last_seen_at: datetime = Field(default_factory=utc_now, index=True)
