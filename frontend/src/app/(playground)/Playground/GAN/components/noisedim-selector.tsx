"use client"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useGan } from "@/components/GanProvider"

export function NoiseDimSelector() {
	const { gan, setGan } = useGan()!

	return (
		<div className="grid gap-2 pt-2">
			<HoverCard openDelay={200}>
				<HoverCardTrigger asChild>
					<div className="grid gap-4">
						<div className="flex items-center justify-between">
							<Label htmlFor="maxlength">Noise Dimension</Label>
							<span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
								{gan.hyperparameters.noiseDim}
							</span>
						</div>
						<Slider
							defaultValue={[gan.hyperparameters.noiseDim]}
							max={200}
							min={50}
							step={10}
							className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							onValueChange={(value: any) =>
								setGan({
									...gan,
									hyperparameters: {
										...gan.hyperparameters,
										noiseDim: value[0],
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
					The maximum number of tokens to generate. Requests can use up to
					2,048 or 4,000 tokens, shared between prompt and completion. The
					exact limit varies by model.
				</HoverCardContent>
			</HoverCard>
		</div>
	)
}
