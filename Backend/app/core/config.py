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
  default_player_coins: int = 500
  friend_code_length: int = 6
  nearby_active_seconds: int = 300
  nearby_grid_precision: int = 2
  secret_key: str = "dev-only-change-me"
  auth_token_expire_seconds: int = 2_592_000
  enable_openapi: bool = True
  amap_web_service_key: str = ""
  amap_web_service_base_url: str = "https://restapi.amap.com"
  amap_fallback_region_key: str = "unknown"

  model_config = SettingsConfigDict(
    env_file=BACKEND_DIR / ".env",
    env_file_encoding="utf-8",
    extra="ignore"
  )


@lru_cache
def get_settings() -> Settings:
  return Settings()


settings = get_settings()
