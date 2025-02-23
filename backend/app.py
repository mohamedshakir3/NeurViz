from gan_utils import GAN
from fastapi import FastAPI
import time
import os
from supabase import create_client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

@app.post("/train")
def start_training(request: dict):
    model_data = request.get("model_data")
    job_id = model_data.get("job_id")

    if not job_id:
        return {"error": "Job ID required"}

    train_model(job_id, model_data)
    return {"status": "started", "job_id": job_id}


def start_training(request: dict):
    model_data = request.get("model_data")
    job_id = model_data.get("job_id")

    if not job_id:
        return {"error": "Job ID required"}

    # Start training asynchronously
    train_model(job_id, model_data)
    return {"status": "started", "job_id": job_id}

def train_model(job_id, model_data):
    gan = GAN(model_data)
    gan.train(job_id)
    return { "res" : "Successfully trained!" }
