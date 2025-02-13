import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { signup } from "@/lib/auth-actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Form from "next/form"
import { LoginWithGithub, LoginWithGoogle } from "./login-with-providers"

export function SignupForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create an Account</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6">
						<form action="">
							<div className="grid gap-6">
								<div className="grid gap-2 grid-cols-2">
									<span>
										<Label htmlFor="first-name">First Name</Label>
										<Input
											id="first-name"
											type="first-name"
											name="first-name"
											placeholder="John"
											required
										/>
									</span>
									<span>
										<Label htmlFor="last-name">Last Name</Label>
										<Input
											id="last-name"
											type="last-name"
											name="last-name"
											placeholder="Doe"
											required
										/>
									</span>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										name="email"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
									</div>
									<Input
										id="password"
										type="password"
										name="password"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="confirm-password">Confirm Password</Label>
									</div>
									<Input id="confirm-password" type="password" required />
								</div>
								<Button type="submit" formAction={signup} className="w-full">
									Signup
								</Button>
								<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
									<span className="relative z-10 bg-background px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<div className="grid gap-2 grid-cols-2">
									<LoginWithGithub />
									<LoginWithGoogle />
								</div>
							</div>
						</form>
						<div className="text-center text-sm">
							Already have an account?{" "}
							<Link href="/login" className="underline underline-offset-4">
								Login
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	)
}
