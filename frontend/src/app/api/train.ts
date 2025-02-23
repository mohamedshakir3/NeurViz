import { createClient } from "@/utils/supabase/server"
import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
	message: string
	error?: any
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Only POST allowed" })
	}

	const supabase = await createClient()
	const { modelParams } = req.body

	const { data, error } = await supabase
		.from("jobs")
		.insert([{ status: "pending", ...modelParams }])
		.select()

	if (error) {
		return res.status(500).json({ message: "Error creating job", error })
	}

	const jobId = data[0].id

	const gcpResponse = await fetch(
		`https://us-central1-run.googleapis.com/apis/run.googleapis.com/v1/namespaces/1031720194551/jobs/gan-worker:run`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.GCP_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				overrides: {
					containerOverrides: [
						{ name: "worker", env: [{ name: "JOB_ID", value: jobId }] },
					],
				},
			}),
		}
	)

	if (!gcpResponse.ok) {
		return res.status(500).json({ message: "Failed to start job" })
	}

	res.status(200).json({ message: `Job started successfully ${jobId}` })
}
