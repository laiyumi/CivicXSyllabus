import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10)
    return NextResponse.json({ error: "resource not found" }, { status: 404 });
  return NextResponse.json({ id: params.id, title: "test" });
}

export async function PUT(
  request: NextResponse,
  { params }: { params: { id: number } }
) {
  const body = await request.json();

  // validate the request body
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // fetch the resource with the given id
  if (params.id > 10)
    return NextResponse.json({ error: "resource not found" }, { status: 404 });

  // update the resource in the db

  // return the updated resource
  return NextResponse.json({
    id: params.id,
    title: body.title,
    description: body.description,
  });
}

export function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // fetch the resource from the db
  if (params.id > 10)
    return NextResponse.json({ error: "resource not found" }, { status: 404 });

  // delete the resource

  return NextResponse.json({ message: "resource deleted" }, { status: 200 });
}
