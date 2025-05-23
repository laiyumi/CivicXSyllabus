// cannot have route file and page file in the same folder
// route file is used to handel HTTP requests, while page file is used to render HTML pages

import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "./schema";
import prisma from "../../../prisma/client";

// get all users
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    include: {
      lists: {
        include: {
          posts: true,
        },
      },
    },
  });
  // return NextResponse.json(users);
  return new NextResponse(JSON.stringify(users), {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      "Content-Type": "application/json",
    },
  });
}

// Create a new user
export async function POST(request: NextRequest) {
  const body = await request.json();

  // validate the body
  const validation = userSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // check if the user already exists
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  // Create the user and default list in a transaction
  const newUser = await prisma.$transaction(async (tx) => {
    // Create the user
    const user = await tx.user.create({
      data: {
        name: body.name,
        email: body.email,
        role: body.role,
      },
    });

    // Create a default list for the user
    await tx.list.create({
      data: {
        name: "Default",
        userId: user.id,
      },
    });

    return user;
  });

  return NextResponse.json(newUser, { status: 201 });
}
