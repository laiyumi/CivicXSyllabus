export { default } from "next-auth/middleware";

// only execute the middleware on the following routes
export const config = {
  // *: zero or more
  // +: one or more
  // ?: zero or one
  matcher: ["/user/:id*", "/admin/:path*"],
};
