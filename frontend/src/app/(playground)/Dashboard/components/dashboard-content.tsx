"use client"
import { useState, useEffect } from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { BrainCircuit, Disc, Dumbbell, Database } from "lucide-react"
import { Epochs } from "../components/epochs"
import { AreaGraph } from "../components/area-graph"
import supabase from "@/utils/supabase/supabase"
import { type Tables, type ModelParams } from "@/types/database-types"

type Epoch = {
	gen_loss: number
	disc_loss: number
}

export default function Dashboard({ job }: { job: Tables<"jobs"> }) {
	const [jobState, setJobState] = useState<Tables<"jobs">>(job)
	useEffect(() => {
		const channel = supabase
			.channel("realtime jobs")
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "jobs",
					filter: `id=eq.${job.id}`,
				},
				(payload) => {
					console.log(jobState)
					setJobState(payload.new as Tables<"jobs">)
				}
			)
			.subscribe()
		return () => {
			supabase.removeChannel(channel)
		}
	}, [supabase, jobState, setJobState])
	return (
		<>
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
							{(jobState.epochs ?? []).length}
						</div>
						<p className="text-xs text-muted-foreground">
							Batch size:{" "}
							{
								(jobState.model_params as ModelParams).hyperparameters
									.batchSize
							}
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
								(((jobState.epochs ?? []).length > 0
									? (jobState.epochs[jobState.epochs.length - 1] as Epoch)
											.gen_loss
									: 0) ?? 0) * 1000
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
								(((jobState.epochs ?? []).length > 0
									? (jobState.epochs[jobState.epochs.length - 1] as Epoch)
											.disc_loss
									: 0) ?? 0) * 1000
							) / 1000}
						</div>
						<p className="text-xs text-muted-foreground">
							Ending generator loss.
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Dataset</CardTitle>
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
					<AreaGraph job={jobState} />
				</div>
				<Card className="col-span-4 md:col-span-3">
					<CardHeader>
						<CardTitle>Epochs</CardTitle>
						<CardDescription>
							There was {jobState.epochs?.length ?? 0} epochs trained.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Epochs epochs={jobState.epochs ?? []} />
					</CardContent>
				</Card>
			</div>
		</>
	)
}
