"use server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import {
	collection,
	doc,
	getDoc,
	setDoc,
	onSnapshot,
} from "firebase/firestore";
export async function storeGan(gan: any) {
	const cookieStore = await cookies();
	cookieStore.set("gan", JSON.stringify(gan));
}

export async function getSession() {
	const cookieStore = await cookies();

	const session = cookieStore.get("gan")?.value;
	if (!session) return null;
	return JSON.parse(session);
}

export async function checkJob(JobID: string) {
	const docRef = doc(db, "Jobs", JobID);
	const docSnap = await getDoc(docRef);

	return docSnap.exists() ? true : false;
}

export async function initializeJob(JobID: string) {
	const gan = await getSession();
	if (!gan) {
		return null;
	}
	await setDoc(doc(db, "Jobs", JobID), {
		...gan,
		epochs: [],
		isTraining: true,
	});

	return { ...gan, epochs: [], isTraining: true };
}

export async function trainModel(JobID: string) {
	const gan = await getSession();
	if (!gan) {
		return null;
	}
	try {
		const response = await fetch("http://localhost:5100/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ gan, JobID }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log("Model trained successfully:", data);
	} catch (error) {
		console.error("Failed to train model:", error);
	}
}

export async function getJobById(jobID: string) {
	const jobRef = doc(db, "Jobs", jobID);
	const jobSnapshot = await getDoc(jobRef);
	if (!jobSnapshot.exists()) {
		return null;
	}
	return jobSnapshot.data();
}

// export async function sub(collection: string, docId: string) {
// 	const unsub = onSnapshot(doc(db, collection, docId), (doc) => {
// 		console.log("Current data: ", doc.data());
// 	});
// }
