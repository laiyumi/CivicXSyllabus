// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const apiKey = req.headers.get("x-api-key");
//   const validApiKey = process.env.NEXT_PUBLIC_API_KEY;

//   // Allow unrestricted access in development
//   if (process.env.NODE_ENV !== "production") {
//     return NextResponse.next();
//   }

//   // Require API key in production
//   if (!apiKey || apiKey !== validApiKey) {
//     return NextResponse.json(
//       { error: "Forbidden: Invalid API key" },
//       { status: 403 }
//     );
//   }

//   return NextResponse.next();
// }
