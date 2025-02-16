"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useGan } from "@/components/GanProvider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ConvLayer, Layer } from "@/types/NeuralNet"

export default function EditLayerModel({
	network,
	index,
}: {
	network: string
	index: number
}) {
	const { gan, setGan } = useGan()!

	const layer: Layer =
		network == "generator" ? gan.generator[index] : gan.discriminator[index]

	const convLayer = layer.type == "Conv2d" ? (layer as ConvLayer) : null

	// Initialize state with the existing layer's values
	const [type, setType] = useState<string>(layer.type)
	const [in_channels, setInChannels] = useState<number>(layer.in_channels)
	const [out_channels, setOutChannels] = useState<number>(layer.out_channels)
	const [activation, setActivation] = useState<string>(layer.activation)
	const [kernel, setKernel] = useState<number | undefined>(convLayer?.kernel)
	const [stride, setStride] = useState<number | undefined>(convLayer?.stride)

	const updateLayer = () => {
		let updatedLayer: Layer

		if (type === "Dense") {
			updatedLayer = { type, in_channels, out_channels, activation }
		} else {
			updatedLayer = {
				type,
				in_channels,
				out_channels,
				kernel,
				stride,
				activation,
			}
		}

		// Update the correct layer in the GAN object
		const updatedGan = {
			...gan,
			generator: gan.generator.map((l, i) => (i === index ? updatedLayer : l)),
		}

		setGan(updatedGan)
	}

	const handleUpdate = () => {
		updateLayer()
	}

	return (
		<DialogContent className="sm:max-w-[525px]">
			<DialogHeader>
				<DialogTitle>Edit Layer</DialogTitle>
				<DialogDescription>
					Modify the existing layer properties here. Click "Update Layer" when
					you're done.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="layertype" className="text-right">
						Layer Type
					</Label>
					<Select value={type} onValueChange={setType}>
						<SelectTrigger className="col-span-3">
							<SelectValue placeholder="Select a layer type" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Layer Types</SelectLabel>
								<SelectItem value="Dense">Dense</SelectItem>
								<SelectItem value="Conv2d">Conv2d</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				{/* Kernel Input (Only for Conv) */}
				{type === "Conv2d" && (
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="Kernel" className="text-right">
							Kernel
						</Label>
						<Input
							id="Kernel"
							type="number"
							className="col-span-3"
							value={kernel ?? ""}
							onChange={(e) => setKernel(Number(e.target.value))}
						/>
					</div>
				)}

				{/* Stride Input (Only for Conv) */}
				{type === "Conv2d" && (
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="Stride" className="text-right">
							Stride
						</Label>
						<Input
							id="Stride"
							type="number"
							className="col-span-3"
							value={stride}
							onChange={(e) => setStride(Number(e.target.value))}
						/>
					</div>
				)}

				{/* In Channels Input */}
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="in_channels" className="text-right">
						In Channels
					</Label>
					<Input
						id="in_channels"
						type="number"
						className="col-span-3"
						value={in_channels}
						onChange={(e) => setInChannels(Number(e.target.value))}
					/>
				</div>

				{/* Out Channels Input */}
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="out_channels" className="text-right">
						Out Channels
					</Label>
					<Input
						id="out_channels"
						type="number"
						className="col-span-3"
						value={out_channels}
						onChange={(e) => setOutChannels(Number(e.target.value))}
					/>
				</div>

				{/* Activation Function Selection */}
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="activation" className="text-right">
						Activation
					</Label>
					<Select value={activation} onValueChange={setActivation}>
						<SelectTrigger className="col-span-3">
							<SelectValue placeholder="Select an activation function" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Activation Functions</SelectLabel>
								<SelectItem value="ReLU">ReLU</SelectItem>
								<SelectItem value="LeakyReLU">LeakyReLU</SelectItem>
								<SelectItem value="PReLU">PReLU</SelectItem>
								<SelectItem value="Tanh">Tanh</SelectItem>
								<SelectItem value="Sigmoid">Sigmoid</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button type="submit" onClick={handleUpdate}>
						Update Layer
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	)
}
