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
import type { Layer } from "@/types/NeuralNet"

export default function CreateLayerModal({ network }: { network: string }) {
	const [channels, setChannels] = useState<number>(1024)
	const [activation, setActivation] = useState<string>("ReLU")
	const [kernel, setKernel] = useState<number>(4)
	const [stride, setStride] = useState<number>(2)
	const [type, setType] = useState<string>("Dense")
	const { gan, setGan } = useGan()!
	const addLayers = () => {
		let newLayer: Layer
		if (type === "Dense") {
			newLayer = {
				type,
				channels,
				activation,
			}
		} else {
			newLayer = {
				type,
				channels,
				kernel,
				stride,
				activation,
			}
		}
		if (network == "generator") {
			setGan({ ...gan, generator: [...gan.generator, newLayer] })
		} else if (network == "discriminator") {
			setGan({ ...gan, generator: [...gan.generator, newLayer] })
		}
	}
	return (
		<>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Dense Layer</DialogTitle>
					<DialogDescription>
						Configure a new dense layer here. Click add layer when you&apos;re
						done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="layertype" className="text-right">
							Layer Type
						</Label>
						<Select onValueChange={setType}>
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
					<div
						className={`grid grid-cols-4 items-center gap-4 ${
							type === "Dense" ? "hidden" : ""
						}`}
					>
						<Label htmlFor="Kernal" className="text-right">
							Kernal
						</Label>
						<Input
							id="Kernal"
							placeholder="4"
							min="0"
							type="number"
							className="col-span-3"
							onChange={(e) => setKernel(Number(e.target.value))}
						/>
					</div>
					<div
						className={`grid grid-cols-4 items-center gap-4 ${
							type === "Dense" ? "hidden" : ""
						}`}
					>
						<Label htmlFor="Stride" className="text-right">
							Stride
						</Label>
						<Input
							id="Stride"
							placeholder="4"
							min="0"
							type="number"
							className="col-span-3"
							onChange={(e) => setStride(Number(e.target.value))}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="channels" className="text-right">
							Channels
						</Label>
						<Input
							id="channels"
							placeholder="1024"
							type="number"
							className="col-span-3"
							onChange={(e) => setChannels(Number(e.target.value))}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Activation
						</Label>
						<Select onValueChange={setActivation}>
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
						<Button type="submit" onClick={addLayers}>
							Add Layer
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</>
	)
}
