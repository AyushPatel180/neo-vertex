"""Backend API tests for Neo Vertex Ventures briefings endpoints."""
import os
import time
import pytest
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load frontend .env to get public REACT_APP_BACKEND_URL
load_dotenv(Path(__file__).resolve().parents[2] / 'frontend' / '.env')

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Health / root ----------------
class TestRoot:
    def test_root_returns_status(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert isinstance(data, dict)
        assert data.get("status") == "online"
        assert "service" in data


# ---------------- POST /api/briefings ----------------
class TestCreateBriefing:
    def test_create_valid_briefing(self, session):
        payload = {
            "name": "TEST Ada Lovelace",
            "work_email": "test_ada@example.com",
            "company": "TEST Institution Group",
            "role": "Chief Architect",
            "intent": "platform-evaluation",
            "message": "Looking to evaluate the platform.",
        }
        r = session.post(f"{API}/briefings", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        assert data["name"] == payload["name"]
        assert data["work_email"] == payload["work_email"]
        assert data["company"] == payload["company"]
        assert data["role"] == payload["role"]
        assert data["intent"] == payload["intent"]
        assert data["message"] == payload["message"]

    def test_create_without_message_defaults_empty(self, session):
        payload = {
            "name": "TEST No Msg",
            "work_email": "test_nomsg@example.com",
            "company": "TEST Co",
            "role": "VP",
            "intent": "general-inquiry",
        }
        r = session.post(f"{API}/briefings", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["message"] == ""

    def test_invalid_email_returns_422(self, session):
        payload = {
            "name": "TEST Bad Email",
            "work_email": "not-an-email",
            "company": "TEST Co",
            "role": "VP",
            "intent": "platform-evaluation",
        }
        r = session.post(f"{API}/briefings", json=payload, timeout=15)
        assert r.status_code == 422, r.text

    def test_missing_required_field_returns_422(self, session):
        payload = {
            # name missing
            "work_email": "test_missing@example.com",
            "company": "TEST Co",
            "role": "VP",
            "intent": "platform-evaluation",
        }
        r = session.post(f"{API}/briefings", json=payload, timeout=15)
        assert r.status_code == 422, r.text

    def test_invalid_intent_returns_422(self, session):
        payload = {
            "name": "TEST Bad Intent",
            "work_email": "test_badintent@example.com",
            "company": "TEST Co",
            "role": "VP",
            "intent": "not-a-valid-intent",
        }
        r = session.post(f"{API}/briefings", json=payload, timeout=15)
        assert r.status_code == 422, r.text

    def test_name_too_short_returns_422(self, session):
        payload = {
            "name": "A",  # min_length=2
            "work_email": "test_short@example.com",
            "company": "TEST Co",
            "role": "VP",
            "intent": "pilot-program",
        }
        r = session.post(f"{API}/briefings", json=payload, timeout=15)
        assert r.status_code == 422, r.text

    def test_all_intents_accepted(self, session):
        intents = [
            "platform-evaluation",
            "architecture-review",
            "pilot-program",
            "partnership",
            "general-inquiry",
        ]
        for intent in intents:
            payload = {
                "name": f"TEST Intent {intent}",
                "work_email": f"test_{intent.replace('-', '_')}@example.com",
                "company": "TEST Co",
                "role": "VP",
                "intent": intent,
            }
            r = session.post(f"{API}/briefings", json=payload, timeout=15)
            assert r.status_code == 201, f"{intent}: {r.text}"
            assert r.json()["intent"] == intent


# ---------------- GET /api/briefings ----------------
class TestListBriefings:
    def test_list_returns_array_sorted_desc(self, session):
        # Create two briefings to verify ordering
        first = {
            "name": "TEST First",
            "work_email": "test_first@example.com",
            "company": "TEST Co A",
            "role": "VP",
            "intent": "platform-evaluation",
        }
        r1 = session.post(f"{API}/briefings", json=first, timeout=15)
        assert r1.status_code == 201
        id1 = r1.json()["id"]
        time.sleep(1.1)  # ensure distinct created_at ordering
        second = {
            "name": "TEST Second",
            "work_email": "test_second@example.com",
            "company": "TEST Co B",
            "role": "VP",
            "intent": "partnership",
        }
        r2 = session.post(f"{API}/briefings", json=second, timeout=15)
        assert r2.status_code == 201
        id2 = r2.json()["id"]

        r = session.get(f"{API}/briefings", timeout=15)
        assert r.status_code == 200, r.text
        rows = r.json()
        assert isinstance(rows, list)
        # The most recent two creations should appear, with id2 before id1
        ids = [row["id"] for row in rows]
        assert id2 in ids and id1 in ids
        assert ids.index(id2) < ids.index(id1), "Expected created_at desc ordering"

        # Validate shape
        sample = rows[0]
        for k in ("id", "name", "work_email", "company", "role", "intent", "message", "created_at"):
            assert k in sample
        assert "_id" not in sample, "Mongo _id should not be exposed"

    def test_limit_too_large_returns_400(self, session):
        r = session.get(f"{API}/briefings", params={"limit": 600}, timeout=15)
        assert r.status_code == 400, r.text
        body = r.json()
        assert "detail" in body

    def test_limit_zero_returns_400(self, session):
        r = session.get(f"{API}/briefings", params={"limit": 0}, timeout=15)
        assert r.status_code == 400, r.text

    def test_limit_valid(self, session):
        r = session.get(f"{API}/briefings", params={"limit": 5}, timeout=15)
        assert r.status_code == 200, r.text
        assert len(r.json()) <= 5
