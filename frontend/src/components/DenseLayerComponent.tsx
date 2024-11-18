import type { DenseLayer } from "@/types/NeuralNet";
export default function DenseLayerComponent({ layer }: { layer: DenseLayer }) {
	return (
		<div className="p-4 bg-slate-100 rounded-lg flex items-center justify between">
			<div className="flex items-center gap-3">
				<div>
					<div className="font-medium">Dense</div>
					<div className="text-sm text-slate-500">
						Channels: {layer?.channels}, Activation: {layer?.activation}
					</div>
				</div>
			</div>
		</div>
	);
}
