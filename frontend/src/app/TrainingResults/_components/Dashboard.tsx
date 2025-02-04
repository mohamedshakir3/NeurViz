"use client"
import { AreaGraph } from "@/app/TrainingResults/_components/AreaGraph"
import PageContainer from "@/components/layout/page-container"
import Epochs from "@/app/TrainingResults/_components/Epochs"
import { useState, useEffect } from "react"
import { collection, onSnapshot, doc } from "firebase/firestore"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/lib/firebase"
import { BrainCircuit, Disc, Dumbbell, Layers } from "lucide-react"

const jobRef = collection(db, "Jobs") // Collection
// TODO: Fix all the types here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Dashboard({
	jobID,
	job,
}: {
	jobID: string
	job: any
}) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [trainingJob, setTrainingJob] = useState<any>(job)
	useEffect(() => {
		if (trainingJob.isTraining) {
			const unsubscribe = onSnapshot(doc(jobRef, jobID), (snapshot) => {
				const updatedEpochs = snapshot.data() || {}
				setTrainingJob({
					...trainingJob,
					epochs: updatedEpochs?.epochs,
					isTraining: updatedEpochs?.isTraining,
				})
			})
			return () => unsubscribe()
		}
	}, [])
	const lastEpoch =
		trainingJob.epochs?.length > 0
			? trainingJob.epochs[trainingJob.epochs.length - 1]
			: { gen_loss: 0, disc_loss: 0 }

	return (
		<PageContainer scrollable>
			<div className="space-y-2">
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="analytics" disabled>
							Analytics
						</TabsTrigger>
					</TabsList>
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
									<div className="text-2xl font-bold">
										{trainingJob.epochs.length}
									</div>
									<p className="text-xs text-muted-foreground">
										Batch size: {trainingJob?.hyperparameters?.batchSize}
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Layers
									</CardTitle>
									<Layers />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{trainingJob.generator.length +
											trainingJob.discriminator.length}
									</div>
									<p className="text-xs text-muted-foreground">
										Number of generator and discriminator layers trained.
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
										{Math.round(lastEpoch.gen_loss * 1000) / 1000}
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
										{Math.round(lastEpoch.disc_loss * 1000) / 1000}
									</div>
									<p className="text-xs text-muted-foreground">
										Ending discriminator loss.
									</p>
								</CardContent>
							</Card>
						</div>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
							<div className="col-span-4">
								<AreaGraph data={trainingJob.epochs} />
							</div>
							<Card className="col-span-4 md:col-span-3">
								<CardHeader>
									<CardTitle>Epochs</CardTitle>
									<CardDescription>
										There was {trainingJob.epochs.length} epochs trained.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Epochs jobID={jobID} />
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</PageContainer>
	)
}
