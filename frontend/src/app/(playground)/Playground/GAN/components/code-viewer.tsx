import { Button } from "@/components/ui/button"
import { useGan } from "@/components/GanProvider"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { CodeBlock } from "@/components/ui/code-block"

const requirements = `torch
torchvision
`
// TODO: Make this all more general and more customizable
export default function CodeViewer() {
	const { gan } = useGan()!
	const trainer = `
import torch
import torch.nn as nn
import torch 
import torch.nn as nn 
import torch.optim as optim 
import torchvision 
import torchvision.datasets as datasets
from torch.utils.data import DataLoader
import torchvision.transforms as transforms
from model import Discriminator, Generator

device = torch.device(
			"cuda" if torch.cuda.is_available()
			else "cpu")
learning_rate = ${gan.hyperparameters.learningRate}
batch_size = ${gan.hyperparameters.batchSize}
epochs = ${gan.hyperparameters.epochs}
noise_dim = ${gan.hyperparameters.noiseDim}
momentum = ${gan.hyperparameters.momentum}

disc = Discriminator().toDevice(device)
gen = Generator().toDevice(device)
mean, std = 0.5, 0.5
transforms = transforms.Compose(
    [transforms.ToTensor(),
	transforms.Normalize((mean), (std))] 
)
images = datasets.MNIST(root="data", 
						transform=transforms,
						download=True)
loader = DataLoader(images,
					batch_size=batch_size,
					shuffle=True)

gen_optim = optim.SGD(gen.parameters(), 
						lr=learning_rate,
						momentum=momentum)
disc_optim = optim.SGD(disc.parameters(), 
							lr=learning_rate, 
							momentum=momentum)
lf = nn.BCELoss()

for epoch in range(epochs):
    for batch, (real, _ ) in enumerate(loader):
        real = real.view(-1, 784).to(device)
        batch_size = real.shape[0] 
        
        noise = torch.randn(batch_size,
							noise_dim).to(device)
        generated_data = gen(noise)
        disc_value = disc(real).view(-1)
        disc_loss = lf(disc_value, 
						torch.ones_like(disc_value))
        de = disc(generated_data.detach()).view(-1)
        de_loss = lf(de, torch.zeros_like(de))
        total_loss = (disc_loss + de_loss) / 2
        
        disc.zero_grad() 
        total_loss.backward()
        disc_optim.step()
        
        output = disc(generated_data).view(-1)
        gen_loss = lf(output,
						torch.ones_like(output))
        gen.zero_grad() 
        gen_loss.backward() 
        gen_optim.step()
        
        if batch == 0:
            print(f"""Epoch: {epoch}
					  Generator Loss: {gen_loss},
					  Discriminator Loss: {total_loss}""")
`

	const discriminatorLayers = `	self.discriminator = nn.Sequential(
    ${gan.discriminator
			.map(
				(layer) =>
					`		nn.Linear(${layer.in_channels},${layer.out_channels}),nn.${layer.activation}()`
			)
			.join(",\n	")}
		)`
	const generatorLayers = `self.generator = nn.Sequential(
  ${gan.generator
		.map(
			(layer) =>
				`			nn.Linear(${layer.in_channels},${layer.out_channels}),nn.${layer.activation}()`
		)
		.join(",\n")}
		)`
	const model = `import torch 
import torch.nn as nn

class Discriminator(nn.Module): 
	def __init__(self, features):
		super().__init__()
	${discriminatorLayers}
	
	def forward(self, x): 
        return self.discriminator(x)

class Generator(nn.Module): 
	def __init__(self, noise_dim, image):
		super().__init__()
		${generatorLayers}

    def forward(self, x):
        return self.generator(x)
`
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">View code</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[625px]">
				<DialogHeader>
					<DialogTitle>View code</DialogTitle>
					<DialogDescription>
						You can copy and paste the following code to train and run your
						models locally.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4">
					<div className="max-w-3xl mx-auto w-full">
						<CodeBlock
							language="python"
							filename=""
							tabs={[
								{ name: "model.py", code: model, language: "python" },
								{ name: "trainer.py", code: trainer, language: "python" },
								{
									name: "requirements.txt",
									code: requirements,
									language: "txt",
								},
							]}
						/>
					</div>
					<div>
						<p className="text-sm text-muted-foreground">
							Make sure to copy and paste the requirements.txt file and install
							the required dependencies with{" "}
							<code>pip install -r requirements.txt</code> before running the
							code.
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
