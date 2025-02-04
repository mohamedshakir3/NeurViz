"use client"
import { useState, Fragment } from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Command, GalleryVerticalEnd, AudioWaveform } from "lucide-react"

export const teams = [
	{
		name: "Personal",
	},
	{
		name: "Lab 1",
	},
	{
		name: "Lab 2",
	},
	{
		name: "Lab 3",
	},
]

export function TeamSwitcher() {
	const [activeTeam, setActiveTeam] = useState(teams[0])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="lg"
					className={cn(
						"data-[state=open]:bg-sidebar-accent",
						"data-[state=open]:text-sidebar-accent-foreground"
					)}
				>
					<div
						className={cn("grid flex-1 text-left", "text-sm leading-tight")}
					>
						<span className="truncate font-semibold">{activeTeam.name}</span>
					</div>
					<ChevronsUpDown className="ml-auto" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={cn(
					"w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				)}
				align="start"
				side={"bottom"}
				sideOffset={4}
			>
				<DropdownMenuLabel className="text-xs text-muted-foreground">
					Teams
				</DropdownMenuLabel>
				{teams.map((team) => (
					<Fragment key={team.name}>
						<DropdownMenuItem
							key={team.name}
							onClick={() => setActiveTeam(team)}
							className="gap-2 p-2"
						>
							{team.name}
						</DropdownMenuItem>
						{team.name == "Personal" && <DropdownMenuSeparator />}
					</Fragment>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem className="gap-2 p-2">
					<div className="flex size-6 items-center justify-center rounded-md border bg-background">
						<Plus className="size-4" />
					</div>
					<div className="font-medium text-muted-foreground">Create team</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
