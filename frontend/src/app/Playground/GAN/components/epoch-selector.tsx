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

export function EpochSelector() {
	const { gan, setGan } = useGan()!

	return (
		<div className="grid gap-2 pt-2">
			<HoverCard openDelay={200}>
				<HoverCardTrigger asChild>
					<div className="grid gap-4">
						<div className="flex items-center justify-between">
							<Label htmlFor="top-p">Epochs</Label>
							<span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
								{gan.hyperparameters.epochs}
							</span>
						</div>
						<Slider
							defaultValue={[gan.hyperparameters.epochs]}
							max={200}
							min={10}
							step={10}
							className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
							aria-label="Epochs"
							onValueChange={(value) =>
								setGan({
									...gan,
									hyperparameters: {
										...gan.hyperparameters,
										epochs: value[0],
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
					Control diversity via nucleus sampling: 0.5 means half of all
					likelihood-weighted options are considered.
				</HoverCardContent>
			</HoverCard>
		</div>
	)
}
