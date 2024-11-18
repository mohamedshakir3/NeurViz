"use client";
import { useState, createContext, useContext } from "react";
import type { Layer } from "@/types/NeuralNet";
import { getSession } from "@/lib/lib";
interface GanState {
	hyperparameters: {
		learningRate: number;
		batchSize: number;
		noiseDim: number;
		epochs: number;
	};
	generator: Layer[];
	discriminator: Layer[];
}

interface GanContextType {
	gan: GanState;
	setGan: React.Dispatch<React.SetStateAction<GanState>>;
}

const GanContext = createContext<GanContextType | undefined>(undefined);

export function GanProvider({ children }: { children: React.ReactNode }) {
	const [gan, setGan] = useState<GanState>({
		hyperparameters: {
			learningRate: 0.0005,
			batchSize: 32,
			noiseDim: 100,
			epochs: 50,
		},
		generator: [
			{ type: "Dense", channels: 256, activation: "ReLU" },
			{ type: "Dense", channels: 784, activation: "Tanh" },
		],
		discriminator: [
			{ type: "Dense", channels: 256, activation: "ReLU" },
			{ type: "Dense", channels: 128, activation: "ReLU" },
			{ type: "Dense", channels: 1, activation: "Sigmoid" },
		],
	});

	return (
		<GanContext.Provider value={{ gan, setGan }}>
			{children}
		</GanContext.Provider>
	);
}

export const useGan = () => useContext(GanContext);
