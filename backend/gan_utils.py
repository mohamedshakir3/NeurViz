import torch 
import torch.nn as nn 
import torch.optim as optim 
import torchvision 
import torchvision.datasets as datasets
from torch.utils.data import DataLoader
import torchvision.transforms as transforms
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("neurviz-dev-firebase-adminsdk-klnbv-818a8cffb8.json")
firebase_app = firebase_admin.initialize_app(cred)
db = firestore.client()


class Discriminator(nn.Module): 
    def __init__(self, layers):
        super().__init__()        
        self.discriminator = nn.Sequential(*layers)
    def forward(self, x): 
        return self.discriminator(x)
    
class Generator(nn.Module):
    def __init__(self,layers):
        super().__init__()
        self.generator = nn.Sequential(*layers)
        
    
    def forward(self, x):
        return self.generator(x)

class GAN():
    def __init__(self, gan):
        self.device = torch.device(
                            "mps" if torch.backends.mps.is_available() 
                            else "cuda" if torch.cuda.is_available() 
                            else "cpu")
        self.gan = gan
        self.generator = Generator(self.parse_gen(gan["generator"])).to(self.device)
        self.discriminator = Discriminator(self.parse_disc(gan["discriminator"])).to(self.device)
    
    def parse_gen(self, layers): 
        res = []
        if layers[0]["type"] == "Dense":
            res.append(nn.Linear(self.gan["hyperparameters"]["noiseDim"], layers[0]["channels"]))
        elif layers[0]["type"] == "Conv2d": 
            res.append(nn.Conv2d(
                            self.gan["hyperparameters"]["noiseDim"], 
                            layers[0]["channels"], 
                            kernel_size = layers[0]["kernal"], 
                            stride=layers[0]["stride"], 
                            padding=1))
        if layers[0]["activation"] == "ReLU": 
            res.append(nn.ReLU())
        elif layers[0]["activation"] == "Tanh": 
            res.append(nn.Tanh())
        elif layers[0]["activation"] == "Sigmoid": 
            res.append(nn.Sigmoid())
        
        for i in range(1, len(layers)): 
            if layers[i]["type"] == "Dense":
                res.append(nn.Linear(
                                layers[i-1]["channels"], 
                                layers[i]["channels"]))
            elif layers[i]["type"] == "Conv2d": 
                res.append(nn.Conv2d(
                            layers[i-1]["channels"], 
                            layers[i]["channels"], 
                            kernel_size = layers[i]["kernel"], 
                            stride=layers[i]["stride"], 
                            padding=1))
            if layers[i]["activation"] == "ReLU": 
                res.append(nn.ReLU())
            elif layers[i]["activation"] == "Tanh": 
                res.append(nn.Tanh())
            elif layers[i]["activation"] == "Sigmoid": 
                res.append(nn.Sigmoid())
                
        return res
    def parse_disc(self, layers): 
        res = []
        if layers[0]["type"] == "Dense":
            res.append(nn.Linear(self.gan["generator"][-1]["channels"], layers[0]["channels"]))
        elif layers[0]["type"] == "Conv2d": 
            res.append(nn.Conv2d(
                            self.gan["hyperparameters"]["noiseDim"], 
                            layers[0]["channels"], 
                            kernel_size = layers[0]["kernal"], 
                            stride=layers[0]["stride"], 
                            padding=1))
        if layers[0]["activation"] == "ReLU": 
            res.append(nn.ReLU())
        elif layers[0]["activation"] == "Tanh": 
            res.append(nn.Tanh())
        elif layers[0]["activation"] == "Sigmoid": 
            res.append(nn.Sigmoid())
        
        for i in range(1, len(layers)): 
            if layers[i]["type"] == "Dense":
                res.append(nn.Linear(
                                layers[i-1]["channels"], 
                                layers[i]["channels"]))
            elif layers[i]["type"] == "Conv2d": 
                res.append(nn.Conv2d(
                            layers[i-1]["channels"], 
                            layers[i]["channels"], 
                            kernel_size = layers[i]["kernel"], 
                            stride=layers[i]["stride"], 
                            padding=1))
            if layers[i]["activation"] == "ReLU": 
                res.append(nn.ReLU())
            elif layers[i]["activation"] == "Tanh": 
                res.append(nn.Tanh())
            elif layers[i]["activation"] == "Sigmoid": 
                res.append(nn.Sigmoid())
                
        return res

    def train(self, jobID):
        jobRef = db.collection("Jobs").document(jobID)        
        
        mean, std = 0.5, 0.5
        data_transforms = transforms.Compose(
            [transforms.ToTensor(), transforms.Normalize((mean), (std))] # This is used 
        )
        images = datasets.MNIST(root="data", transform=data_transforms, download=True)
        loader = DataLoader(images,batch_size=self.gan["hyperparameters"]["batchSize"], shuffle=True)

        momentum = 0.7

        gen_optimizer = optim.SGD(self.generator.parameters(), lr=self.gan["hyperparameters"]["learningRate"], momentum=momentum)
        disc_optimizer = optim.SGD(self.discriminator.parameters(), lr=self.gan["hyperparameters"]["learningRate"], momentum=momentum)
        loss_function = nn.BCELoss()

        for epoch in range(self.gan["hyperparameters"]["epochs"]):
            for batch, (real, _ ) in enumerate(loader):
                real = real.view(-1, 784).to(self.device) 
                batch_size = real.shape[0] 
                noise = torch.randn(batch_size, self.gan["hyperparameters"]["noiseDim"]).to(self.device)
                generated_data = self.generator(noise)
                disc_value = self.discriminator(real).view(-1)
                disc_loss = loss_function(disc_value, torch.ones_like(disc_value))
                disc_estimate = self.discriminator(generated_data.detach()).view(-1)
                disc_estimate_loss = loss_function(disc_estimate, torch.zeros_like(disc_estimate))
                total_loss = (disc_loss + disc_estimate_loss) / 2
                
                self.discriminator.zero_grad() 
                total_loss.backward()
                disc_optimizer.step()
                
                output = self.discriminator(generated_data).view(-1)
                gen_loss = loss_function(output, torch.ones_like(output))
                self.generator.zero_grad() 
                gen_loss.backward() 
                gen_optimizer.step()
                
                if batch == 0:
                    new_epoch = { "gen_loss": gen_loss.item(), "disc_loss" : total_loss.item() }
                    jobRef.update({
                        "epochs" : firestore.ArrayUnion([new_epoch])
                    })
                    print(f"Epoch: {epoch}, Generator Loss: {gen_loss.item()}, Discriminator Loss: {total_loss.item()}")
        
        jobRef.update({ "isTraining": False })
