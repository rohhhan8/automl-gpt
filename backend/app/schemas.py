from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: UUID
    avatar: Optional[str] = None
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class AuthResponse(BaseModel):
    user: User
    token: str

# Job schemas
class PromptSubmission(BaseModel):
    prompt: str

class JobResponse(BaseModel):
    job_id: UUID
    message: str

class Job(BaseModel):
    id: UUID
    prompt: str
    status: str
    progress: int
    result_summary: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class JobStatus(Job):
    logs: List[str]
    error_message: Optional[str] = None
    
    class Config:
        from_attributes = True

class JobMetrics(BaseModel):
    precision: float
    recall: float
    f1_score: float
    confusion_matrix: Optional[List[List[int]]] = None

class FeatureImportance(BaseModel):
    feature: str
    importance: float

class PredictionSample(BaseModel):
    input: str
    predicted: str
    confidence: float

class JobResult(BaseModel):
    id: UUID
    prompt: str
    status: str
    created_at: datetime
    model_type: str
    accuracy: float
    loss: float
    training_time: float
    dataset_size: int
    features_used: List[str]
    model_size: str
    download_url: Optional[str] = None
    api_endpoint: Optional[str] = None
    metrics: JobMetrics
    feature_importance: Optional[List[FeatureImportance]] = None
    predictions_sample: Optional[List[PredictionSample]] = None
    
    class Config:
        from_attributes = True