import { task, logger } from "@trigger.dev/sdk/v3"

export const trainTask = task({
	id: "train-gan",
	// Set an optional maxDuration to prevent tasks from running indefinitely
	maxDuration: 600, // Stop executing after 300 secs (5 mins) of compute
	run: async (payload: { jobId: any }) => {
		const { jobId } = payload
		const response = await fetch(`${process.env.TRAIN_API_ROUTE}/${jobId}`, {
			method: "POST",
			body: JSON.stringify({ jobId: jobId }),
			headers: { "Content-Type": "application/json" },
		})
		if (response.ok) {
			logger.log("Model submitted successfully", { jobId })
			return { success: true }
		} else {
			logger.error("Path revalidation failed", {
				jobId,
				statusCode: response.status,
				statusText: response.statusText,
			})
			return {
				success: false,
				error: `Revalidation failed with status ${response.status}: ${response.statusText}`,
			}
		}
	},
})
