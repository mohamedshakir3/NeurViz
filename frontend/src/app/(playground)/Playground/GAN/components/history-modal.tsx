import { Button } from "@/components/ui/button"
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function HistoryModal({ tasks }: { tasks: any }) {
	return (
		<DialogContent className="sm:max-w-[50vw]">
			<DialogHeader>
				<DialogTitle>History</DialogTitle>
				<DialogDescription>
					Here&apos;s are your previously submitted models.
				</DialogDescription>
			</DialogHeader>
			<div className="hidden h-full flex-1 flex-col md:flex">
				<DataTable data={tasks} columns={columns} />
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button>Close</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	)
}
