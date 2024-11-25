import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "NeurViz",
	description: "Training Results Page",
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
