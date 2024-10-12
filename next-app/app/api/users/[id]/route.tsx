import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "../../../../prisma/client";

// get a single user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // fetch data from db, if not found return 404
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  return NextResponse.json(user);
}

// update a single user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // validate the request body, if invalid, return 400
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // check if the user already exists
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  // fetch the user with the given id, if not found return 404
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  // update the user in the db
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(updatedUser);
}

// delete a single user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // fetch the user from db, if not found, return 404
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  // delete the user in the db, return 200
  await prisma.user.delete({
    where: { id: user.id },
  });
  return NextResponse.json({ message: "user deleted" }, { status: 200 });
}
