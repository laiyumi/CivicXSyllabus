// cannot have route file and page file in the same folder
// route file is used to handel HTTP requests, while page file is used to render HTML pages

import { NextRequest, NextResponse } from "next/server";

// create an endpoint and return an object
export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "John" },
    { id: 2, name: "Ken" },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // validate the body
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
