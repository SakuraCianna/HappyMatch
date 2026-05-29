from collections.abc import Generator
from pathlib import Path

from sqlmodel import Session, SQLModel, create_engine

from app.core.config import BACKEND_DIR, settings


def normalize_sqlite_url(database_url: str) -> str:
  if not database_url.startswith("sqlite:///"):
    return database_url

  raw_path = database_url.replace("sqlite:///", "", 1)
  if raw_path == ":memory:":
    return database_url

  db_path = Path(raw_path)
  if not db_path.is_absolute():
    db_path = BACKEND_DIR / raw_path
  return f"sqlite:///{db_path.as_posix()}"


DATABASE_URL = normalize_sqlite_url(settings.database_url)
CONNECT_ARGS = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, echo=settings.sql_echo, connect_args=CONNECT_ARGS)


def ensure_sqlite_parent() -> None:
  if not DATABASE_URL.startswith("sqlite:///"):
    return
  raw_path = DATABASE_URL.replace("sqlite:///", "", 1)
  if raw_path == ":memory:":
    return
  Path(raw_path).parent.mkdir(parents=True, exist_ok=True)


def create_db_and_tables() -> None:
  from app.models import entities as _entities

  ensure_sqlite_parent()
  SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
  with Session(engine) as session:
    yield session
