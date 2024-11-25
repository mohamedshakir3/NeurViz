"use client";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import React from "react";
import { db } from "@/lib/firebase";
import { type Epoch } from "@/types/NeuralNet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Epochs({ jobID }: { jobID: string }) {
	const jobRef = collection(db, "Jobs"); // Collection

	const [epochs, setEpochs] = useState<any[]>([]);
	useEffect(() => {
		const unsubscribe = onSnapshot(doc(jobRef, jobID), (snapshot) => {
			const updatedEpochs = (snapshot.data() as { epochs?: any[] }) || [];
			setEpochs(updatedEpochs?.epochs || []);
		});
		return () => unsubscribe();
	}, []);
	const isMobile = useIsMobile();
	// TODO: This looks ass on mobile
	return (
		<div className="space-y-8">
			<ScrollArea className="h-72 w-full rounded-md border">
				<div className="p-4">
					{epochs.map((epoch, index) => (
						<React.Fragment key={index}>
							<div className="text-sm flex justify-between">
								<span>{index}</span>
								<span>
									{isMobile
										? `Gen Loss ${epoch.gen_loss.toFixed(2)}`
										: `Generator Loss: ${epoch.gen_loss.toFixed(3)}`}
								</span>
								<span>
									{isMobile
										? `Disc Loss ${epoch.disc_loss.toFixed(2)}`
										: `Discriminator Loss: ${epoch.disc_loss.toFixed(3)}`}
								</span>
							</div>
							<Separator className="my-2" />
						</React.Fragment>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
