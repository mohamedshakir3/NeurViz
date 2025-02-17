import { useGan } from "@/components/GanProvider"
import {
	Noise,
	ReLU,
	Conv,
	Dense,
	Tanh,
	Sigmoid,
	LeakyReLU,
	PReLU,
} from "@/components/LayerSvg"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Fragment } from "react"
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
} from "@/components/ui/hover-card"
import { type Layer, type ConvLayer } from "@/types/NeuralNet"
export default function NetworkArch() {
	const { gan } = useGan()!
	return (
		<div className="grid place-items-center content-center w-full h-full gap-24">
			<div className="flex items-center">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Noise />
						</TooltipTrigger>
						<TooltipContent>
							<p>Dimension: {gan.hyperparameters.noiseDim}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				{gan.generator.map((layer: Layer, index: number) => (
					<Fragment key={index}>
						<HoverCard>
							<HoverCardTrigger>
								{layer.type == "Dense" ? (
									<Dense key={index + "dense"} />
								) : layer.type == "Conv2d" ? (
									<Conv key={index + "conv2d"} />
								) : (
									""
								)}
							</HoverCardTrigger>
							<HoverCardContent
								align="start"
								className="w-full text-sm"
								side="top"
								key={index}
							>
								<div className="flex gap-2 flex-col">
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
						{layer.activation == "ReLU" ? (
							<ReLU key={index + "relu"} />
						) : layer.activation == "Tanh" ? (
							<Tanh key={index + "tanh"} />
						) : layer.activation == "Sigmoid" ? (
							<Sigmoid key={index + "sigmoid"} />
						) : layer.activation == "PReLU" ? (
							<PReLU key={index + "prelu"} />
						) : layer.activation == "LeakyReLU" ? (
							<LeakyReLU key={index + "leakyrelu"} />
						) : (
							""
						)}
					</Fragment>
				))}
			</div>
			<div className="flex items-center">
				{gan.discriminator.map((layer, index) => (
					<Fragment key={index}>
						<HoverCard>
							<HoverCardTrigger>
								{layer.type == "Dense" ? (
									<Dense key={index + "dense"} />
								) : layer.type == "Conv2d" ? (
									<Conv key={index + "conv2d"} />
								) : (
									""
								)}
							</HoverCardTrigger>
							<HoverCardContent
								align="start"
								className="w-full text-sm"
								side="top"
								key={index}
							>
								<div className="flex gap-2 flex-col">
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
						{layer.activation == "ReLU" ? (
							<ReLU key={index + "relu"} />
						) : layer.activation == "Tanh" ? (
							<Tanh key={index + "tanh"} />
						) : layer.activation == "Sigmoid" ? (
							<Sigmoid key={index + "sigmoid"} />
						) : layer.activation == "PReLU" ? (
							<PReLU key={index + "prelu"} />
						) : layer.activation == "LeakyReLU" ? (
							<LeakyReLU key={index + "leakyrelu"} />
						) : (
							""
						)}
					</Fragment>
				))}
			</div>
		</div>
	)
}
