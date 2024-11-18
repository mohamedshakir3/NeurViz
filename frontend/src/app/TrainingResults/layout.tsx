import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Next Shadcn Dashboard Starter",
	description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Persisting the sidebar state in the cookie.
	return <div>{children}</div>;
}
