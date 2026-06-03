from fastapi import APIRouter
from sqlmodel import select

from app.api.deps import AuthorizedPlayerIdDep, SessionDep, require_same_player
from app.models.entities import LevelRecord, Player
from app.schemas.schemas import LevelRecordCreate, LevelRecordPublic, PlayerPublic, PlayerUpdate
from app.services import player_service

router = APIRouter()


@router.get("/{player_id}", response_model=PlayerPublic)
def get_player(player_id: str, session: SessionDep) -> Player:
  return player_service.get_player_or_404(session, player_id)


@router.patch("/{player_id}", response_model=PlayerPublic)
def update_player(
  player_id: str,
  payload: PlayerUpdate,
  session: SessionDep,
  authorized_player_id: AuthorizedPlayerIdDep
) -> Player:
  require_same_player(player_id, authorized_player_id)
  return player_service.update_player(session, player_id, payload)


@router.put("/{player_id}", response_model=PlayerPublic)
def replace_player(
  player_id: str,
  payload: PlayerUpdate,
  session: SessionDep,
  authorized_player_id: AuthorizedPlayerIdDep
) -> Player:
  require_same_player(player_id, authorized_player_id)
  return player_service.update_player(session, player_id, payload)


@router.post("/{player_id}/records", response_model=LevelRecordPublic)
def save_level_record(
  player_id: str,
  payload: LevelRecordCreate,
  session: SessionDep,
  authorized_player_id: AuthorizedPlayerIdDep
) -> LevelRecord:
  require_same_player(player_id, authorized_player_id)
  return player_service.upsert_level_record(session, player_id, payload)


@router.get("/{player_id}/records", response_model=list[LevelRecordPublic])
def list_level_records(
  player_id: str,
  session: SessionDep,
  authorized_player_id: AuthorizedPlayerIdDep
) -> list[LevelRecord]:
  require_same_player(player_id, authorized_player_id)
  player_service.get_player_or_404(session, player_id)
  statement = select(LevelRecord).where(LevelRecord.player_id == player_id).order_by(LevelRecord.level_id)
  return list(session.exec(statement).all())
