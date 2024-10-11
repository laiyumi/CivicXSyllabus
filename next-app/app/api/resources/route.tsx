import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, title: "test resource 1", description: "resouce 1 description" },
    { id: 2, title: "test resource 2", description: "resource 2 description" },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  return NextResponse.json(
    { id: 10, title: body.title, description: body.description },
    { status: 201 }
  );
}
