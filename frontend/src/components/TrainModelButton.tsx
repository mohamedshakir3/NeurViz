"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGan } from "@/components/GanProvider";
import { usePathname } from "next/navigation";
import { storeGan } from "@/lib/lib";
import { useRouter } from "next/navigation";
export default function TrainModel() {
	const { gan, setGan } = useGan()!;
	const pathName = usePathname();
	const isGAN = pathName == "/GAN";
	const router = useRouter();
	const storeCookies = async () => {
		await storeGan(gan);
		router.push("/TrainingResults");
	};
	const trainModel = async () => {
		const response = await fetch("http://127.0.0.1:5100", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(gan),
		});
		if (!response.ok) {
			console.error("Failed to train model:", response.statusText);
		} else {
			const data = await response.json();
			console.log("Model trained successfully:", data);
		}
	};
	return isGAN ? (
		<Button onClick={() => storeCookies()} className="w-32">
			Train Model
			<ArrowRight className="ml-2 h-4 w-4" />
		</Button>
	) : (
		""
	);
}
