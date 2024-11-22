import type { Metadata } from "next";
import "@/app/globals.css";
import {
	SidebarProvider,
	SidebarTrigger,
	SidebarInset,
} from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/app-sidebar";
import { GanProvider } from "@/components/GanProvider";
export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<GanProvider>
			<SidebarProvider defaultOpen={true}>
				<AppSidebar />
				<SidebarInset>
					<Header />
				</SidebarInset>
				{children}
			</SidebarProvider>
		</GanProvider>
	);
}
