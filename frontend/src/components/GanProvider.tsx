"use client"
import { useState, useEffect, createContext, useContext } from "react"
import type { Layer } from "@/types/NeuralNet"
interface GanState {
	hyperparameters: {
		learningRate: number
		batchSize: number
		noiseDim: number
		epochs: number
		momentum: number
	}
	generator: Layer[]
	discriminator: Layer[]
}

interface GanContextType {
	gan: GanState
	setGan: React.Dispatch<React.SetStateAction<GanState>>
}

const GanContext = createContext<GanContextType | undefined>(undefined)
// TODO: Use existing gan stored in cookies for inital state.
export function GanProvider({ children }: { children: React.ReactNode }) {
	const noise_dim = 100
	const image_dim = 784
	const [gan, setGan] = useState<GanState>({
		hyperparameters: {
			learningRate: 0.0005,
			batchSize: 32,
			noiseDim: 100,
			epochs: 50,
			momentum: 0.7,
		},
		generator: [
			{
				type: "Dense",
				in_channels: noise_dim,
				out_channels: 256,
				activation: "ReLU",
			},
			{
				type: "Dense",
				in_channels: 256,
				out_channels: image_dim,
				activation: "Tanh",
			},
		],
		discriminator: [
			{
				type: "Dense",
				in_channels: image_dim,
				out_channels: 256,
				activation: "ReLU",
			},
			{
				type: "Dense",
				in_channels: 256,
				out_channels: 128,
				activation: "ReLU",
			},
			{
				type: "Dense",
				in_channels: 128,
				out_channels: 1,
				activation: "Sigmoid",
			},
		],
	})
	useEffect(() => {
		setGan((prevGan) => ({
			...prevGan,
			generator: [
				{
					...prevGan.generator[0],
					in_channels: prevGan.hyperparameters.noiseDim, // Update input channels
				},
				...prevGan.generator.slice(1),
			],
		}))
	}, [gan.hyperparameters.noiseDim])

	return (
		<GanContext.Provider value={{ gan, setGan }}>
			{children}
		</GanContext.Provider>
	)
}

export const useGan = () => useContext(GanContext)
