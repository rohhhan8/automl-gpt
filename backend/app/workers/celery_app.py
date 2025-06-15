from celery import Celery
import os

# Configure Celery
celery_app = Celery(
    "automl_worker",
    broker=os.getenv("REDIS_URL", "redis://localhost:6379/0"),
    backend=os.getenv("REDIS_URL", "redis://localhost:6379/0"),
    include=["app.workers.ml_tasks"]
)

# Celery configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_routes={
        "ml_tasks.*": {"queue": "ml_queue"},
    },
)

if __name__ == "__main__":
    celery_app.start()