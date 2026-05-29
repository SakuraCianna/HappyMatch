from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
  app_name: str = "HappyMatch Backend"
  app_env: str = "local"
  api_prefix: str = "/api"
  host: str = "127.0.0.1"
  port: int = 8000
  database_url: str = f"sqlite:///{(BACKEND_DIR / 'data' / 'happymatch.db').as_posix()}"
  sql_echo: bool = False
  cors_origins: str = "http://localhost:49891,http://127.0.0.1:49891,http://localhost:8000"
  default_player_coins: int = 500
  default_guest_nickname: str = "糖果游客"
  friend_code_length: int = 8
  nearby_active_seconds: int = 300
  nearby_grid_precision: int = 2
  secret_key: str = "dev-only-change-me"
  enable_openapi: bool = True

  model_config = SettingsConfigDict(
    env_file=BACKEND_DIR / ".env",
    env_file_encoding="utf-8",
    extra="ignore"
  )

  @property
  def cors_origin_list(self) -> list[str]:
    return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
  return Settings()


settings = get_settings()
