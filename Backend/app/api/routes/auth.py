from fastapi import APIRouter

from app.api.deps import AuthorizedPlayerIdDep, SessionDep
from app.models.entities import Player
from app.schemas.schemas import AuthLoginRequest, AuthRegisterRequest, AuthSession, PlayerPublic
from app.services import auth_service, player_service

router = APIRouter()


@router.post("/register", response_model=AuthSession)
def register(payload: AuthRegisterRequest, session: SessionDep) -> AuthSession:
  return auth_service.register(session, payload)


@router.post("/login", response_model=AuthSession)
def login(payload: AuthLoginRequest, session: SessionDep) -> AuthSession:
  return auth_service.login(session, payload)


@router.get("/me", response_model=PlayerPublic)
def me(session: SessionDep, authorized_player_id: AuthorizedPlayerIdDep) -> Player:
  return player_service.get_player_or_404(session, authorized_player_id)
