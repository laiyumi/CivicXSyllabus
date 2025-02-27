import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import bcrypt from "bcrypt";
import { schema } from "./schema";

export async function POST(request: NextRequest) {
  const { email, resetToken, newPassword, confirmedNewPassword } =
    await request.json();
  if (!email || !resetToken || !newPassword || !confirmedNewPassword) {
    return NextResponse.json(
      {
        error:
          "Email, reset token, new password, and confirmed new password are required",
      },
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

  // check if the new password is the same as the old password
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // this user does not have a password -> login with google account
  if (!user?.password) {
    return NextResponse.json(
      {
        error: "User does not have a password, try to login via Google account",
      },
      { status: 400 }
    );
  }

  // compare the old password with the new passwordq
  const isMatch = await bcrypt.compare(newPassword, user.password);
  if (isMatch) {
    return NextResponse.json(
      {
        error: "New password cannot be the same as the old password",
      },
      { status: 400 }
    );
  }

  // validate the new password
  const validation = schema.safeParse({
    password: newPassword,
    confirmedPassword: confirmedNewPassword,
  });
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  // update the db with the new password
  const updatedPassword = await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
    },
  });

  // clean up: delete all tokens for this user
  await prisma.verificationToken.deleteMany({
    where: {
      identifier: email,
    },
  });

  return NextResponse.json(
    { message: "Password has been reset successfully!" },
    { status: 200 }
  );
}
