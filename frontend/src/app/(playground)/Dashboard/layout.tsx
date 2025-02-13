import type { Metadata } from "next"
import KBar from "@/components/kbar"
export const metadata: Metadata = {
	title: "NeurViz",
	description: "A deep learning playground.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <KBar>{children}</KBar>
}
