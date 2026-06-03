from fastapi.testclient import TestClient


def test_auth_friend_record_leaderboard_and_presence(tmp_path, monkeypatch):
  db_path = tmp_path / "happymatch-test.db"
  monkeypatch.setenv("DATABASE_URL", f"sqlite:///{db_path.as_posix()}")
  monkeypatch.setenv("DEFAULT_PLAYER_COINS", "620")

  from app.main import app

  with TestClient(app) as client:
    first_session = client.post(
      "/api/auth/register",
      json={"username": "alice", "password": "secret123", "nickname": "Alice"}
    ).json()
    second_session = client.post(
      "/api/auth/register",
      json={"username": "bob", "password": "secret123", "nickname": "Bob"}
    ).json()
    first = first_session["player"]
    second = second_session["player"]
    first_headers = {"Authorization": f"Bearer {first_session['access_token']}"}
    second_headers = {"Authorization": f"Bearer {second_session['access_token']}"}

    assert first["coin"] == 620
    assert first["username"] == "alice"
    assert first["friend_code"] != second["friend_code"]
    assert len(first["friend_code"]) == 6

    me_response = client.get(
      "/api/auth/me",
      headers=first_headers
    )
    assert me_response.status_code == 200
    assert me_response.json()["id"] == first["id"]

    login_response = client.post(
      "/api/auth/login",
      json={"username": "alice", "password": "secret123"}
    )
    assert login_response.status_code == 200
    assert login_response.json()["player"]["friend_code"] == first["friend_code"]

    friend_response = client.post(
      f"/api/friends/{first['id']}",
      json={"friend_code": second["friend_code"]},
      headers=first_headers
    )
    assert friend_response.status_code == 201
    assert friend_response.json()["id"] == second["id"]

    record_response = client.post(
      f"/api/players/{first['id']}/records",
      json={"level_id": 8, "score": 2100, "stars": 3, "best_combo": 7, "moves_left": 5},
      headers=first_headers
    )
    assert record_response.status_code == 200

    leaderboard = client.get("/api/leaderboard?scope=stars").json()
    assert leaderboard[0]["player_id"] == first["id"]

    first_presence = client.post(
      "/api/map/presence",
      json={"player_id": first["id"], "world_id": 1, "level_id": 8, "region_key": "school-east"},
      headers=first_headers
    )
    assert first_presence.status_code == 200

    second_presence = client.post(
      "/api/map/presence",
      json={"player_id": second["id"], "world_id": 1, "level_id": 3, "region_key": "school-east"},
      headers=second_headers
    )
    assert second_presence.status_code == 200
    assert second_presence.json()["active_players"] == 1

    nearby = client.get("/api/map/nearby?region_key=school-east&world_id=1").json()
    assert nearby["active_players"] == 2

    location = client.get("/api/map/location/ip").json()
    assert "region_key" in location
