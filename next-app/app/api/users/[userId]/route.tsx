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

  console.log("Getting user data---------------", user);

  return NextResponse.json(user);
}
