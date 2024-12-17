import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// view the json web token
export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  return NextResponse.json(token);
}
