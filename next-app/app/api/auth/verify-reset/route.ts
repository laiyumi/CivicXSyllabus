import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request: NextRequest) {
  const { email, resetToken } = await request.json();
  if (!email || !resetToken) {
    return NextResponse.json(
      { error: "Email and reset token are required" },
      { status: 400 }
    );
  }

  // find the hashed token in db
  const tokensRecord = await prisma.verificationToken.findMany({
    where: {
      identifier: email,
      expires: { gt: new Date() }, // filter out expired tokens
    },
  });

  if (!tokensRecord.length) {
    return NextResponse.json(
      { error: "Token not found or expired" },
      { status: 400 }
    );
  }

  // compare the reset token
  const isValid = await Promise.any(
    tokensRecord.map((record) => bcrypt.compare(resetToken, record.token))
  ).catch(() => false);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid reset token" }, { status: 400 });
  }
  return NextResponse.json({ message: "Token verified" }, { status: 200 });
}
