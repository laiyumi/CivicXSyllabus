import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // check if user in the db
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  if (user.password === null) {
    return NextResponse.json({ error: "Password not set" }, { status: 400 });
  }

  // check if the password is correct
  const isMatch = await bcrypt.compare(body.password.trim(), user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Password incorrect" }, { status: 400 });
  }

  // return the user object
  return NextResponse.json({ id: user.id, email: user.email }, { status: 200 });
}
