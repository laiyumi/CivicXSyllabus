import { NextRequest, NextResponse } from "next/server";
import { listSchema } from "../../schema";
import prisma from "../../../../../prisma/client";

// get all lists of a user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // fetch data from db, if not found return 404
  const lists = await prisma.list.findMany({
    where: { userId: params.id },
  });

  if (!lists)
    return NextResponse.json({ error: "lists not found" }, { status: 404 });

  return NextResponse.json(lists);
}

// create a new list for a user
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // validate the request body, if invalid, return 400
  const body = await request.json();
  const validation = listSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // check if the list name already exists
  const existingList = await prisma.list.findFirst({
    where: { name: body.name },
  });
  if (existingList)
    return NextResponse.json(
      { error: "list with this name already exists" },
      { status: 400 }
    );

  // create a new list in the db
  const list = await prisma.list.create({
    data: {
      name: body.name,
      userId: params.id,
    },
  });
  return NextResponse.json(list, { status: 201 });
}
