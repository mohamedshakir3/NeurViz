import os
import time
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.datasets as datasets
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

class Discriminator(nn.Module): 
    def __init__(self, layers):
        super().__init__()        
        self.discriminator = nn.Sequential(*layers)

    def forward(self, x): 
        return self.discriminator(x)
    
class Generator(nn.Module):
    def __init__(self, layers):
        super().__init__()
        self.generator = nn.Sequential(*layers)
    
    def forward(self, x):
        return self.generator(x)

class GAN():
    def __init__(self, job_data):
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() 
            else "cpu"
        )
        self.job_data = job_data
        self.generator = Generator(self.parse_layers(job_data["generator"])).to(self.device)
        self.discriminator = Discriminator(self.parse_layers(job_data["discriminator"])).to(self.device)

    def parse_layers(self, layers):
        res = []
        for layer in layers:
            if layer["type"] == "Dense":
                res.append(nn.Linear(layer["in_channels"], layer["out_channels"]))
            elif layer["type"] == "Conv2d":
                res.append(nn.Conv2d(layer["in_channels"], layer["out_channels"], kernel_size=layer["kernel"], stride=layer["stride"], padding=1))
            if layer["activation"] == "ReLU": 
                res.append(nn.ReLU())
            elif layer["activation"] == "Tanh": 
                res.append(nn.Tanh())
            elif layer["activation"] == "Sigmoid": 
                res.append(nn.Sigmoid())
        return res

    def train(self, job_id):
        # Update job status to "training"
        supabase.table("jobs").update({"status": "training"}).eq("id", job_id).execute()

        mean, std = 0.5, 0.5
        transforms_pipeline = transforms.Compose([transforms.ToTensor(), transforms.Normalize((mean), (std))])
        dataset = datasets.MNIST(root="data", transform=transforms_pipeline, download=True)
        loader = DataLoader(dataset, batch_size=self.job_data["batchSize"], shuffle=True)

        loss_function = nn.BCELoss()
        gen_optimizer = optim.Adam(self.generator.parameters(), lr=self.job_data["learningRate"])
        disc_optimizer = optim.Adam(self.discriminator.parameters(), lr=self.job_data["learningRate"])

        for epoch in range(self.job_data["epochs"]):
            for batch_idx, (real, _) in enumerate(loader):
                real = real.view(real.size(0), -1).to(self.device)
                noise = torch.randn(real.size(0), self.job_data["noiseDim"]).to(self.device)
                
                generated_data = self.generator(noise)
                disc_real = self.discriminator(real).view(-1)
                disc_fake = self.discriminator(generated_data.detach()).view(-1)

                loss_real = loss_function(disc_real, torch.ones_like(disc_real))
                loss_fake = loss_function(disc_fake, torch.zeros_like(disc_fake))
                disc_loss = (loss_real + loss_fake) / 2

                self.discriminator.zero_grad()
                disc_loss.backward()
                disc_optimizer.step()

                output = self.discriminator(generated_data).view(-1)
                gen_loss = loss_function(output, torch.ones_like(output))

                self.generator.zero_grad()
                gen_loss.backward()
                gen_optimizer.step()

                if batch_idx == 0:
                    epoch_update = {"epoch": epoch, "gen_loss": gen_loss.item(), "disc_loss": disc_loss.item()}
                    supabase.table("jobs").update({"progress": [epoch_update]}).eq("id", job_id).execute()

        supabase.table("jobs").update({"status": "completed"}).eq("id", job_id).execute()

def main():
    job_id = os.getenv("JOB_ID")
    job_response = supabase.table("jobs").select("*").eq("id", job_id).execute()
    if not job_response.data:
        print("No job found")
        return

    job_data = job_response.data[0]
    gan = GAN(job_data)
    gan.train(job_id)

if __name__ == "__main__":
    main()
