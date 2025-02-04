"use client"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGan } from "@/components/GanProvider"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { storeGan } from "@/lib/lib"
import CryptoJS from "crypto-js"

export default function TrainModel() {
	const { gan } = useGan()!
	const pathName = usePathname()
	const isGAN = pathName === "/GAN"
	const router = useRouter()

	const hashGan = async () => {
		try {
			const sortedJson = JSON.stringify(gan)
			return CryptoJS.MD5(sortedJson).toString()
		} catch (error) {
			console.error("Error generating hash:", error)
			return ""
		}
	}

	const trainModel = async () => {
		const jobID = await hashGan()
		await storeGan(gan)
		router.push(`/TrainingResults/${jobID}`)
		// try {
		// 	const response = await fetch("http://127.0.0.1:5100", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({ gan, jobID }),
		// 	});

		// 	if (!response.ok) {
		// 		throw new Error(`HTTP error! status: ${response.status}`);
		// 	}

		// 	const data = await response.json();
		// 	console.log("Model trained successfully:", data);
		// } catch (error) {
		// 	console.error("Failed to train model:", error);
		// }
	}

	if (!isGAN) return null

	return (
		<Button onClick={trainModel} className="w-32">
			Train Model
			<ArrowRight className="ml-2 h-4 w-4" />
		</Button>
	)
}
