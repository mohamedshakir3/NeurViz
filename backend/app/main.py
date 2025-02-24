from fastapi import FastAPI, BackgroundTasks
from supabase import create_client
from train import GAN
import json
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

@app.post("/train/{jobId}")
async def start_gan_training(jobId: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(train_gan, jobId)
    return {"message": "Training started", "job_id": jobId}

def train_gan(jobId: str): 
    response = (
        supabase.table("jobs").select("*").eq("id", jobId).single().execute()
    )
    supabase.table("jobs").update({ "status": "running" }).eq("id", jobId).execute()
    model = response.data["model_params"]
    gan = GAN(model)
    gan.train(jobId)
    return { "res" : "Successfully trained!" }

