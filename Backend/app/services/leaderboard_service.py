from sqlmodel import Session, select

from app.models.entities import Player
from app.schemas.schemas import LeaderboardEntry, LeaderboardScope


def player_sort_value(player: Player, scope: LeaderboardScope) -> tuple[int, int, int]:
  if scope == "level":
    return (player.highest_level, player.total_stars, player.total_score)
  if scope == "score":
    return (player.total_score, player.total_stars, player.highest_level)
  return (player.total_stars, player.highest_level, player.total_score)


def list_leaderboard(session: Session, scope: LeaderboardScope, limit: int) -> list[LeaderboardEntry]:
  players = list(session.exec(select(Player)).all())
  players.sort(key=lambda player: player_sort_value(player, scope), reverse=True)
  entries: list[LeaderboardEntry] = []
  for index, player in enumerate(players[:limit], start=1):
    entries.append(LeaderboardEntry(
      rank=index,
      player_id=player.id,
      nickname=player.nickname,
      avatar=player.avatar,
      current_level=player.current_level,
      highest_level=player.highest_level,
      total_stars=player.total_stars,
      total_score=player.total_score
    ))
  return entries
