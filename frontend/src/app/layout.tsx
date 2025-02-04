import { cn } from "@/lib/utils"
import ThemeProvider from "@/components/theme-provider"
interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<body className={cn("min-h-svh bg-background font-sans antialiased")}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
						enableColorScheme
					>
						<div vaul-drawer-wrapper="">
							<div className="relative flex min-h-svh flex-col bg-background">
								{children}
							</div>
						</div>
					</ThemeProvider>
				</body>
			</html>
		</>
	)
}
