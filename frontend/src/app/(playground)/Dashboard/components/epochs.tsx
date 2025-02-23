import { Fragment } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function Epochs({ epochs }: { epochs: any[] }) {
	return (
		<div className="space-y-8">
			<ScrollArea className="h-[310px] w-full rounded-md">
				<div className="p-4">
					{epochs.map((epoch, index) => (
						<Fragment key={index}>
							<div className="text-sm flex justify-between">
								<span>{index}</span>
								<span>Generator Loss: {epoch.gen_loss?.toFixed(3)}</span>
								<span>Discriminator Loss: {epoch.disc_loss?.toFixed(3)}</span>
							</div>
							<Separator className="my-2" />
						</Fragment>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}
