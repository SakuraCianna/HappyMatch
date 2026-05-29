from fastapi.testclient import TestClient


def test_guest_friend_record_leaderboard_and_presence(tmp_path, monkeypatch):
  db_path = tmp_path / "happymatch-test.db"
  monkeypatch.setenv("DATABASE_URL", f"sqlite:///{db_path.as_posix()}")
  monkeypatch.setenv("DEFAULT_PLAYER_COINS", "620")

  from app.main import app

  with TestClient(app) as client:
    first = client.post("/api/players/guest", json={"nickname": "Alice"}).json()
    second = client.post("/api/players/guest", json={"nickname": "Bob"}).json()

    assert first["coin"] == 620
    assert first["friend_code"] != second["friend_code"]
    assert len(first["friend_code"]) == 6

    friend_response = client.post(
      f"/api/friends/{first['id']}",
      json={"friend_code": second["friend_code"]}
    )
    assert friend_response.status_code == 201
    assert friend_response.json()["id"] == second["id"]

    record_response = client.post(
      f"/api/players/{first['id']}/records",
      json={"level_id": 8, "score": 2100, "stars": 3, "best_combo": 7, "moves_left": 5}
    )
    assert record_response.status_code == 200

    leaderboard = client.get("/api/leaderboard?scope=stars").json()
    assert leaderboard[0]["player_id"] == first["id"]

    first_presence = client.post(
      "/api/map/presence",
      json={"player_id": first["id"], "world_id": 1, "level_id": 8, "region_key": "school-east"}
    )
    assert first_presence.status_code == 200

    second_presence = client.post(
      "/api/map/presence",
      json={"player_id": second["id"], "world_id": 1, "level_id": 3, "region_key": "school-east"}
    )
    assert second_presence.status_code == 200
    assert second_presence.json()["active_players"] == 2

    nearby = client.get("/api/map/nearby?region_key=school-east&world_id=1").json()
    assert nearby["active_players"] == 2

    location = client.get("/api/map/location/ip").json()
    assert "region_key" in location
