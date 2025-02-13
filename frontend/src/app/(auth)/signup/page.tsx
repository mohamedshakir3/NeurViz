import { SignupForm } from "@/app/(auth)/components/signup-form"
import { BGBoxes } from "@/components/ui/background-boxes"
import { Boxes } from "lucide-react"
import Link from "next/link"
export default function LoginPage() {
	return (
		<div className="h-screen relative w-full overflow-hidden bg-muted dark:bg-slate-900 flex flex-col items-center justify-center">
			<div className="absolute inset-0 w-full h-full bg-muted dark:bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

			<BGBoxes />
			<div className="flex w-full relative z-20 max-w-sm flex-col gap-6">
				<Link
					href="/"
					className="flex items-center gap-2 self-center font-medium"
				>
					<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<Boxes className="size-4" />
					</div>
					NeurViz
				</Link>
				<SignupForm />
			</div>
		</div>
	)
}
