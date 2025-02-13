import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import TeamSwitcher from "@/app/(playground)/components/team-switcher"
import SearchInput from "@/components/search-input"
import { UserNav } from "@/components/layout/user-nav"
import ThemeToggle from "@/components/layout/theme-toggle"
import { getCurrentUser } from "@/lib/auth-actions"
import { getCurrentUserProfile } from "@/lib/db-actions"

export default async function Header() {
	const profile = await getCurrentUserProfile()
	return (
		<header className="flex h-14 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<TeamSwitcher profile={profile} />
			</div>
			<div className="flex items-center gap-2 px-4">
				<div className="hidden md:flex">
					<SearchInput />
				</div>
				<UserNav profile={profile} />
				<ThemeToggle />
			</div>
		</header>
	)
}
// <div className="border-b">
// 	<div className="flex h-16 items-center px-4">
// 		<TeamSwitcher profile={profile} />
// 		<MainNav className="mx-6" />
// 		<div className="ml-auto flex items-center space-x-4">
// 			<div className="hidden md:flex">
// 				<SearchInput />
// 			</div>
// 			<UserNav profile={profile} />
// 			<ThemeToggle />
// 		</div>
// 	</div>
// </div>
