import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { TeamSwitcher } from "@/components/team-switcher"
import SearchInput from "@/components/search-input"
import { UserNav } from "@/components/layout/user-nav"
import ThemeToggle from "@/components/layout/theme-toggle"

export default function Header() {
	return (
		<header className="flex h-14 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<TeamSwitcher />
			</div>
			<div className="flex items-center gap-2 px-4">
				<div className="hidden md:flex">
					<SearchInput />
				</div>
				<UserNav />
				<ThemeToggle />
			</div>
		</header>
	)
}
