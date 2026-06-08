from fastapi import APIRouter, HTTPException, Query, Response, status

from app.api.deps import AuthorizedPlayerIdDep, SessionDep, require_same_player
from app.schemas.schemas import LocationSummary, NearbyPlayer, NearbySummary, PresenceUpdate, WorldPopulation
from app.services import amap_service, map_service

router = APIRouter()


@router.post("/presence", response_model=NearbySummary)
def update_presence(
  payload: PresenceUpdate,
  session: SessionDep,
  authorized_player_id: AuthorizedPlayerIdDep
) -> NearbySummary:
  require_same_player(payload.player_id, authorized_player_id)
  return map_service.update_presence(session, payload)


@router.get("/nearby", response_model=NearbySummary)
def get_nearby(
  session: SessionDep,
  region_key: str | None = Query(default=None, max_length=64),
  world_id: int | None = Query(default=None, ge=1, le=5),
  level_id: int | None = Query(default=None, ge=1, le=100)
) -> NearbySummary:
  return map_service.nearby_summary(session, region_key, world_id, level_id)


@router.get("/nearby/players", response_model=list[NearbyPlayer])
def get_nearby_players(
  session: SessionDep,
  authorized_player_id: AuthorizedPlayerIdDep,
  region_key: str | None = Query(default=None, max_length=64),
  world_id: int | None = Query(default=None, ge=1, le=5),
  level_id: int | None = Query(default=None, ge=1, le=100),
  include_self: bool = Query(default=True)
) -> list[NearbyPlayer]:
  return map_service.nearby_players(session, region_key, world_id, level_id, authorized_player_id, include_self)


@router.get("/static")
def get_static_map(
  session: SessionDep,
  region_key: str | None = Query(default=None, max_length=64),
  world_id: int | None = Query(default=None, ge=1, le=5)
) -> Response:
  players = map_service.nearby_players(session, region_key, world_id, None, None, True)
  markers: list[tuple[float, float, str]] = []
  for player in players:
    if player.longitude is not None and player.latitude is not None:
      markers.append((player.longitude, player.latitude, player.nickname))
  image = amap_service.static_map_image(None, None, markers)
  if image is None:
    raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Static map is unavailable.")
  return Response(content=image, media_type="image/png")


@router.get("/worlds", response_model=list[WorldPopulation])
def get_world_population(session: SessionDep) -> list[WorldPopulation]:
  return map_service.world_population(session)


@router.get("/location/ip", response_model=LocationSummary)
def get_ip_location(ip: str | None = Query(default=None, max_length=64)) -> LocationSummary:
  return amap_service.locate_by_ip(ip)


@router.get("/location/regeo", response_model=LocationSummary)
def get_regeo_location(
  longitude: float = Query(ge=-180, le=180),
  latitude: float = Query(ge=-90, le=90)
) -> LocationSummary:
  return amap_service.locate_by_regeo(longitude, latitude)
