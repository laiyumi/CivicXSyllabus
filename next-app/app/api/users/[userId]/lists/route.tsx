import { NextRequest, NextResponse } from "next/server";
import { listSchema } from "../../schema";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/authOptions";

// get all lists of a user
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  // get all lists and their posts under the user
  const lists = await prisma.list.findMany({
    where: { userId: params.userId },
    include: {
      posts: true,
    },
  });

  if (!lists)
    return NextResponse.json({ error: "Lists not found" }, { status: 404 });

  return NextResponse.json(lists);
}

// create a new list for a user
export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  // Validate the session
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized: No session found" },
      { status: 401 }
    );
  }

  // Validate if the session's user ID matches the `params.id`
  if (session.user.id !== params.userId) {
    return NextResponse.json(
      { error: "Forbidden: Invalid user" },
      { status: 403 }
    );
  }

  // validate the request body, if invalid, return 400
  const body = await request.json();
  const validation = listSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // check if the list name already exists
  const existingList = await prisma.list.findFirst({
    where: {
      name: body.name,
      userId: params.userId,
    },
  });
  if (existingList)
    return NextResponse.json(
      { error: "List with this name already exists" },
      { status: 400 }
    );

  // create a new list in the db
  const list = await prisma.list.create({
    data: {
      name: body.name,
      userId: params.userId,
    },
    select: { id: true, name: true },
  });
  return NextResponse.json(list, { status: 201 });
}
