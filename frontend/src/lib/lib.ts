"use server"
import { cookies } from "next/headers"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { getCurrentUser } from "./auth-actions"
import { createClient } from "@/utils/supabase/server"
import type { trainTask } from "@/trigger/train"
import { tasks } from "@trigger.dev/sdk/v3"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function storeGan(gan: any) {
	const cookieStore = await cookies()
	cookieStore.set("gan", JSON.stringify(gan))
}

export async function getSession() {
	const cookieStore = await cookies()

	const session = cookieStore.get("gan")?.value
	if (!session) return null
	return JSON.parse(session)
}

export async function checkJob(JobID: string) {
	const docRef = doc(db, "Jobs", JobID)
	const docSnap = await getDoc(docRef)

	return docSnap.exists() ? true : false
}

export async function initializeJob(JobID: string) {
	const gan = await getSession()
	if (!gan) {
		return null
	}
	await setDoc(doc(db, "Jobs", JobID), {
		...gan,
		epochs: [],
		isTraining: false,
	})

	return { ...gan, epochs: [], isTraining: false }
}

export async function trainModel(gan: any) {
	if (!gan) {
		throw new Error("No GAN model found!")
	}

	const supabase = await createClient()
	const user = await getCurrentUser()

	// Insert job details into Supabase
	const { data, error } = await supabase
		.from("jobs")
		.insert([{ status: "pending", owner_id: user.user.id, model_params: gan }])
		.select()

	if (error || !data || data.length === 0) {
		console.log(error)
		throw new Error("Error creating job in Supabase")
	}

	const jobId = data[0].id

	return { message: `Training started! Job ID: ${jobId}` }
}

export async function train(gan: any) {
	const supabase = await createClient()
	const user = await getCurrentUser()

	// Insert job details into Supabase
	const { data, error } = await supabase
		.from("jobs")
		.insert([{ status: "pending", owner_id: user.user.id, model_params: gan }])
		.select()

	if (error || !data || data.length === 0) {
		console.log(error)
		throw new Error("Error creating job in Supabase")
	}

	const jobId = data[0].id
	// should return jobId here to front end
	if (!jobId) {
		console.error("Invalid jobId:", jobId)
		return
	}
	try {
		const handle = await tasks.trigger<typeof trainTask>("train-gan", {
			jobId,
		})
		console.log(handle)
	} catch (error) {
		console.error(error)
		return {
			error: "something went wrong",
		}
	} finally {
		redirect(`/Dashboard/${jobId}`)
	}
}

export async function getJobById(jobID: string) {
	const jobRef = doc(db, "Jobs", jobID)
	const jobSnapshot = await getDoc(jobRef)
	if (!jobSnapshot.exists()) {
		return null
	}
	return jobSnapshot.data()
}
