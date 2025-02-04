import Link from "next/link"

import { TeamSwitcher } from "@/components/team-switcher"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
	return (
		<header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container-wrapper">
				<div className="flex h-14 sm:px-4 items-center">
					<TeamSwitcher />
					<MainNav />
					<MobileNav />
					<div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
						<nav className="flex items-center gap-0.5">
							<Button variant="ghost" size="icon" className="h-8 w-8 px-0">
								<Link
									href={"https://github.com/mohamedshakir3/NeurViz"}
									target="_blank"
									rel="noreferrer"
								>
									<Icons.gitHub className="h-4 w-4" />
									<span className="sr-only">GitHub</span>
								</Link>
							</Button>
							<ModeSwitcher />
						</nav>
					</div>
				</div>
			</div>
		</header>
	)
}
