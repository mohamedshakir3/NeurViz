import { Button } from "@/components/ui/button"
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { taskSchema } from "./schema"

export const metadata: Metadata = {
	title: "Tasks",
	description: "A task and issue tracker build using Tanstack Table.",
}

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
