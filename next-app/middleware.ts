export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { nextUrl } = req;

  const isInternal = req.headers
    .get("referer")
    ?.startsWith(process.env.NEXT_PUBLIC_BASE_URL ?? "");

  console.log("isInternal", isInternal);

  // Allow all requests during development
  // if (process.env.NODE_ENV === "development") {
  //   return NextResponse.next();
  // }

  // Allow requests from internal sources (frontend)
  if (isInternal) {
    return NextResponse.next();
  }

  // Block API access to non-admin users in production
  if (
    nextUrl.pathname.startsWith("/api/") &&
    (!token || token.role !== "ADMIN")
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Restrict access to "/admin/:path*" (only allow admins)
  if (
    nextUrl.pathname.startsWith("/admin") &&
    (!token || token.role !== "ADMIN")
  ) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect unauthorized users
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:id*", "/admin/:path*", "/api/:path*"],
};
