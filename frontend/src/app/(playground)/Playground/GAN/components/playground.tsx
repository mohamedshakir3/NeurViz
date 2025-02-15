"use client"
import { History, ChevronRight } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { Fragment } from "react"
import {
	Noise,
	ReLU,
	Conv,
	Dense,
	Tanh,
	Sigmoid,
	LeakyReLU,
} from "@/components/LayerSvg"

import { Separator } from "@/components/ui/separator"

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

import CodeViewer from "./code-viewer"
import { NoiseDimSelector } from "./noisedim-selector"
import { PresetSave } from "./preset-save"
import { PresetSelector, presets } from "./preset-selector"
import { PresetShare } from "./preset-share"
import { LearningSelector } from "./learning-selector"
import { BatchSelector } from "./batch-selector"
import { MomentumSelector } from "./momentum-selector"
import { EpochSelector } from "./epoch-selector"
import { useGan } from "@/components/GanProvider"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import CreateLayerModal from "@/components/CreateLayerModal"

export default function Playground() {
	const { gan } = useGan()!
	return (
		<>
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
						<div className="flex flex-col space-y-4 sm:w-full md:order-2">
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
										<Dialog>
											<DialogTrigger asChild>
												<Button className="flex justify-start">
													Add Layer
													<ChevronRight />
												</Button>
											</DialogTrigger>
											<CreateLayerModal network={"generator"} />
										</Dialog>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
						<div className="md:order-1">
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
											<div className="grid place-items-center content-center w-full h-full gap-24">
												<div className="flex items-center">
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger>
																<Noise />
															</TooltipTrigger>
															<TooltipContent>
																<p>
																	Dimension: {gan.hyperparameters.noiseDim}
																</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
													{gan.generator.map((layer, index) => (
														<Fragment key={index}>
															{layer.type == "Dense" ? (
																<Dense key={index + "dense"} />
															) : layer.type == "Conv2d" ? (
																<Conv key={index + "conv2d"} />
															) : (
																""
															)}
															{layer.activation == "ReLU" ? (
																<ReLU key={index + "relu"} />
															) : layer.activation == "Tanh" ? (
																<Tanh key={index + "tanh"} />
															) : layer.activation == "Sigmoid" ? (
																<Sigmoid key={index + "sigmoid"} />
															) : (
																""
															)}
														</Fragment>
													))}
												</div>
												<div className="flex items-center">
													{gan.discriminator.map((layer, index) => (
														<Fragment key={index}>
															{layer.type == "Dense" ? (
																<Dense key={index + "dense"} />
															) : layer.type == "Conv2d" ? (
																<Conv key={index + "conv2d"} />
															) : (
																""
															)}
															{layer.activation == "ReLU" ? (
																<ReLU key={index + "relu"} />
															) : layer.activation == "Tanh" ? (
																<Tanh key={index + "tanh"} />
															) : layer.activation == "Sigmoid" ? (
																<Sigmoid key={index + "sigmoid"} />
															) : layer.activation == "LeakyReLU" ? (
																<LeakyReLU key={index + "leakyrelu"} />
															) : (
																""
															)}
														</Fragment>
													))}
												</div>
											</div>
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
									<Button variant="secondary">
										<span className="sr-only">Show history</span>
										<History />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
