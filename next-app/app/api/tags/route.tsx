import schema from "./schema";
import prisma from "../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

// get all tags
export async function GET(request: NextRequest) {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      posts: true,
    },
  });
  return NextResponse.json(tags);
}

// create a new tag
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const tag = await prisma.tag.findUnique({
    where: {
      name: body.name,
    },
  });
  if (tag) {
    return NextResponse.json({ error: "tag already exists" }, { status: 400 });
  }

  const newTag = await prisma.tag.create({
    data: {
      name: body.name,
    },
    include: {
      posts: true,
    },
  });

  return NextResponse.json(newTag, { status: 201 });
}
