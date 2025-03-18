import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "../schema";
import prisma from "../../../../prisma/client";

// get a single user
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  console.log("Received user id:", params.userId);

  // fetch data from db, if not found return 404
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    include: {
      lists: true,
    },
  });

  if (!user)
    return NextResponse.json(
      { error: "user not found in api endpoint" },
      { status: 404 }
    );

  console.log(
    "Getting user data from /users/[userId] endpoint ---------------",
    user
  );

  return NextResponse.json(user, { status: 200 });
}

// update username
export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  // find the user
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
  });

  if (!user) {
    return NextResponse.json(
      { error: "user not found in api endpoint" },
      { status: 404 }
    );
  }

  console.log("Received user id:", params.userId);

  const { newUsername } = await request.json();
  if (!newUsername) {
    return NextResponse.json(
      { error: "username is required" },
      { status: 400 }
    );
  }

  // update the username
  try {
    const updateUsername = await prisma.user.update({
      where: { id: params.userId },
      data: { name: newUsername },
    });

    return NextResponse.json(updateUsername, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update username" },
      { status: 500 }
    );
  }
}

// Delete a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  // find the user
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
  });

  if (!user) {
    return NextResponse.json(
      { error: "user not found in database" },
      { status: 404 }
    );
  }

  console.log("Received user id:", params.userId);

  try {
    // Step 1: Delete dependent relations first
    await prisma.session.deleteMany({ where: { userId: params.userId } });
    await prisma.account.deleteMany({ where: { userId: params.userId } });
    await prisma.authenticator.deleteMany({ where: { userId: params.userId } });
    await prisma.list.deleteMany({ where: { userId: params.userId } });

    // Step 2: Delete the user
    await prisma.user.delete({ where: { id: params.userId } });
    console.log(
      `User ${params.userId} and all related data deleted successfully.`
    );

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
