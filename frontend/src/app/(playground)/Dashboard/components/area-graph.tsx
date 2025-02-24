"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
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

export function AreaGraph({ job }: { job: Tables<"jobs"> }) {
	const chartData = ((job.epochs as Epoch[]) ?? []).map((epoch, index) => ({
		id: index,
		gen_loss: epoch?.gen_loss,
		disc_loss: epoch?.disc_loss,
	}))
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
