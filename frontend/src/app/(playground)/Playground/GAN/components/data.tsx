import {
	CheckCircle,
	Circle,
	CircleOff,
	HelpCircle,
	Timer,
} from "lucide-react"

export const statuses = [
	{
		value: "backlog",
		label: "Backlog",
		icon: HelpCircle,
	},
	{
		value: "in progress",
		label: "In Progress",
		icon: Timer,
	},
	{
		value: "done",
		label: "Done",
		icon: CheckCircle,
	},
	{
		value: "canceled",
		label: "Canceled",
		icon: CircleOff,
	},
]
