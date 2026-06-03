from typing import Annotated

from fastapi import Depends, Header, HTTPException, status
from sqlmodel import Session

from app.db.session import get_session
from app.services import auth_service

SessionDep = Annotated[Session, Depends(get_session)]


def get_authorized_player_id(authorization: str | None = Header(default=None)) -> str:
  if not authorization or not authorization.lower().startswith("bearer "):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing authorization token.")
  return auth_service.player_id_from_token(authorization[7:].strip())


AuthorizedPlayerIdDep = Annotated[str, Depends(get_authorized_player_id)]


def require_same_player(player_id: str, authorized_player_id: str) -> None:
  if player_id != authorized_player_id:
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot operate another player.")
