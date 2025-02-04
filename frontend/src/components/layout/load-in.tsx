import { useEffect, useState } from "react"
import "@/app/globals.css"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
export function FrontPage() {
	const [scrollAway, setScrollAway] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setScrollAway(true)
		}, 4000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div className={`front-page ${scrollAway ? "scroll-away" : ""}`}>
			<h1>Welcome to My App</h1>
			{/* Add your animated content here */}
			<TextHoverEffect text="NeurViz" />
		</div>
	)
}
