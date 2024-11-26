import Dashboard from "@/app/TrainingResults/_components/Dashboard";
import { trainModel, getJobById, initializeJob } from "@/lib/lib";

type Params = Promise<{ jobID: string }>;

export default async function OverViewPage(props: { params: Params }) {
	const params = await props.params;
	const jobID = params.jobID;
	let job = await getJobById(jobID);
	if (!job) {
		job = await initializeJob(jobID);
		trainModel(jobID);
	}
	return <Dashboard jobID={jobID} job={job} />;
}
