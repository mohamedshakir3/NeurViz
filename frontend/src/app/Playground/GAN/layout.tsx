import type { Metadata } from "next"
import "@/app/globals.css"
import KBar from "@/components/kbar"
import { GanProvider } from "@/components/GanProvider"
import Header from "@/components/layout/header"
export const metadata: Metadata = {
	title: "NeurViz",
	description: "A deep learning playground.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<KBar>
			<div data-wrapper="" className="border-grid flex flex-1 flex-col">
				<Header />
				<GanProvider>{children}</GanProvider>
			</div>
		</KBar>
	)
}
