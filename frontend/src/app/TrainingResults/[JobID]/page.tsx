import Dashboard from "@/app/TrainingResults/_components/Dashboard";
import { db } from "@/lib/firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { checkJob, trainModel, getJobById, initializeJob } from "@/lib/lib";

export default async function OverViewPage({
	params,
}: {
	params: { JobID: string };
}) {
	const { JobID } = await params;
	let job = await getJobById(JobID);
	if (!job) {
		job = await initializeJob(JobID);
		trainModel(JobID);
	}
	return <Dashboard jobID={JobID} job={job} />;
}
