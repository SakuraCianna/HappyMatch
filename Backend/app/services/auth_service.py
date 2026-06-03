import base64
import hashlib
import hmac
import json
import secrets
from datetime import timedelta

from fastapi import HTTPException, status
from sqlmodel import Session, select

from app.core.config import settings
from app.models.entities import Player, utc_now
from app.schemas.schemas import AuthLoginRequest, AuthRegisterRequest, AuthSession
from app.services.player_service import generate_friend_code, touch_player

PBKDF2_ITERATIONS = 210_000
NICKNAME_MIN_LENGTH = 1
PASSWORD_MIN_LENGTH = 6


def normalize_nickname(nickname: str) -> str:
  value = nickname.strip()
  if len(value) < NICKNAME_MIN_LENGTH or len(value) > 32:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nickname length must be 1-32.")
  return value


def validate_password(password: str) -> None:
  if len(password) < PASSWORD_MIN_LENGTH or len(password) > 72:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password length must be 6-72.")


def hash_password(password: str) -> str:
  salt = secrets.token_urlsafe(16)
  digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), PBKDF2_ITERATIONS)
  encoded = base64.urlsafe_b64encode(digest).decode("ascii")
  return f"pbkdf2_sha256${PBKDF2_ITERATIONS}${salt}${encoded}"


def verify_password(password: str, stored_hash: str | None) -> bool:
  if not stored_hash:
    return False
  parts = stored_hash.split("$")
  if len(parts) != 4 or parts[0] != "pbkdf2_sha256":
    return False
  try:
    iterations = int(parts[1])
  except ValueError:
    return False
  digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), parts[2].encode("utf-8"), iterations)
  encoded = base64.urlsafe_b64encode(digest).decode("ascii")
  return hmac.compare_digest(encoded, parts[3])


def find_player_by_nickname(session: Session, nickname: str) -> Player | None:
  return session.exec(select(Player).where(Player.nickname == nickname)).first()


def create_token(player_id: str) -> tuple[str, int]:
  expires_at = int((utc_now() + timedelta(seconds=settings.auth_token_expire_seconds)).timestamp())
  payload = {
    "player_id": player_id,
    "exp": expires_at,
    "nonce": secrets.token_urlsafe(10)
  }
  payload_bytes = json.dumps(payload, separators=(",", ":"), ensure_ascii=True).encode("utf-8")
  payload_part = base64.urlsafe_b64encode(payload_bytes).decode("ascii").rstrip("=")
  signature = hmac.new(settings.secret_key.encode("utf-8"), payload_part.encode("ascii"), hashlib.sha256).digest()
  signature_part = base64.urlsafe_b64encode(signature).decode("ascii").rstrip("=")
  return f"{payload_part}.{signature_part}", expires_at


def player_id_from_token(token: str) -> str:
  try:
    payload_part, signature_part = token.split(".", 1)
  except ValueError as error:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token.") from error

  expected = hmac.new(settings.secret_key.encode("utf-8"), payload_part.encode("ascii"), hashlib.sha256).digest()
  expected_part = base64.urlsafe_b64encode(expected).decode("ascii").rstrip("=")
  if not hmac.compare_digest(expected_part, signature_part):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token.")

  padded_payload = payload_part + "=" * (-len(payload_part) % 4)
  try:
    payload = json.loads(base64.urlsafe_b64decode(padded_payload.encode("ascii")).decode("utf-8"))
  except (ValueError, json.JSONDecodeError) as error:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token.") from error

  player_id = payload.get("player_id")
  expires_at = payload.get("exp")
  if not isinstance(player_id, str) or not isinstance(expires_at, int):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token.")
  if expires_at < int(utc_now().timestamp()):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired.")
  return player_id


def auth_response(player: Player) -> AuthSession:
  token, expires_at = create_token(player.id)
  return AuthSession(access_token=token, token_type="bearer", expires_at=expires_at, player=player)


def register(session: Session, payload: AuthRegisterRequest) -> AuthSession:
  nickname = normalize_nickname(payload.nickname)
  validate_password(payload.password)
  if find_player_by_nickname(session, nickname) is not None:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Nickname already exists.")

  player = Player(
    password_hash=hash_password(payload.password),
    nickname=nickname,
    avatar=None,
    friend_code=generate_friend_code(session),
    coin=settings.default_player_coins
  )
  session.add(player)
  session.commit()
  session.refresh(player)
  return auth_response(player)


def login(session: Session, payload: AuthLoginRequest) -> AuthSession:
  nickname = normalize_nickname(payload.nickname)
  player = find_player_by_nickname(session, nickname)
  if player is None or not verify_password(payload.password, player.password_hash):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid nickname or password.")
  touch_player(player)
  session.add(player)
  session.commit()
  session.refresh(player)
  return auth_response(player)
