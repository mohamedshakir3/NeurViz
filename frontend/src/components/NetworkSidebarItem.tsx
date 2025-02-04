"use client"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuAction,
} from "@/components/ui/sidebar"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type { ConvLayer } from "@/types/NeuralNet"
import CreateLayerModal from "@/components/CreateLayerModal"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { useGan } from "@/components/GanProvider"
import { usePathname } from "next/navigation"

export function GeneratorMenuItem() {
	const { gan, setGan } = useGan()!
	const pathName = usePathname()
	const isGAN = pathName == "/GAN"
	const deleteGenLayer = (index: number) => {
		const newLayers = gan.generator.filter((layer, idx) => {
			return idx != index
		})
		setGan({
			...gan,
			generator: newLayers,
		})
	}

	return (
		<Collapsible defaultOpen className="group/gen">
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton className="pr-8">
						Generator
						<ChevronRight className="ml-auto transition-transform group-data-[state=open]/gen:rotate-90" />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{gan.generator.map((layer, index) => (
							<SidebarMenuItem key={index}>
								<SidebarMenuButton asChild>
									<span className="flex justify-start">
										<span>{layer.type}</span>
										<span className="hidden md:inline text-slate-400">
											Channels: {layer.channels}
										</span>
										{layer.type === "Conv2d" ? (
											<>
												<span className="hidden md:inline text-slate-400">
													Kernel: {(layer as ConvLayer).kernel}
												</span>
												<span className="hidden md:inline text-slate-400">
													Stride: {(layer as ConvLayer).stride}
												</span>
											</>
										) : (
											""
										)}
										<span className="text-slate-400">{layer.activation}</span>
									</span>
								</SidebarMenuButton>
								{isGAN && (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<SidebarMenuAction>
												<MoreHorizontal />
											</SidebarMenuAction>
										</DropdownMenuTrigger>
										<DropdownMenuContent side="right" align="start">
											<DropdownMenuItem>
												<span>Edit Layer</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<span onClick={() => deleteGenLayer(index)}>
													Delete Layer
												</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								)}
							</SidebarMenuItem>
						))}
						{isGAN && (
							<SidebarMenuItem>
								<Dialog>
									<DialogTrigger asChild>
										<SidebarMenuButton className="flex justify-start">
											Add Layer
											<ChevronRight />
										</SidebarMenuButton>
									</DialogTrigger>
									<CreateLayerModal network={"generator"} />
								</Dialog>
							</SidebarMenuItem>
						)}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	)
}
export function DiscriminatorMenuItem() {
	const { gan, setGan } = useGan()!
	const pathName = usePathname()
	const isGAN = pathName == "/"
	const deleteDiscLayer = (index: number) => {
		const newLayers = gan.discriminator.filter((layer, idx) => {
			return idx != index
		})
		setGan({
			...gan,
			discriminator: newLayers,
		})
	}

	return (
		<Collapsible defaultOpen className="group/Disc">
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton className="pr-8">
						Discriminator
						<ChevronRight className="ml-auto transition-transform group-data-[state=open]/Disc:rotate-90" />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{gan.discriminator.map((layer, index) => (
							<SidebarMenuItem key={index}>
								<SidebarMenuButton asChild>
									<span className="flex justify-start">
										<span>{layer.type}</span>
										<span className="hidden md:inline text-slate-400">
											Channels: {layer.channels}
										</span>

										{layer.type === "Conv2d" ? (
											<>
												<span className="hidden md:inline text-slate-400">
													Kernel: {(layer as ConvLayer).kernel}
												</span>
												<span className="hidden md:inline text-slate-400">
													Stride: {(layer as ConvLayer).stride}
												</span>
											</>
										) : (
											""
										)}
										<span className="text-slate-400">{layer.activation}</span>
									</span>
								</SidebarMenuButton>
								{isGAN && (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<SidebarMenuAction>
												<MoreHorizontal />
											</SidebarMenuAction>
										</DropdownMenuTrigger>
										<DropdownMenuContent side="right" align="start">
											<DropdownMenuItem>
												<span>Edit Layer</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<span onClick={() => deleteDiscLayer(index)}>
													Delete Layer
												</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								)}
							</SidebarMenuItem>
						))}
						{isGAN && (
							<SidebarMenuItem>
								<Dialog>
									<DialogTrigger asChild>
										<SidebarMenuButton className="flex justify-start">
											Add Layer
											<ChevronRight />
										</SidebarMenuButton>
									</DialogTrigger>
									<CreateLayerModal network="discriminator" />
								</Dialog>
							</SidebarMenuItem>
						)}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	)
}
