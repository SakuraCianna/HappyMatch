from fastapi import APIRouter, Query

from app.api.deps import SessionDep
from app.schemas.schemas import NearbySummary, PresenceUpdate, WorldPopulation
from app.services import map_service

router = APIRouter()


@router.post("/presence", response_model=NearbySummary)
def update_presence(payload: PresenceUpdate, session: SessionDep) -> NearbySummary:
  return map_service.update_presence(session, payload)


@router.get("/nearby", response_model=NearbySummary)
def get_nearby(
  session: SessionDep,
  region_key: str | None = Query(default=None, max_length=64),
  world_id: int | None = Query(default=None, ge=1, le=5),
  level_id: int | None = Query(default=None, ge=1, le=100)
) -> NearbySummary:
  return map_service.nearby_summary(session, region_key, world_id, level_id)


@router.get("/worlds", response_model=list[WorldPopulation])
def get_world_population(session: SessionDep) -> list[WorldPopulation]:
  return map_service.world_population(session)
