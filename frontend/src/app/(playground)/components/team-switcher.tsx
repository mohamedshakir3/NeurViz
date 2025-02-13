"use client"
import { type Tables } from "@/types/database-types"
import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

type TeamGroup = {
	label: string
	teams: { label: string; value: string }[]
}

type Team = TeamGroup["teams"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>

interface TeamSwitcherProps extends PopoverTriggerProps {
	profile: Tables<"Profiles">
}

export default function TeamSwitcher({
	className,
	profile,
}: TeamSwitcherProps) {
	const [open, setOpen] = React.useState(false)
	const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

	const groups = [
		{
			label: "Personal Account",
			teams: [
				{
					label: profile.full_name,
					value: "personal",
				},
			],
		},
		{
			label: "Teams",
			teams: (profile.teams ?? []).map((team) => ({
				label: team,
				value: team,
			})),
		},
	]
	const [selectedTeam, setSelectedTeam] = React.useState<Team>(
		groups[0].teams[0]
	)

	return (
		<Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						aria-label="Select a team"
						className={cn("w-[200px] justify-between", className)}
					>
						<Avatar className="mr-2 h-7 w-7">
							<AvatarImage
								src={profile?.avatar_url ?? ""}
								alt={""}
								className="grayscale"
							/>
							<AvatarFallback>
								{profile?.full_name
									.split(" ")
									.map((name: string) => name.charAt(0))
									.join("")}
							</AvatarFallback>
						</Avatar>
						{selectedTeam.label}
						<ChevronsUpDown className="ml-auto opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Search team..." />
						<CommandList>
							<CommandEmpty>No team found.</CommandEmpty>
							{groups.map((group) => (
								<CommandGroup key={group.label} heading={group.label}>
									{group.teams.map((team) => (
										<CommandItem
											key={team.value}
											onSelect={() => {
												setSelectedTeam(team)
												setOpen(false)
											}}
											className="text-sm"
										>
											<Avatar className="mr-2 h-6 w-6">
												<AvatarImage
													src={profile?.avatar_url ?? ""}
													alt={""}
													className="grayscale"
												/>
												<AvatarFallback>
													{profile?.full_name
														.split(" ")
														.map((name: string) => name.charAt(0))
														.join("")}
												</AvatarFallback>
											</Avatar>
											{team.label}
											<Check
												className={cn(
													"ml-auto",
													selectedTeam.value === team.value
														? "opacity-100"
														: "opacity-0"
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							))}
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={() => {
											setOpen(false)
											setShowNewTeamDialog(true)
										}}
									>
										<PlusCircle className="h-5 w-5" />
										Create Team
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create team</DialogTitle>
					<DialogDescription>
						Add a new team to manage products and customers.
					</DialogDescription>
				</DialogHeader>
				<div>
					<div className="space-y-4 py-2 pb-4">
						<div className="space-y-2">
							<Label htmlFor="name">Team name</Label>
							<Input id="name" placeholder="Acme Inc." />
						</div>
						<div className="space-y-2">
							<Label htmlFor="plan">Subscription plan</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select a plan" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="free">
										<span className="font-medium">Free</span> -{" "}
										<span className="text-muted-foreground">
											Trial for two weeks
										</span>
									</SelectItem>
									<SelectItem value="pro">
										<span className="font-medium">Pro</span> -{" "}
										<span className="text-muted-foreground">
											$9/month per user
										</span>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setShowNewTeamDialog(false)}
					>
						Cancel
					</Button>
					<Button type="submit">Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
