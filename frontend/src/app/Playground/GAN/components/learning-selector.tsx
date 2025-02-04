"use client"

import * as React from "react"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useGan } from "@/components/GanProvider"

export function LearningSelector() {
	const { gan, setGan } = useGan()!

	return (
		<div className="grid gap-2 pt-2">
			<HoverCard openDelay={200}>
				<HoverCardTrigger asChild>
					<div className="grid gap-4">
						<div className="flex items-center justify-between">
							<Label htmlFor="temperature">Learning Rate</Label>
							<span className="w-auto rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
								{gan.hyperparameters.learningRate}
							</span>
						</div>
						<Slider
							defaultValue={[gan.hyperparameters.learningRate * 10000]}
							max={10}
							min={1}
							step={1}
							className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
							onValueChange={(value) =>
								setGan({
									...gan,
									hyperparameters: {
										...gan.hyperparameters,
										learningRate: value[0] / 10000,
									},
								})
							}
						/>
					</div>
				</HoverCardTrigger>
				<HoverCardContent
					align="start"
					className="w-[260px] text-sm"
					side="left"
				>
					Controls tuning parameter in an optimization algorithm that
					determines the step size at each iteration while moving toward a
					minimum of a loss function.
				</HoverCardContent>
			</HoverCard>
		</div>
	)
}
