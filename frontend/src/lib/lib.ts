"use server";
import { cookies } from "next/headers";

export async function storeGan(gan: any) {
	const cookieStore = await cookies();
	cookieStore.set("gan", JSON.stringify(gan));
}

export async function getSession() {
	const cookieStore = await cookies();

	const session = cookieStore.get("gan")?.value;
	if (!session) return null;
	return session;
}
