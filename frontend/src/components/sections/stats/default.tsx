import { Section } from "../../ui/section"
import { siteConfig } from "@/config/site-config"

export default function Stats() {
	return (
		<Section>
			<div className="container mx-auto max-w-[960px]">
				<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
					<div className="text-center">
						<div className="bg-gradient-to-r from-foreground to-muted-foreground/40 bg-clip-text text-4xl font-semibold text-transparent drop-shadow-[1px_1px_1px_hsl(var(--brand-foreground))] hover:to-muted-foreground hover:drop-shadow-[2px_1px_2px_hsl(var(--brand-foreground))] sm:text-5xl md:text-6xl">
							{siteConfig.stats.figma}
						</div>
						<div className="mt-2 text-sm text-muted-foreground">
							Figma users
						</div>
					</div>
					<div className="text-center">
						<div className="bg-gradient-to-r from-foreground to-muted-foreground/40 bg-clip-text text-4xl font-semibold text-transparent drop-shadow-[1px_1px_1px_hsl(var(--brand-foreground))] hover:to-muted-foreground hover:drop-shadow-[2px_1px_2px_hsl(var(--brand-foreground))] sm:text-5xl md:text-6xl">
							{siteConfig.stats.github}
						</div>
						<div className="mt-2 text-sm text-muted-foreground">
							Github clones
						</div>
					</div>
					<div className="text-center">
						<div className="bg-gradient-to-r from-foreground to-muted-foreground/40 bg-clip-text text-4xl font-semibold text-transparent drop-shadow-[1px_1px_1px_hsl(var(--brand-foreground))] hover:to-muted-foreground hover:drop-shadow-[2px_1px_2px_hsl(var(--brand-foreground))] sm:text-5xl md:text-6xl">
							{siteConfig.stats.cli}
						</div>
						<div className="mt-2 text-sm text-muted-foreground">
							CLI installations
						</div>
					</div>
					<div className="text-center">
						<div className="bg-gradient-to-r from-foreground to-muted-foreground/40 bg-clip-text text-4xl font-semibold text-transparent drop-shadow-[1px_1px_1px_hsl(var(--brand-foreground))] hover:to-muted-foreground hover:drop-shadow-[2px_1px_2px_hsl(var(--brand-foreground))] sm:text-5xl md:text-6xl">
							{siteConfig.stats.components}
						</div>
						<div className="mt-2 text-sm text-muted-foreground">
							Components
						</div>
					</div>
				</div>
			</div>
		</Section>
	)
}
