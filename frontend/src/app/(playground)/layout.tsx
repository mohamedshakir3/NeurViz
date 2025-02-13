import type { Metadata } from "next"
import KBar from "@/components/kbar"
import { Header } from "./components/header"
import { GanProvider } from "@/components/GanProvider"
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
			<Header />
			<GanProvider>{children}</GanProvider>
		</KBar>
	)
}
