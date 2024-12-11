import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "../schema";
import prisma from "../../../../prisma/client";

// get a single user
export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  console.log("Received email param:", params.email);

  // fetch data from db, if not found return 404
  const user = await prisma.user.findUnique({
    where: { email: params.email },
    include: {
      list: true,
      accounts: true,
      sessions: true,
      Authenticator: true,
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
