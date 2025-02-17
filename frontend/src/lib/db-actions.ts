"use server"
import { createClient } from "@/utils/supabase/server"
import { type Tables, Database } from "@/types/database-types"
import { getCurrentUser } from "@/lib/auth-actions"

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
