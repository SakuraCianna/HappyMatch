# HappyMatch Backend

这是 HappyMatch 的轻量后端服务，使用 FastAPI + SQLite 维护玩家档案、关卡成绩、好友关系、排行榜和地图附近在线人数。

## 技术选择

- Python: 3.12.10
- Web 框架: FastAPI
- 数据库: SQLite
- 数据访问: SQLModel
- 配置来源: `.env`

## 本地启动

```powershell
cd E:\CodeHome\Experiment\HappyMatch\Backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python --version
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

启动后访问：

```text
http://127.0.0.1:8000/docs
```

## 核心接口

```text
GET  /health
POST /api/players/guest
GET  /api/players/{player_id}
PATCH /api/players/{player_id}
PUT  /api/players/{player_id}
POST /api/players/{player_id}/records
GET  /api/players/{player_id}/records
POST /api/friends/{player_id}
GET  /api/friends/{player_id}
DELETE /api/friends/{player_id}/{friend_id}
GET  /api/leaderboard
POST /api/map/presence
GET  /api/map/nearby
GET  /api/map/worlds
GET  /api/map/location/ip
GET  /api/map/location/regeo
```

## 配置说明

重要配置写在 `Backend/.env`，提交到仓库的是 `Backend/.env.example`。

- `DATABASE_URL`: SQLite 数据库地址。
- `CORS_ORIGINS`: 允许访问后端的前端来源。
- `DEFAULT_PLAYER_COINS`: 新游客玩家默认金币。
- `FRIEND_CODE_LENGTH`: 好友码长度。
- `NEARBY_ACTIVE_SECONDS`: 地图在线人数统计窗口。
- `NEARBY_GRID_PRECISION`: 经纬度粗粒度网格精度。
- `SECRET_KEY`: 后续接入签名或 token 时使用，开发环境先保留占位值。
- `AMAP_WEB_SERVICE_KEY`: 高德开放平台 Web 服务 API Key。
- `AMAP_WEB_SERVICE_BASE_URL`: 高德 Web 服务 API 地址，默认 `https://restapi.amap.com`。
- `AMAP_FALLBACK_REGION_KEY`: 未配置高德 Key 或定位失败时使用的区域键。

HarmonyOS 端默认请求 `http://10.0.2.2:8000/api`，用于在模拟器里访问宿主机后端。真机联调时需要把 `entry/src/main/ets/game/remote/RemoteConfig.ts` 中的地址改为电脑局域网 IP 或部署后的 HTTPS 地址。

## 设计边界

当前后端先做异步社交和云端数据雏形，不做实时联机对战。地图附近人数使用粗粒度 `region_key` 或经纬度舍入后的网格，避免保存过细的位置数据。
