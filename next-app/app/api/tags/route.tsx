import schema from "./schema";
import prisma from "../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { formatTitleCase } from "@/utils/formatter";

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

  const formattedName = formatTitleCase(inputName);

  // Get all tags and filter case-insensitively in JS
  const allTags = await prisma.tag.findMany();
  const existingTag = allTags.find(
    (tag) => tag.name.toLowerCase() === inputName.toLowerCase()
  );

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
