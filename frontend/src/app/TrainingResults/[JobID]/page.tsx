import Dashboard from "@/app/TrainingResults/_components/Dashboard";
import { trainModel, getJobById, initializeJob } from "@/lib/lib";

type Params = Promise<{ JobID: string }>;

export default async function OverViewPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const jobID = (await params).JobID;
	console.log(params);
	let job = await getJobById(jobID);
	if (!job) {
		job = await initializeJob(jobID);
		trainModel(jobID);
	}
	return <Dashboard jobID={jobID} job={job} />;
}
