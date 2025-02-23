"use client"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import NetworkArch from "../../Playground/GAN/components/network-arch"

export function Model({ model }: any) {
	return (
		<div className="sm:px-2 min-h-[70vh] w-full dark:bg-background bg-white dark:bg-dot-white/[0.75] bg-dot-black/[1.0] relative flex items-center justify-center">
			<TransformWrapper>
				<TransformComponent
					wrapperStyle={{
						width: "100%",
						height: "70vh",
						boxSizing: "border-box",
					}}
					contentStyle={{ width: "100%", height: "100%" }}
				>
					<NetworkArch model={model} />
				</TransformComponent>
			</TransformWrapper>
		</div>
	)
}
