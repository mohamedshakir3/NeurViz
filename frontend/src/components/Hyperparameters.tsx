"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { useGan } from "@/components/GanProvider";
import { usePathname } from "next/navigation";
export default function Hyperparameters() {
	const { gan, setGan } = useGan()!;
	const pathname = usePathname();
	const isGAN = pathname == "/GAN";

	return (
		<>
			<SidebarMenuItem>
				<SidebarMenuButton>
					Learning Rate: {gan.hyperparameters.learningRate}
				</SidebarMenuButton>
				{isGAN && (
					<SidebarMenuButton>
						<Slider
							defaultValue={[gan.hyperparameters.learningRate * 10000]}
							max={10}
							min={1}
							step={1}
							className="h-4 pl-2 pr-2"
							onValueChange={(value) =>
								setGan({
									...gan,
									hyperparameters: {
										...gan.hyperparameters,
										learningRate: value[0] / 10000,
									},
								})
							}
						/>
					</SidebarMenuButton>
				)}
			</SidebarMenuItem>
			<SidebarMenuItem>
				<SidebarMenuButton>
					Batch Size: {gan.hyperparameters.batchSize}
				</SidebarMenuButton>
				{isGAN && (
					<SidebarMenuButton>
						<Slider
							defaultValue={[gan.hyperparameters.batchSize]}
							max={128}
							min={16}
							step={16}
							className="h-4 pl-2 pr-2"
							onValueChange={(value) =>
								setGan({
									...gan,
									hyperparameters: {
										...gan.hyperparameters,
										batchSize: value[0],
									},
								})
							}
						/>
					</SidebarMenuButton>
				)}
			</SidebarMenuItem>
			<SidebarMenuItem>
				<SidebarMenuButton>
					Latent Dimension: {gan.hyperparameters.noiseDim}
				</SidebarMenuButton>
				{isGAN && (
					<SidebarMenuButton>
						<Slider
							defaultValue={[gan.hyperparameters.noiseDim]}
							max={200}
							min={50}
							step={10}
							className="h-4 pl-2 pr-2"
							onValueChange={(value) =>
								setGan({
									...gan,
									hyperparameters: {
										...gan.hyperparameters,
										noiseDim: value[0],
									},
								})
							}
						/>
					</SidebarMenuButton>
				)}
			</SidebarMenuItem>
			<SidebarMenuItem>
				<SidebarMenuButton>
					Epochs: {gan.hyperparameters.epochs}
				</SidebarMenuButton>
				{isGAN && (
					<SidebarMenuButton>
						<Slider
							defaultValue={[gan.hyperparameters.epochs]}
							max={200}
							min={10}
							step={10}
							className="h-4 pl-2 pr-2"
							onValueChange={(value) =>
								setGan({
									...gan,
									hyperparameters: {
										...gan.hyperparameters,
										epochs: value[0],
									},
								})
							}
						/>
					</SidebarMenuButton>
				)}
			</SidebarMenuItem>
		</>
	);
}
