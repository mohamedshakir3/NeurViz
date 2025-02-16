"use client"

import { ChevronRight, Edit, MoreHorizontal } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import type { ConvLayer } from "@/types/NeuralNet"
import CreateLayerModal from "@/components/CreateLayerModal"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useGan } from "@/components/GanProvider"
import { type Layer } from "@/types/NeuralNet"
import EditLayerModel from "./edit-layer-modal"
export function GanMenu() {
	return (
		<div className="w-full flex flex-col">
			<GeneratorMenuItem />
			<DiscriminatorMenuItem />
		</div>
	)
}

function GeneratorMenuItem() {
	const { gan, setGan } = useGan()!

	const deleteGenLayer = (index: number) => {
		const newLayers = gan.generator.filter((_, idx) => idx !== index)
		setGan({
			...gan,
			generator: newLayers,
		})
	}

	const [openIndex, setOpenIndex] = useState<number>(-1)

	useEffect(() => {
		console.log(openIndex)
	}, [openIndex])

	return (
		<Collapsible defaultOpen className="group/gen">
			<CollapsibleTrigger asChild>
				<Button variant="ghost" className="w-full px-0 justify-between">
					Generator
					<ChevronRight className="transition-transform group-data-[state=open]/gen:rotate-90" />
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<ul className="mt-2 space-y-2">
					{gan.generator.map((layer, index) => (
						<HoverCard key={index} openDelay={200}>
							<HoverCardTrigger>
								<li key={index} className="flex items-center justify-between">
									<span className="text-sm flex gap-2">
										<span>{layer.type}</span>
										<span className="text-muted-foreground">
											{layer.activation}
										</span>
									</span>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="sm">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem>Edit Layer</DropdownMenuItem>
											<DropdownMenuItem onClick={() => deleteGenLayer(index)}>
												Delete Layer
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</li>
							</HoverCardTrigger>
							<HoverCardContent
								align="start"
								className="w-full text-sm"
								side="left"
								key={index}
							>
								<div className="flex flex-col gap-1">
									<span>In Channels: {layer.in_channels}</span>
									<span>Out Channels: {layer.out_channels}</span>
									{layer.type == "Conv2d" && (
										<>
											<span>Stride: {(layer as ConvLayer).stride}</span>
											<span>Kernel: {(layer as ConvLayer).kernel}</span>
										</>
									)}
								</div>
							</HoverCardContent>
						</HoverCard>
					))}
					<li>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" className="w-full justify-between">
									Add Layer
									<ChevronRight className="h-4 w-4" />
								</Button>
							</DialogTrigger>
							<CreateLayerModal network="generator" />
						</Dialog>
					</li>
				</ul>
			</CollapsibleContent>
		</Collapsible>
	)
}

function DiscriminatorMenuItem() {
	const { gan, setGan } = useGan()!

	const deleteDiscLayer = (index: number) => {
		const newLayers = gan.discriminator.filter((_, idx) => idx !== index)
		setGan({
			...gan,
			discriminator: newLayers,
		})
	}

	return (
		<Collapsible defaultOpen className="group/disc">
			<CollapsibleTrigger asChild>
				<Button variant="ghost" className="w-full px-0 justify-between">
					Discriminator
					<ChevronRight className="transition-transform group-data-[state=open]/disc:rotate-90" />
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<ul className="mt-2 space-y-2">
					{gan.discriminator.map((layer, index) => (
						<HoverCard key={index} openDelay={200}>
							<HoverCardTrigger>
								<li key={index} className="flex items-center justify-between">
									<span className="text-sm flex gap-2">
										<span>{layer.type}</span>
										<span className="text-muted-foreground">
											{layer.activation}
										</span>
									</span>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="sm">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem>Edit Layer</DropdownMenuItem>
											<DropdownMenuItem onClick={() => deleteDiscLayer(index)}>
												Delete Layer
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</li>
							</HoverCardTrigger>
							<HoverCardContent
								align="start"
								className="w-full text-sm"
								side="left"
								key={index}
							>
								<div className="flex flex-col gap-1">
									<span>In Channels: {layer.in_channels}</span>
									<span>Out Channels: {layer.out_channels}</span>
									{layer.type == "Conv2d" && (
										<>
											<span>Stride: {(layer as ConvLayer).stride}</span>
											<span>Kernel: {(layer as ConvLayer).kernel}</span>
										</>
									)}
								</div>
							</HoverCardContent>
						</HoverCard>
					))}
					<li>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" className="w-full justify-between">
									Add Layer
									<ChevronRight className="h-4 w-4" />
								</Button>
							</DialogTrigger>
							<CreateLayerModal network="discriminator" />
						</Dialog>
					</li>
				</ul>
			</CollapsibleContent>
		</Collapsible>
	)
}
