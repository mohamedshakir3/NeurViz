import TeamSwitcher from "./team-switcher"
import { MainNav } from "./main-nav"
import SearchInput from "@/components/search-input"
import { UserNav } from "../components/user-nav"
import { getCurrentUserProfile } from "@/lib/db-actions"
import ThemeToggle from "@/components/layout/theme-toggle"
export async function Header() {
	const profile = await getCurrentUserProfile()

	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4">
				<TeamSwitcher profile={profile} />
				<MainNav className="hidden sm:flex mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					<div className="hidden md:flex">
						<SearchInput />
					</div>
					<UserNav profile={profile} />
					<ThemeToggle />
				</div>
			</div>
		</div>
	)
}
