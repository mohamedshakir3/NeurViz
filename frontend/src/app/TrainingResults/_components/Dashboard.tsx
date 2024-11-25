"use client";
import { AreaGraph } from "@/app/TrainingResults/_components/AreaGraph";
import { BarGraph } from "@/app/TrainingResults/_components/BarGraph";
import { PieGraph } from "@/components/PieChart";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import PageContainer from "@/components/layout/page-container";
import Epochs from "@/app/TrainingResults/_components/Epochs";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/firebase";
import { BrainCircuit, Disc, Dumbbell, Layers } from "lucide-react";

type TrainingUpdate = {
	epoch: number;
	generator_loss: number;
	discriminator_loss: number;
};
const jobRef = collection(db, "Jobs"); // Collection

export default function Dashboard({ jobID, job }: { jobID: string; job: any }) {
	// TODO: Change this to listen for "complete" state and fetch entire GAN object as well
	const [trainingJob, setTrainingJob] = useState<any>(job);
	useEffect(() => {
		if (trainingJob.isTraining) {
			const unsubscribe = onSnapshot(doc(jobRef, jobID), (snapshot) => {
				const updatedEpochs = (snapshot.data() as any) || [];
				setTrainingJob({
					...trainingJob,
					epochs: updatedEpochs.epochs,
					isTraining: updatedEpochs.isTraining,
				});
			});
			return () => unsubscribe();
		}
	}, [trainingJob.isTraining]);
	return (
		<PageContainer scrollable>
			<div className="space-y-2">
				{/* <div className="flex items-center justify-between space-y-2">
					<div className="hidden items-center space-x-2 md:flex">
						<CalendarDateRangePicker />
						<Button>Download</Button>
					</div>
				</div> */}
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
									{/* <svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="h-4 w-4 text-muted-foreground"
									>
										<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
										<circle cx="9" cy="7" r="4" />
										<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
									</svg> */}
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
										{Math.round(
											trainingJob.epochs[trainingJob.epochs.length - 1]
												?.gen_loss * 1000
										) / 1000}
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
										{Math.round(
											trainingJob.epochs[trainingJob.epochs.length - 1]
												?.disc_loss * 1000
										) / 1000}
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
	);
}
