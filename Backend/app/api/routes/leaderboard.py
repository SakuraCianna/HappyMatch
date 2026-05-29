from fastapi import APIRouter, Query

from app.api.deps import SessionDep
from app.schemas.schemas import LeaderboardEntry, LeaderboardScope
from app.services import leaderboard_service

router = APIRouter()


@router.get("", response_model=list[LeaderboardEntry])
def get_leaderboard(
  session: SessionDep,
  scope: LeaderboardScope = "stars",
  limit: int = Query(default=50, ge=1, le=100)
) -> list[LeaderboardEntry]:
  return leaderboard_service.list_leaderboard(session, scope, limit)
