import {
	CheckCircle,
	Circle,
	CircleOff,
	HelpCircle,
	Timer,
} from "lucide-react"

export const statuses = [
	{
		value: "pending",
		label: "Pending",
		icon: HelpCircle,
	},
	{
		value: "running",
		label: "Running",
		icon: Timer,
	},
	{
		value: "completed",
		label: "Completed",
		icon: CheckCircle,
	},
	{
		value: "failed",
		label: "Failed",
		icon: CircleOff,
	},
]
