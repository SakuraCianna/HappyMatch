from fastapi import HTTPException, status
from sqlmodel import Session, select

from app.models.entities import Friendship, LevelRecord, Player
from app.schemas.schemas import FriendLevelScore, FriendPublic
from app.services.player_service import get_player_or_404


def friend_public(player: Player) -> FriendPublic:
  return FriendPublic(
    id=player.id,
    nickname=player.nickname,
    avatar=player.avatar,
    friend_code=player.friend_code,
    current_level=player.current_level,
    highest_level=player.highest_level,
    total_stars=player.total_stars,
    total_score=player.total_score,
    last_seen_at=player.last_seen_at
  )


def list_friends(session: Session, player_id: str) -> list[FriendPublic]:
  get_player_or_404(session, player_id)
  links = session.exec(select(Friendship).where(Friendship.player_id == player_id)).all()
  friends: list[FriendPublic] = []
  for link in links:
    player = session.get(Player, link.friend_id)
    if player is not None:
      friends.append(friend_public(player))
  friends.sort(key=lambda item: (-item.highest_level, -item.total_stars, item.nickname))
  return friends


def list_friend_level_scores(session: Session, player_id: str, level_id: int) -> list[FriendLevelScore]:
  get_player_or_404(session, player_id)
  links = session.exec(select(Friendship).where(Friendship.player_id == player_id)).all()
  allowed_player_ids = {player_id}
  for link in links:
    allowed_player_ids.add(link.friend_id)

  records = session.exec(select(LevelRecord).where(LevelRecord.level_id == level_id)).all()
  entries: list[FriendLevelScore] = []
  for record in records:
    if record.player_id not in allowed_player_ids:
      continue
    player = session.get(Player, record.player_id)
    if player is None:
      continue
    entries.append(FriendLevelScore(
      rank=0,
      player_id=player.id,
      nickname=player.nickname,
      avatar=player.avatar,
      friend_code=player.friend_code,
      level_id=record.level_id,
      score=record.score,
      stars=record.stars,
      best_combo=record.best_combo,
      moves_left=record.moves_left,
      is_self=player.id == player_id
    ))

  entries.sort(key=lambda item: (-item.score, -item.stars, -item.moves_left, -item.best_combo, item.nickname))
  for index, entry in enumerate(entries, start=1):
    entry.rank = index
  return entries


def add_friend_by_code(session: Session, player_id: str, friend_code: str) -> FriendPublic:
  player = get_player_or_404(session, player_id)
  code = friend_code.strip().upper()
  friend = session.exec(select(Player).where(Player.friend_code == code)).first()
  if friend is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Friend code not found.")
  if friend.id == player.id:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot add yourself.")

  existing = session.exec(
    select(Friendship).where(Friendship.player_id == player.id, Friendship.friend_id == friend.id)
  ).first()
  if existing is None:
    session.add(Friendship(player_id=player.id, friend_id=friend.id))
    session.add(Friendship(player_id=friend.id, friend_id=player.id))
    session.commit()
  return friend_public(friend)


def delete_friendship(session: Session, player_id: str, friend_id: str) -> None:
  get_player_or_404(session, player_id)
  get_player_or_404(session, friend_id)
  links = session.exec(
    select(Friendship).where(
      ((Friendship.player_id == player_id) & (Friendship.friend_id == friend_id)) |
      ((Friendship.player_id == friend_id) & (Friendship.friend_id == player_id))
    )
  ).all()
  for link in links:
    session.delete(link)
  session.commit()
