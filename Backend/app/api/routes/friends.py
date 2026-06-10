from fastapi import APIRouter, status

from app.api.deps import AuthorizedPlayerIdDep, SessionDep, require_same_player
from app.schemas.schemas import FriendAddRequest, FriendLevelScore, FriendPublic
from app.services import friend_service

router = APIRouter()


@router.get("/{player_id}", response_model=list[FriendPublic])
def list_friends(player_id: str, session: SessionDep, authorized_player_id: AuthorizedPlayerIdDep) -> list[FriendPublic]:
  require_same_player(player_id, authorized_player_id)
  return friend_service.list_friends(session, player_id)


@router.get("/{player_id}/levels/{level_id}/scores", response_model=list[FriendLevelScore])
def list_friend_level_scores(
  player_id: str,
  level_id: int,
  session: SessionDep,
  authorized_player_id: AuthorizedPlayerIdDep
) -> list[FriendLevelScore]:
  require_same_player(player_id, authorized_player_id)
  return friend_service.list_friend_level_scores(session, player_id, level_id)


@router.post("/{player_id}", response_model=FriendPublic, status_code=status.HTTP_201_CREATED)
def add_friend(
  player_id: str,
  payload: FriendAddRequest,
  session: SessionDep,
  authorized_player_id: AuthorizedPlayerIdDep
) -> FriendPublic:
  require_same_player(player_id, authorized_player_id)
  return friend_service.add_friend_by_code(session, player_id, payload.friend_code)


@router.delete("/{player_id}/{friend_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_friend(
  player_id: str,
  friend_id: str,
  session: SessionDep,
  authorized_player_id: AuthorizedPlayerIdDep
) -> None:
  require_same_player(player_id, authorized_player_id)
  friend_service.delete_friendship(session, player_id, friend_id)
