import React from "react"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import "@/app/globals.css"
import Hero from "@/components/sections/hero/default"
import Navbar from "../components/sections/navbar/default"
import Pricing from "@/components/sections/pricing/default"
import { FeatureSection } from "@/components/sections/features/default"
export default function Home() {
	return (
		<>
			<main className="min-h-screen w-full overflow-hidden bg-background text-foreground">
				{/* Radial gradient for the container to give a faded look */}
				<div className="absolute z-50 h-full dark:bg-background bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] animate-moving-up ">
					<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
					<TextHoverEffect text="NeurViz" />
				</div>
				<Navbar />
				<Hero />
				<FeatureSection />
				<Pricing />
			</main>
		</>
	)
}
