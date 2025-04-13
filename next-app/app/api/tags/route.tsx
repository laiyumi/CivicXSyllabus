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
  // return NextResponse.json(tags);
  return new NextResponse(JSON.stringify(tags), {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      "Content-Type": "application/json",
    },
  });
}

// create a new tag
export async function POST(request: NextRequest) {
  const body = await request.json();
  const inputName = body.name.trim();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Format the name (first letter capitalized)
  const formattedName =
    inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase();

  const existingTag = await prisma.tag.findUnique({
    where: {
      name: formattedName,
    },
  });
  if (existingTag) {
    return NextResponse.json({ error: "Type already exists" }, { status: 409 });
  }

  const newTag = await prisma.tag.create({
    data: {
      name: formattedName,
    },
    include: {
      posts: true,
    },
  });

  return NextResponse.json(newTag, { status: 201 });
}
