import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getJobById } from "@/lib/db-actions"
import { Model } from "../components/model"
import { Tables } from "@/types/database-types"
import Dashboard from "../components/dashboard-content"

export default async function DashboardPage({
	params,
}: {
	params: Promise<{ JobID: string }>
}) {
	const { JobID } = await params

	const job: Tables<"jobs"> = await getJobById(JobID)

	return (
		<div className="hidden flex-col md:flex">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					<div className="flex items-center space-x-2">
						<Button>Download</Button>
					</div>
				</div>
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="model">Model</TabsTrigger>
					</TabsList>
					<TabsContent value="model" className="space-y-4">
						<Model model={job.model_params} />
					</TabsContent>
					<TabsContent value="overview" className="space-y-4">
						<Dashboard job={job} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
