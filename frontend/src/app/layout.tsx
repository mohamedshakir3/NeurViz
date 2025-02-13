import { cn } from "@/lib/utils"
import "@/app/globals.css"
import ThemeProvider from "@/components/theme-provider"
interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head>
					<meta name="apple-mobile-web-app-title" content="neurviz" />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				</head>
				<body className={cn("min-h-svh bg-background font-sans antialiased")}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
						enableColorScheme
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</>
	)
}
