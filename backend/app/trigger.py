from trigger.dev import Trigger
import requests
import os
trigger_key = os.getenv("TRIGGER_KEY")
trigger = Trigger(api_key=trigger_key)

@trigger.task(name="train-gan")
def train_gan_task(job):
    response = requests.post("http://127.0.0.1:8000/", json=job)
    return response.json()