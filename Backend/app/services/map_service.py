from datetime import timedelta

from fastapi import HTTPException, status
from sqlmodel import Session, select

from app.core.config import settings
from app.models.entities import Player, PlayerPresence, utc_now
from app.schemas.schemas import NearbyPlayer, NearbySummary, PresenceUpdate, WorldPopulation
from app.services.player_service import get_player_or_404, touch_player


def resolved_region_key(payload: PresenceUpdate) -> str:
  if payload.region_key:
    return payload.region_key.strip().lower()
  if payload.latitude is not None and payload.longitude is not None:
    precision = max(0, min(4, settings.nearby_grid_precision))
    latitude = round(payload.latitude, precision)
    longitude = round(payload.longitude, precision)
    return f"geo:{latitude:.{precision}f}:{longitude:.{precision}f}"
  return f"world:{payload.world_id}"


def active_cutoff():
  return utc_now() - timedelta(seconds=settings.nearby_active_seconds)


def count_active(
  session: Session,
  region_key: str | None = None,
  world_id: int | None = None,
  level_id: int | None = None,
  exclude_player_id: str | None = None
) -> int:
  statement = select(PlayerPresence).where(PlayerPresence.last_seen_at >= active_cutoff())
  if region_key:
    statement = statement.where(PlayerPresence.region_key == region_key)
  if world_id is not None:
    statement = statement.where(PlayerPresence.world_id == world_id)
  if level_id is not None:
    statement = statement.where(PlayerPresence.level_id == level_id)
  if exclude_player_id is not None:
    statement = statement.where(PlayerPresence.player_id != exclude_player_id)
  return len(session.exec(statement).all())


def active_presence_statement(
  region_key: str | None = None,
  world_id: int | None = None,
  level_id: int | None = None
):
  statement = select(PlayerPresence).where(PlayerPresence.last_seen_at >= active_cutoff())
  if region_key:
    statement = statement.where(PlayerPresence.region_key == region_key)
  if world_id is not None:
    statement = statement.where(PlayerPresence.world_id == world_id)
  if level_id is not None:
    statement = statement.where(PlayerPresence.level_id == level_id)
  return statement


def nearby_summary(
  session: Session,
  region_key: str | None = None,
  world_id: int | None = None,
  level_id: int | None = None,
  exclude_player_id: str | None = None
) -> NearbySummary:
  normalized_region_key = region_key.strip().lower() if region_key else None
  return NearbySummary(
    region_key=normalized_region_key,
    world_id=world_id,
    level_id=level_id,
    active_players=count_active(session, normalized_region_key, world_id, level_id, exclude_player_id),
    active_window_seconds=settings.nearby_active_seconds
  )


def nearby_players(
  session: Session,
  region_key: str | None = None,
  world_id: int | None = None,
  level_id: int | None = None,
  current_player_id: str | None = None,
  include_self: bool = True
) -> list[NearbyPlayer]:
  normalized_region_key = region_key.strip().lower() if region_key else None
  presences = session.exec(active_presence_statement(normalized_region_key, world_id, level_id)).all()
  result: list[NearbyPlayer] = []
  for presence in presences:
    if not include_self and presence.player_id == current_player_id:
      continue
    player = session.get(Player, presence.player_id)
    if player is None:
      continue
    result.append(NearbyPlayer(
      player_id=player.id,
      nickname=player.nickname,
      friend_code=player.friend_code,
      current_level=player.current_level,
      total_stars=player.total_stars,
      world_id=presence.world_id,
      level_id=presence.level_id,
      region_key=presence.region_key,
      latitude=presence.latitude,
      longitude=presence.longitude,
      last_seen_at=presence.last_seen_at,
      is_self=presence.player_id == current_player_id
    ))
  result.sort(key=lambda item: (not item.is_self, -item.total_stars, item.nickname))
  return result


def update_presence(session: Session, payload: PresenceUpdate) -> NearbySummary:
  player = get_player_or_404(session, payload.player_id)
  region_key = resolved_region_key(payload)
  if not region_key:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid region key.")

  presence = session.exec(
    select(PlayerPresence).where(PlayerPresence.player_id == payload.player_id)
  ).first()
  if presence is None:
    presence = PlayerPresence(player_id=payload.player_id, region_key=region_key)

  presence.world_id = payload.world_id
  presence.level_id = payload.level_id
  presence.region_key = region_key
  presence.latitude = payload.latitude
  presence.longitude = payload.longitude
  presence.last_seen_at = utc_now()
  touch_player(player)
  session.add(player)
  session.add(presence)
  session.commit()
  return nearby_summary(session, region_key, payload.world_id, None, payload.player_id)


def world_population(session: Session) -> list[WorldPopulation]:
  presences = session.exec(active_presence_statement()).all()
  counts: dict[int, int] = {}
  for presence in presences:
    counts[presence.world_id] = counts.get(presence.world_id, 0) + 1
  return [WorldPopulation(world_id=world_id, active_players=count) for world_id, count in sorted(counts.items())]
