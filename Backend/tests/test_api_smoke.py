from fastapi.testclient import TestClient


def test_auth_friend_record_leaderboard_and_presence(tmp_path, monkeypatch):
  db_path = tmp_path / "happymatch-test.db"
  monkeypatch.setenv("DATABASE_URL", f"sqlite:///{db_path.as_posix()}")
  monkeypatch.setenv("DEFAULT_PLAYER_COINS", "620")

  from app.main import app

  with TestClient(app) as client:
    first_session = client.post(
      "/api/auth/register",
      json={"nickname": "Alice", "password": "secret123"}
    ).json()
    second_session = client.post(
      "/api/auth/register",
      json={"nickname": "Bob", "password": "secret123"}
    ).json()
    first = first_session["player"]
    second = second_session["player"]
    first_headers = {"Authorization": f"Bearer {first_session['access_token']}"}
    second_headers = {"Authorization": f"Bearer {second_session['access_token']}"}

    assert first["coin"] == 620
    assert first["nickname"] == "Alice"
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
      json={"nickname": "Alice", "password": "secret123"}
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

    second_record_response = client.post(
      f"/api/players/{second['id']}/records",
      json={"level_id": 8, "score": 2600, "stars": 2, "best_combo": 5, "moves_left": 3},
      headers=second_headers
    )
    assert second_record_response.status_code == 200

    friend_level_scores = client.get(
      f"/api/friends/{first['id']}/levels/8/scores",
      headers=first_headers
    )
    assert friend_level_scores.status_code == 200
    score_rows = friend_level_scores.json()
    assert score_rows[0]["player_id"] == second["id"]
    assert score_rows[0]["score"] == 2600
    assert score_rows[1]["is_self"] is True

    leaderboard = client.get("/api/leaderboard?scope=stars").json()
    assert leaderboard[0]["player_id"] == first["id"]

    first_presence = client.post(
      "/api/map/presence",
      json={
        "player_id": first["id"],
        "world_id": 1,
        "level_id": 8,
        "region_key": "school-east",
        "longitude": 116.397428,
        "latitude": 39.90923
      },
      headers=first_headers
    )
    assert first_presence.status_code == 200

    second_presence = client.post(
      "/api/map/presence",
      json={
        "player_id": second["id"],
        "world_id": 1,
        "level_id": 3,
        "region_key": "school-east",
        "longitude": 116.407428,
        "latitude": 39.91923
      },
      headers=second_headers
    )
    assert second_presence.status_code == 200
    assert second_presence.json()["active_players"] == 1

    nearby = client.get("/api/map/nearby?region_key=school-east&world_id=1").json()
    assert nearby["active_players"] == 2

    nearby_players = client.get(
      "/api/map/nearby/players?region_key=school-east&world_id=1",
      headers=first_headers
    ).json()
    assert len(nearby_players) == 2
    assert nearby_players[0]["is_self"] is True
    assert nearby_players[0]["longitude"] == 116.397428

    location = client.get("/api/map/location/ip").json()
    assert "region_key" in location
