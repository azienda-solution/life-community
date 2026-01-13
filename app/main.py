from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import uuid4
from apscheduler.schedulers.background import BackgroundScheduler
import os
import moviepy


app = FastAPI(title="LifeCommunity")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Ports Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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

@app.post("/extract-audio")
async def extract_audio(video: UploadFile = File(...)):
    video_path = f"/tmp/{video.filename}"
    audio_path = "/tmp/audio.mp3"
    
    try:
        # Sauvegarder la vidéo
        with open(video_path, "wb") as f:
            f.write(await video.read())
        
        # Conversion avec gestionnaire de contexte
        with moviepy.VideoFileClip(video_path) as video_clip:
            audio = video_clip.audio
            audio.write_audiofile(audio_path)
        
        return FileResponse(audio_path, media_type="audio/mpeg", filename="audio.mp3")
    
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'extraction audio: {str(e)}")
