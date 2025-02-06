import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";
import { schema } from "./schema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  // check if user already exists
  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // create this user
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
      image: "/default_avatar.png",
    },
  });

  return NextResponse.json({ email: newUser.email }, { status: 200 });
}
