from sqlalchemy.orm import Session
from uuid import UUID
import uuid
from datetime import datetime

from .. import models, schemas
from ..workers.celery_app import celery_app

class PromptService:
    async def submit_prompt(self, db: Session, prompt_data: schemas.PromptSubmission, user_id: UUID):
        # Create job record
        job = models.PromptJob(
            user_id=user_id,
            prompt=prompt_data.prompt,
            status="pending"
        )
        db.add(job)
        db.commit()
        db.refresh(job)
        
        # Queue the ML task
        celery_app.send_task(
            "ml_tasks.process_prompt",
            args=[str(job.id), prompt_data.prompt],
            task_id=str(job.id)
        )
        
        return schemas.JobResponse(
            job_id=job.id,
            message="Job submitted successfully"
        )
    
    def get_job_status(self, db: Session, job_id: str, user_id: UUID):
        job = db.query(models.PromptJob).filter(
            models.PromptJob.id == job_id,
            models.PromptJob.user_id == user_id
        ).first()
        return job
    
    def update_job_status(self, db: Session, job_id: str, status: str, progress: int = None, logs: list = None, error_message: str = None):
        job = db.query(models.PromptJob).filter(models.PromptJob.id == job_id).first()
        if job:
            job.status = status
            if progress is not None:
                job.progress = progress
            if logs is not None:
                job.logs = logs
            if error_message is not None:
                job.error_message = error_message
            job.updated_at = datetime.utcnow()
            db.commit()
            db.refresh(job)
        return job