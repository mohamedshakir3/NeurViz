"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import supabase from "@/utils/supabase/supabase"
import { type Tables } from "@/types/database-types"
const chartConfig = {
	gen_loss: {
		label: "Generator Loss",
		color: "hsl(var(--chart-1))",
	},
	disc_loss: {
		label: "Discriminator Loss",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig

type Epoch = {
	gen_loss: number
	disc_loss: number
}

export function AreaGraph({
	jobId,
	data,
	job,
}: {
	job: Tables<"jobs">
	jobId: string
	data: any[]
}) {
	const [jobState, setJobState] = useState(job)
	console.log(jobState)
	var chartData = (jobState.epochs as Epoch[])?.map((epoch, index) => ({
		id: index,
		gen_loss: epoch?.gen_loss,
		disc_loss: epoch?.disc_loss,
	}))
	useEffect(() => {
		const channel = supabase
			.channel("realtime jobs")
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "jobs",
					filter: `id=eq.${jobId}`,
				},
				(payload) => {
					setJobState(payload.new as Tables<"jobs">)
				}
			)
			.subscribe()
		return () => {
			supabase.removeChannel(channel)
		}
	}, [supabase, jobState, setJobState])
	useEffect(() => {
		chartData = (jobState.epochs as Epoch[]).map((epoch, index) => ({
			id: index,
			gen_loss: epoch?.gen_loss,
			disc_loss: epoch?.disc_loss,
		}))
	}, [jobState])
	return (
		<Card>
			<CardHeader>
				<CardTitle>Training Loss</CardTitle>
				<CardDescription>
					Discriminator and GAN loss over training epochs
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[310px] w-full"
				>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="epoch"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dot" />}
						/>
						<Area
							dataKey="disc_loss"
							type="monotone"
							fill="var(--color-disc_loss)"
							fillOpacity={0.4}
							stroke="var(--color-disc_loss)"
							stackId="a"
						/>
						<Area
							dataKey="gen_loss"
							type="monotone"
							fill="var(--color-gen_loss)"
							fillOpacity={0.4}
							stroke="var(--color-gen_loss)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
