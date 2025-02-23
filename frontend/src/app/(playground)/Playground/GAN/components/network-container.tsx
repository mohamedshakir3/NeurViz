"use client"
import { History, ChevronRight, MoreHorizontal } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader"
import HistoryModal from "./history-modal"
import NetworkArch from "./network-arch"
import { useGan } from "@/components/GanProvider"
import { train } from "@/lib/lib"

const loadingStates = [
	{
		text: "Submitting Job",
	},
	{
		text: "Job Queued",
	},
	{
		text: "Starting Training",
	},
	{
		text: "Redirecting...",
	},
]

export default function NetworkContainer({ tasks }: { tasks: any }) {
	const { gan } = useGan()!

	const [loading, setLoading] = useState(false)
	const handleClick = () => {
		setLoading(true)
		train(gan)
	}

	return (
		<div className="flex min-h-full flex-col space-y-4">
			<Loader
				loadingStates={loadingStates}
				loading={loading}
				duration={1000}
			/>
			<div className="sm:px-2 min-h-[75vh] w-full dark:bg-background bg-white dark:bg-dot-white/[0.75] bg-dot-black/[1.0] relative flex items-center justify-center">
				<TransformWrapper>
					<TransformComponent
						wrapperStyle={{
							width: "100%",
							height: "75vh",
							boxSizing: "border-box",
						}}
						contentStyle={{ width: "100%", height: "100%" }}
					>
						<NetworkArch model={gan} />
					</TransformComponent>
				</TransformWrapper>
			</div>
			<div className="flex items-center space-x-2">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button onClick={() => handleClick()}>Train</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Coming Soon!</p>
					</TooltipContent>
				</Tooltip>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="secondary">
							<span className="sr-only">Show history</span>
							<History />
						</Button>
					</DialogTrigger>
					<HistoryModal tasks={tasks} />
				</Dialog>
			</div>
		</div>
	)
}
