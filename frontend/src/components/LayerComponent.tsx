import type { Layer, ConvLayer } from "@/types/NeuralNet";
export default function DenseLayerComponent({ layer }: { layer: Layer }) {
	return (
		<div className="p-4 bg-slate-100 rounded-lg flex items-center justify between">
			<div className="flex items-center gap-3">
				<div>
					<div className="font-medium">{layer.type}</div>
					<div className="text-sm text-slate-500">
						{layer.type === "Conv2d" ? (
							<span className="block">
								Kernel: {(layer as ConvLayer).kernel}, Stride:{" "}
								{(layer as ConvLayer).stride},
							</span>
						) : (
							""
						)}
						Channels: {layer.channels}, Activation: {layer.activation}
					</div>
				</div>
			</div>
		</div>
	);
}
