import Navigation from "../../ui/navigation"
import { Button } from "@/components/ui/button"
import {
	Navbar as NavbarComponent,
	NavbarLeft,
	NavbarRight,
} from "@/components/ui/navbar"

import { siteConfig } from "@/config/site-config"
import { Boxes } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
	return (
		<header className="sticky top-0 z-40 -mb-4 px-4 pb-4">
			<div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
			<div className="relative mx-auto max-w-container">
				<NavbarComponent>
					<NavbarLeft>
						<Link
							href={"/"}
							className="flex items-center gap-2 text-xl font-bold"
						>
							<Boxes />
							NeurViz
						</Link>
						<Navigation />
					</NavbarLeft>
					<NavbarRight>
						<Link href="/login" className="hidden text-sm md:block">
							Sign in
						</Link>
						<Button variant="default" asChild>
							<Link href={"/signup"}>Get Started</Link>
						</Button>
					</NavbarRight>
				</NavbarComponent>
			</div>
		</header>
	)
}
