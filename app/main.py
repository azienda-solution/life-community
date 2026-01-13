from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import uuid4
from apscheduler.schedulers.background import BackgroundScheduler
import os

app = FastAPI(title="LifeCommunity")

class JobIn(BaseModel):
    tool: str
    input: Optional[Dict[str, Any]] = None


class JobOut(BaseModel):
    id: str
    status: str
    tool: str
    input: Optional[dict] = None
    output: Optional[dict] = None
    error: Optional[str] = None


class ScheduleIn(BaseModel):
    cron: str
    tool: str
    input: Optional[Dict[str, Any]] = None


scheduler = BackgroundScheduler()



@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/health")
def health():
    return {"status": "ok"}
