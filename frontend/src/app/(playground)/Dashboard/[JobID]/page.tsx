import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrainCircuit, Disc, Dumbbell, Database } from "lucide-react"
import { Epochs } from "../components/epochs"
import { getJobById } from "@/lib/db-actions"
import { AreaGraph } from "../components/area-graph"
import { Model } from "../components/model"
import { Tables } from "@/types/database-types"

type Epoch = {
	gen_loss: number
	disc_loss: number
}

export default async function DashboardPage({
	params,
}: {
	params: Promise<{ JobID: string }>
}) {
	const { JobID } = await params

	const job: Tables<"jobs"> = await getJobById(JobID)
	const model: any = job.model_params
	const epochs = job.epochs ?? [{ gen_loss: 0, disc_loss: 0 }]
	const last_epoch: Epoch = epochs[epochs.length - 1] as Epoch

	return (
		<div className="hidden flex-col md:flex">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					<div className="flex items-center space-x-2">
						<Button>Download</Button>
					</div>
				</div>
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="model">Model</TabsTrigger>
					</TabsList>
					<TabsContent value="model" className="space-y-4">
						<Model model={model} />
					</TabsContent>
					<TabsContent value="overview" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Epochs Trained
									</CardTitle>
									<Dumbbell />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{epochs.length}</div>
									<p className="text-xs text-muted-foreground">
										Batch size: {model.hyperparameters.batchSize}
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Generator Loss
									</CardTitle>
									<BrainCircuit />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{Math.round(last_epoch.gen_loss * 1000) / 1000}
									</div>
									<p className="text-xs text-muted-foreground">
										Ending generator loss.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Discriminator Loss
									</CardTitle>
									<Disc />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{Math.round((last_epoch?.disc_loss ?? 0) * 1000) / 1000}
									</div>
									<p className="text-xs text-muted-foreground">
										Ending discriminator loss.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Dataset
									</CardTitle>
									<Database />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">MNIST</div>
									<p className="text-xs text-muted-foreground">
										Handwritten digits dataset.
									</p>
								</CardContent>
							</Card>
						</div>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
							<div className="col-span-4">
								<AreaGraph jobId={JobID} job={job} data={epochs ?? []} />
							</div>
							<Card className="col-span-4 md:col-span-3">
								<CardHeader>
									<CardTitle>Epochs</CardTitle>
									<CardDescription>
										There was {epochs?.length ?? 0} epochs trained.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Epochs epochs={epochs ?? []} />
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
