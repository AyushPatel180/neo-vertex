from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Neo Vertex Ventures API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ----------------- Models -----------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class BriefingRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    work_email: EmailStr
    company: str = Field(..., min_length=1, max_length=200)
    role: str = Field(..., min_length=1, max_length=120)
    intent: Literal[
        "platform-evaluation",
        "architecture-review",
        "pilot-program",
        "partnership",
        "general-inquiry",
    ]
    message: Optional[str] = Field(default="", max_length=2000)


class BriefingRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    work_email: str
    company: str
    role: str
    intent: str
    message: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ----------------- Routes -----------------
@api_router.get("/")
async def root():
    return {"service": "Neo Vertex Ventures API", "status": "online"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    status_obj = StatusCheck(**payload.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/briefings", response_model=BriefingRequest, status_code=201)
async def create_briefing(payload: BriefingRequestCreate):
    obj = BriefingRequest(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.briefing_requests.insert_one(doc)
    logger.info(f"New briefing request from {obj.company} ({obj.work_email})")
    return obj


@api_router.get("/briefings", response_model=List[BriefingRequest])
async def list_briefings(limit: int = 100):
    if limit < 1 or limit > 500:
        raise HTTPException(status_code=400, detail="limit must be between 1 and 500")
    rows = (
        await db.briefing_requests
        .find({}, {"_id": 0})
        .sort("created_at", -1)
        .to_list(limit)
    )
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
