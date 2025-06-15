from celery import current_task
from sqlalchemy.orm import Session
import time
import random
import json
from datetime import datetime

from .celery_app import celery_app
from ..database import SessionLocal
from .. import models
from ..ml_service.train import MLTrainer

@celery_app.task(bind=True)
def process_prompt(self, job_id: str, prompt: str):
    """
    Process a user's ML prompt and train a model.
    This is a placeholder implementation that simulates ML training.
    """
    db = SessionLocal()
    try:
        # Update job status to running
        job = db.query(models.PromptJob).filter(models.PromptJob.id == job_id).first()
        if not job:
            raise Exception(f"Job {job_id} not found")
        
        job.status = "running"
        job.progress = 0
        job.logs = ["Starting ML pipeline..."]
        db.commit()
        
        # Initialize ML trainer
        trainer = MLTrainer(prompt)
        
        # Simulate training process with progress updates
        stages = [
            ("Analyzing prompt...", 10),
            ("Preparing dataset...", 25),
            ("Feature engineering...", 40),
            ("Training model...", 70),
            ("Evaluating performance...", 90),
            ("Finalizing results...", 100)
        ]
        
        logs = job.logs.copy()
        
        for stage_name, progress in stages:
            # Update progress
            job.progress = progress
            logs.append(f"[{datetime.now().strftime('%H:%M:%S')}] {stage_name}")
            job.logs = logs
            db.commit()
            
            # Simulate work
            time.sleep(random.uniform(2, 5))
            
            # Update task state
            current_task.update_state(
                state="PROGRESS",
                meta={"current": progress, "total": 100, "status": stage_name}
            )
        
        # Generate mock results
        result_data = trainer.generate_mock_results()
        
        # Create job result
        job_result = models.JobResult(
            job_id=job_id,
            model_type=result_data["model_type"],
            accuracy=result_data["accuracy"],
            loss=result_data["loss"],
            training_time=result_data["training_time"],
            dataset_size=result_data["dataset_size"],
            features_used=result_data["features_used"],
            model_size=result_data["model_size"],
            download_url=result_data.get("download_url"),
            api_endpoint=result_data.get("api_endpoint"),
            metrics=result_data["metrics"],
            feature_importance=result_data.get("feature_importance"),
            predictions_sample=result_data.get("predictions_sample")
        )
        
        db.add(job_result)
        
        # Update job status to completed
        job.status = "completed"
        job.progress = 100
        job.result_summary = f"Model trained successfully with {result_data['accuracy']:.1%} accuracy"
        logs.append(f"[{datetime.now().strftime('%H:%M:%S')}] Training completed successfully!")
        job.logs = logs
        
        db.commit()
        
        return {"status": "completed", "job_id": job_id}
        
    except Exception as e:
        # Handle errors
        job = db.query(models.PromptJob).filter(models.PromptJob.id == job_id).first()
        if job:
            job.status = "failed"
            job.error_message = str(e)
            logs = job.logs.copy() if job.logs else []
            logs.append(f"[{datetime.now().strftime('%H:%M:%S')}] Error: {str(e)}")
            job.logs = logs
            db.commit()
        
        raise e
        
    finally:
        db.close()