import secrets
import string

from fastapi import HTTPException, status
from sqlmodel import Session, select

from app.core.config import settings
from app.models.entities import LevelRecord, Player, utc_now
from app.schemas.schemas import LevelRecordCreate, PlayerUpdate

FRIEND_CODE_ALPHABET = string.ascii_uppercase.replace("O", "").replace("I", "") + "23456789"


def model_data(model: object, exclude_unset: bool = False) -> dict[str, object]:
  if hasattr(model, "model_dump"):
    return model.model_dump(exclude_unset=exclude_unset)
  return model.dict(exclude_unset=exclude_unset)


def generate_friend_code(session: Session) -> str:
  length = max(4, settings.friend_code_length)
  for _ in range(40):
    code = "".join(secrets.choice(FRIEND_CODE_ALPHABET) for _ in range(length))
    existing = session.exec(select(Player).where(Player.friend_code == code)).first()
    if existing is None:
      return code
  raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to allocate friend code.")


def get_player_or_404(session: Session, player_id: str) -> Player:
  player = session.get(Player, player_id)
  if player is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Player not found.")
  return player


def touch_player(player: Player) -> None:
  now = utc_now()
  player.last_seen_at = now
  player.updated_at = now


def update_player(session: Session, player_id: str, payload: PlayerUpdate) -> Player:
  player = get_player_or_404(session, player_id)
  data = model_data(payload, exclude_unset=True)
  if "nickname" in data and data["nickname"] is not None:
    player.nickname = str(data["nickname"]).strip()[:32] or player.nickname
  if "avatar" in data:
    player.avatar = data["avatar"] if data["avatar"] is None else str(data["avatar"])
  if "coin" in data and data["coin"] is not None:
    player.coin = max(0, int(data["coin"]))
  if "current_level" in data and data["current_level"] is not None:
    player.current_level = max(1, int(data["current_level"]))
    player.highest_level = max(player.highest_level, player.current_level)
  touch_player(player)
  session.add(player)
  session.commit()
  session.refresh(player)
  return player


def recalculate_player_totals(session: Session, player: Player) -> None:
  records = session.exec(select(LevelRecord).where(LevelRecord.player_id == player.id)).all()
  player.total_stars = sum(record.stars for record in records)
  player.total_score = sum(record.score for record in records)
  completed_levels = [record.level_id for record in records if record.stars > 0]
  if completed_levels:
    player.highest_level = max(player.highest_level, max(completed_levels))
    player.current_level = max(player.current_level, min(100, max(completed_levels) + 1))
  touch_player(player)
  session.add(player)


def upsert_level_record(session: Session, player_id: str, payload: LevelRecordCreate) -> LevelRecord:
  player = get_player_or_404(session, player_id)
  statement = select(LevelRecord).where(
    LevelRecord.player_id == player_id,
    LevelRecord.level_id == payload.level_id
  )
  record = session.exec(statement).first()
  if record is None:
    record = LevelRecord(
      player_id=player_id,
      level_id=payload.level_id,
      score=payload.score,
      stars=payload.stars,
      best_combo=payload.best_combo,
      moves_left=payload.moves_left
    )
  else:
    record.score = max(record.score, payload.score)
    record.stars = max(record.stars, payload.stars)
    record.best_combo = max(record.best_combo, payload.best_combo)
    record.moves_left = max(record.moves_left, payload.moves_left)
  record.updated_at = utc_now()
  session.add(record)
  session.flush()
  recalculate_player_totals(session, player)
  session.commit()
  session.refresh(record)
  return record
