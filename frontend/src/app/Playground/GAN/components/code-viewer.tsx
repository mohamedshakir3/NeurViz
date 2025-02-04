import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { CodeBlock } from "@/components/ui/code-block"
const neurel_net = `class Discriminator(nn.Module): 
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
`
const requirements = `torch
torchvision
`

export default function CodeViewer() {
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
								{ name: "gan.py", code: neurel_net, language: "python" },
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
