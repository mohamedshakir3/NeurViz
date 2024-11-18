"use client";
import "@/app/globals.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	BatchNorm,
	Noise,
	ReLU,
	Conv,
	Dense,
	Tanh,
	Sigmoid,
	LeakyReLU,
} from "@/components/LayerSvg";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { Fragment } from "react";
import { useGan } from "@/components/GanProvider";
export default function GridBackground() {
	const isMobile = useIsMobile();
	const { gan, setGan } = useGan()!;
	const containerClass = isMobile
		? ""
		: "absolute shadow-lg grid-background w-[95%] h-[95%] rounded-[1rem] p-6";
	return (
		<div className="relative w-full grid place-items-center">
			<div className={containerClass}>
				<div className="grid place-items-center content-center h-full gap-24">
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

						{/* <TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Noise />
								</TooltipTrigger>
								<TooltipContent>
									<p>Dimension: 100</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider> */}
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
			</div>
		</div>
	);
}
