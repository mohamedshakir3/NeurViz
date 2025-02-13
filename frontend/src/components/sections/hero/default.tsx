"use client"

import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { ArrowRightIcon } from "lucide-react"
import { Section } from "../../ui/section"
import { Mockup, MockupFrame } from "../../ui/mockup"
import Link from "next/link"
import Glow from "../../ui/glow"
import Image from "next/image"
import { useTheme } from "next-themes"
import Github from "../../logos/github"
import "@/app/globals.css"

export default function Hero() {
	const { resolvedTheme } = useTheme()
	let src

	switch (resolvedTheme) {
		case "dark":
			src = "/app-dark.png"
			break
		case "system":
			src = "/app-light.png"
			break
		default:
			src = "/app-light.png"
			break
	}

	return (
		<Section className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
			<div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
				<div className="flex flex-col items-center gap-6 text-center sm:gap-12">
					<h1 className="relative z-10 inline-block animate-appear opacity-0 delay-3500 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
						Design and build your models with ease
					</h1>
					<p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground opacity-0 delay-3500 sm:text-xl">
						An interactive playground for designing, training, and sharing your
						deep learning models.
					</p>
					<div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-3500">
						<div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-3500">
							<Button variant="default" size="lg" asChild>
								<Link href="/signup">Get Started</Link>
							</Button>
							<Button variant="glow" size="lg" asChild>
								<Link href="https://github.com/mohamedshakir3/NeurViz">
									<Github className="mr-2 h-4 w-4" /> Github
								</Link>
							</Button>
						</div>
					</div>
					<div className="relative pt-12">
						<MockupFrame
							className="animate-appear opacity-0 delay-3500"
							size="small"
						>
							<Mockup type="responsive">
								<Image
									src={src}
									alt="Launch UI app screenshot"
									width={1248}
									height={765}
								/>
							</Mockup>
						</MockupFrame>
						<Glow
							variant="top"
							className="animate-appear-zoom opacity-0 delay-4500"
						/>
					</div>
				</div>
			</div>
		</Section>
	)
}
