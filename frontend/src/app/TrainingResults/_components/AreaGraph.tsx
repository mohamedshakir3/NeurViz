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
import { type Epoch } from "@/types/NeuralNet"

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

// TODO: Fix spacing for tooltip label
export function AreaGraph({ data }: { data: Epoch[] }) {
	const chartData = data.map((epoch, index) => ({
		epoch: index,
		gen_loss: epoch.gen_loss,
		disc_loss: epoch.disc_loss,
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
