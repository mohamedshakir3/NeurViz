"use client"
import { History, ChevronRight, MoreHorizontal } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import HistoryModal from "./history-modal"
import NetworkArch from "./network-arch"
export default function NetworkContainer({ tasks }: { tasks: any }) {
	return (
		<div className="flex min-h-full flex-col space-y-4">
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
						<NetworkArch />
					</TransformComponent>
				</TransformWrapper>
			</div>
			<div className="flex items-center space-x-2">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button>Train</Button>
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
