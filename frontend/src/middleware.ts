import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const session = request.cookies.get("gan")?.value;

	if (request.nextUrl.pathname === "/TrainingResults" && !session) {
		return NextResponse.redirect(new URL("/GAN", request.url));
	}

	if (request.nextUrl.pathname === "/") {
		return NextResponse.redirect(new URL("/GAN", request.url));
	}
}
