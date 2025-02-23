import { Separator } from "@/components/ui/separator"
import CodeViewer from "./components/code-viewer"
import { NoiseDimSelector } from "./components/noisedim-selector"
import { PresetSave } from "./components/preset-save"
import { PresetSelector, presets } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"
import { LearningSelector } from "./components/learning-selector"
import { BatchSelector } from "./components/batch-selector"
import { MomentumSelector } from "./components/momentum-selector"
import { EpochSelector } from "./components/epoch-selector"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { taskSchema } from "./components/schema"
import { GanMenu } from "./components/network-menu"
import NetworkContainer from "./components/network-container"
import { z } from "zod"
import { getJobsByOwnerId } from "@/lib/db-actions"
import { getCurrentUser } from "@/lib/auth-actions"

async function getJobs() {
	const user = await getCurrentUser()
	const jobs = await getJobsByOwnerId(user.user.id)
	return z.array(taskSchema).parse(jobs)
}

export default async function Playground() {
	const jobs = await getJobs()
	return (
		<div className="h-full flex flex-col">
			<div className="container flex max-w-full pl-8 pr-8 flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
				<h1 className="hidden md:block">Playground</h1>
				<div className="ml-auto flex w-full space-x-2 sm:justify-end">
					<PresetSelector presets={presets} />
					<PresetSave />
					<div className="space-x-2 flex">
						<p className="hidden sm:block">
							<CodeViewer />
						</p>
						<PresetShare />
					</div>
				</div>
			</div>
			<Separator />
			<div className="container h-full max-w-full px-4 justify-center sm:px-12 py-6 lg:px-20">
				<div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
					<div className="flex flex-col space-y-4 sm:h-[75vh] sm:scrollbar-hidden sm:overflow-y-scroll sm:w-full md:order-2">
						<Accordion
							defaultValue="hyperparameters"
							type="single"
							collapsible
						>
							<AccordionItem value="hyperparameters">
								<AccordionTrigger>Hyperparameters</AccordionTrigger>
								<AccordionContent>
									<LearningSelector />
									<NoiseDimSelector />
									<EpochSelector />
									<BatchSelector />
									<MomentumSelector />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<Accordion type="single" collapsible>
							<AccordionItem value="network">
								<AccordionTrigger>Network</AccordionTrigger>
								<AccordionContent>
									<GanMenu />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
					<div className="md:order-1">
						<NetworkContainer tasks={jobs} />
					</div>
				</div>
			</div>
		</div>
	)
}
