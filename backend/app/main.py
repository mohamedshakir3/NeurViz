from fastapi import FastAPI, BackgroundTasks
from supabase import create_client
from train import GAN
import json
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from Cloud Run!"}

@app.post("/train/{jobId}")
async def start_gan_training(jobId: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(train_gan, jobId)
    return {"message": "Training started", "job_id": jobId}

def train_gan(jobId: str):
    logger.info(f"Starting training for job {jobId}")
    try:    
        response = (
            supabase.table("jobs").select("*").eq("id", jobId).single().execute()
        )
        supabase.table("jobs").update({ "status": "running" }).eq("id", jobId).execute()
        model = response.data["model_params"]
        gan = GAN(model)
        gan.train(jobId)
    except Exception as e:
        logger.error(f"Supabase query failed for job {jobId}: {e}")
 
        
    return { "res" : "Successfully trained!" }

