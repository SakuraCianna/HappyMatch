from fastapi import APIRouter

from app.api.routes import friends, leaderboard, map_status, players

api_router = APIRouter()
api_router.include_router(players.router, prefix="/players", tags=["players"])
api_router.include_router(friends.router, prefix="/friends", tags=["friends"])
api_router.include_router(leaderboard.router, prefix="/leaderboard", tags=["leaderboard"])
api_router.include_router(map_status.router, prefix="/map", tags=["map"])
