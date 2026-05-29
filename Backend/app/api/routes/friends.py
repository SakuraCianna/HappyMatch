from fastapi import APIRouter, status

from app.api.deps import SessionDep
from app.schemas.schemas import FriendAddRequest, FriendPublic
from app.services import friend_service

router = APIRouter()


@router.get("/{player_id}", response_model=list[FriendPublic])
def list_friends(player_id: str, session: SessionDep) -> list[FriendPublic]:
  return friend_service.list_friends(session, player_id)


@router.post("/{player_id}", response_model=FriendPublic, status_code=status.HTTP_201_CREATED)
def add_friend(player_id: str, payload: FriendAddRequest, session: SessionDep) -> FriendPublic:
  return friend_service.add_friend_by_code(session, player_id, payload.friend_code)


@router.delete("/{player_id}/{friend_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_friend(player_id: str, friend_id: str, session: SessionDep) -> None:
  friend_service.delete_friendship(session, player_id, friend_id)
