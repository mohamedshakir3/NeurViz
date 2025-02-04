"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
	const pathname = usePathname()

	return (
		<div className="mr-4 hidden md:flex">
			<Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
				<span className="hidden font-bold lg:inline-block">NeurViz</span>
			</Link>
			<nav className="flex items-center gap-4 text-sm xl:gap-6">
				<Link
					href="/docs"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname === "/docs" ? "text-foreground" : "text-foreground/80"
					)}
				>
					Docs
				</Link>
				<Button
					variant="ghost"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/docs/components") &&
							!pathname?.startsWith("/docs/component/chart")
							? "text-foreground"
							: "text-foreground/80"
					)}
				>
					Tutorial
				</Button>
			</nav>
		</div>
	)
}
