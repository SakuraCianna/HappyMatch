from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.api.routes.health import router as health_router
from app.core.config import settings
from app.db.session import create_db_and_tables


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncGenerator[None, None]:
  create_db_and_tables()
  yield


app = FastAPI(
  title=settings.app_name,
  version="0.1.0",
  lifespan=lifespan,
  docs_url="/docs" if settings.enable_openapi else None,
  redoc_url="/redoc" if settings.enable_openapi else None,
  openapi_url="/openapi.json" if settings.enable_openapi else None
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=False,
  allow_methods=["*"],
  allow_headers=["*"]
)

app.include_router(health_router, tags=["health"])
app.include_router(api_router, prefix=settings.api_prefix)
