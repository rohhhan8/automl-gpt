from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import uvicorn
import os
from datetime import datetime, timedelta
from typing import Optional, List
import jwt
from passlib.context import CryptContext

from .database import get_db, engine
from . import models, schemas
from .services.auth import AuthService
from .services.prompt import PromptService
from .workers.celery_app import celery_app

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AutoML Pro API",
    description="AI-powered AutoML platform API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Services
auth_service = AuthService()
prompt_service = PromptService()

# Auth dependency
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(
            credentials.credentials,
            os.getenv("SECRET_KEY", "your-secret-key"),
            algorithms=["HS256"]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user

@app.get("/")
async def root():
    return {"message": "AutoML Pro API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Auth routes
@app.post("/api/auth/signup", response_model=schemas.AuthResponse)
async def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    return await auth_service.create_user(db, user_data)

@app.post("/api/auth/login", response_model=schemas.AuthResponse)
async def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    return await auth_service.authenticate_user(db, credentials)

@app.get("/api/auth/profile", response_model=schemas.User)
async def get_profile(current_user: models.User = Depends(get_current_user)):
    return current_user

@app.get("/auth/google")
async def google_auth():
    # Redirect to Google OAuth
    # Implementation depends on your OAuth setup
    pass

# Prompt and job routes
@app.post("/api/prompt", response_model=schemas.JobResponse)
async def submit_prompt(
    prompt_data: schemas.PromptSubmission,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return await prompt_service.submit_prompt(db, prompt_data, current_user.id)

@app.get("/api/jobs", response_model=List[schemas.Job])
async def get_user_jobs(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
):
    jobs = db.query(models.PromptJob).filter(
        models.PromptJob.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return jobs

@app.get("/api/status/{job_id}", response_model=schemas.JobStatus)
async def get_job_status(
    job_id: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    job = db.query(models.PromptJob).filter(
        models.PromptJob.id == job_id,
        models.PromptJob.user_id == current_user.id
    ).first()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return job

@app.get("/api/result/{job_id}", response_model=schemas.JobResult)
async def get_job_result(
    job_id: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    job = db.query(models.PromptJob).filter(
        models.PromptJob.id == job_id,
        models.PromptJob.user_id == current_user.id
    ).first()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if job.status != "completed":
        raise HTTPException(status_code=400, detail="Job not completed yet")
    
    result = db.query(models.JobResult).filter(
        models.JobResult.job_id == job_id
    ).first()
    
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")
    
    return result

# Celery monitoring routes
@app.get("/api/celery/status")
async def celery_status():
    i = celery_app.inspect()
    stats = i.stats()
    return {"celery_status": "active" if stats else "inactive", "workers": stats}

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )