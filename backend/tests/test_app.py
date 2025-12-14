import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import Base
from main import app, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
test_engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

Base.metadata.create_all(bind=test_engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


def setup_function():
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def auth_header(token: str):
    return {"Authorization": f"Bearer {token}"}


def register(email: str, password: str, role: str = "user"):
    response = client.post(
        "/api/auth/register",
        json={"email": email, "password": password, "role": role},
    )
    assert response.status_code == 200
    return response.json()


def login(email: str, password: str):
    response = client.post("/api/auth/login", json={"email": email, "password": password})
    assert response.status_code == 200
    return response.json()


def test_user_registration():
    response = client.post(
        "/api/auth/register",
        json={"email": "tester@example.com", "password": "secret123", "role": "user"},
    )
    assert response.status_code == 200
    body = response.json()
    assert "access_token" in body
    assert body["role"] == "user"


def test_user_login():
    register("alice@example.com", "secret123")
    response = client.post("/api/auth/login", json={"email": "alice@example.com", "password": "secret123"})
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_purchase_reduces_quantity():
    admin_token = register("admin@example.com", "secret123", role="admin")["access_token"]
    sweet_payload = {"name": "Ladoo", "category": "Traditional", "price": 5.0, "quantity": 10}
    create_resp = client.post("/api/sweets", json=sweet_payload, headers=auth_header(admin_token))
    assert create_resp.status_code == 200
    sweet_id = create_resp.json()["id"]

    user_token = register("bob@example.com", "secret123")
    purchase_resp = client.post(
        f"/api/sweets/{sweet_id}/purchase",
        json={"quantity": 3},
        headers=auth_header(user_token["access_token"]),
    )
    assert purchase_resp.status_code == 200
    assert purchase_resp.json()["quantity"] == 7


def test_purchase_fails_when_quantity_zero():
    admin_token = register("owner@example.com", "secret123", role="admin")["access_token"]
    sweet_payload = {"name": "Barfi", "category": "Traditional", "price": 4.0, "quantity": 1}
    sweet = client.post("/api/sweets", json=sweet_payload, headers=auth_header(admin_token)).json()

    user_token = register("charlie@example.com", "secret123")
    # First purchase succeeds
    client.post(
        f"/api/sweets/{sweet['id']}/purchase",
        json={"quantity": 1},
        headers=auth_header(user_token["access_token"]),
    )

    # Second purchase should fail because quantity is now zero
    second_resp = client.post(
        f"/api/sweets/{sweet['id']}/purchase",
        json={"quantity": 1},
        headers=auth_header(user_token["access_token"]),
    )
    assert second_resp.status_code == 400
    assert second_resp.json()["detail"] == "Insufficient stock"
