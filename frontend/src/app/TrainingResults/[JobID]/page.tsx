import Dashboard from "@/app/TrainingResults/_components/Dashboard";
import { trainModel, getJobById, initializeJob } from "@/lib/lib";

export default async function OverViewPage({
	params,
}: {
	params: Promise<{ jobID: string }>;
}) {
	const jobID = (await params).jobID;
	let job = await getJobById(jobID);
	if (!job) {
		job = await initializeJob(jobID);
		trainModel(jobID);
	}
	return <Dashboard jobID={jobID} job={job} />;
}
