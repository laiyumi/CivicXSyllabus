import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";
import { schema } from "../auth/reset-password/schema";

export async function POST(request: NextRequest) {
  const { email, newPassword, confirmedNewPassword } = await request.json();

  const missingFields: string[] = [];
  if (!email) missingFields.push("Email");
  if (!newPassword) missingFields.push("New password");
  if (!confirmedNewPassword) missingFields.push("Confirmed new password");

  if (missingFields.length) {
    return NextResponse.json(
      {
        error: `The following fields are required: ${missingFields.join(", ")}`,
      },
      { status: 400 }
    );
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

  return NextResponse.json(
    { message: "Password has been reset successfully!" },
    { status: 200 }
  );
}
