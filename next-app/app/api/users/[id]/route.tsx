import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // fetch data from db, if not found return 404
  if (params.id > 10)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  return NextResponse.json({ id: params.id, name: "test name" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // validate the request body, if invalid, return 400
  const body = await request.json();
  if (!body.name)
    return NextResponse.json({ error: "name is required" }, { status: 400 });

  // fetch the user with the given id, if not found return 404
  if (params.id > 10)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  // update the user in the db
  return NextResponse.json({ id: params.id, name: body.name });
  // return the updated user
}

export function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // fetch the user from db, if not found, return 404
  if (params.id > 10)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  // delete the user in the db(TODO), return 200
  return NextResponse.json({ message: "user deleted" }, { status: 200 });
}
