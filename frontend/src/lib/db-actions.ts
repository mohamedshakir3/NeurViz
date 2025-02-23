"use server"
import { createClient } from "@/utils/supabase/server"
import { type Tables, Database } from "@/types/database-types"
import { getCurrentUser } from "@/lib/auth-actions"

export type JobSummary = {
	id: string
	status: string
	created_at: string
}

export async function getProfileByID(id: string): Promise<Tables<"Profiles">> {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from("Profiles")
		.select("*")
		.eq("id", id)
		.single()
	if (error) throw error
	const user: Tables<"Profiles"> = data!
	return user
}

export async function getCurrentUserProfile(): Promise<Tables<"Profiles">> {
	const user = await getCurrentUser()
	const profile = await getProfileByID(user.user.id)
	return profile
}

export async function getModelsByUserID(
	id: string
): Promise<Tables<"models">[]> {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from("models")
		.select("*")
		.eq("owner", id)
	if (error) throw error
	const model: Tables<"models">[] = data!
	return model
}
export async function getModelByID(id: string): Promise<Tables<"models">> {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from("models")
		.select("*")
		.eq("id", id)
		.single()
	if (error) throw error
	const model: Tables<"models"> = data!
	return model
}

export async function getJobsByOwnerId(id: string): Promise<JobSummary[]> {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from("jobs")
		.select("id, status, created_at")
		.eq("owner_id", id)
	if (error) throw error
	const jobs: JobSummary[] = data!
	return jobs
}

export async function getJobById(id: string): Promise<Tables<"jobs">> {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from("jobs")
		.select("*")
		.eq("id", id)
		.single()
	if (error) throw error
	const jobs: Tables<"jobs"> = data!
	return jobs
}
