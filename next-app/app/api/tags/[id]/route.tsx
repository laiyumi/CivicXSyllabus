import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "../../../../prisma/client";

// get a single tag
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tag = await prisma.tag.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!tag)
    return NextResponse.json({ error: "tag not found" }, { status: 404 });
  // return NextResponse.json(tag);
  return new NextResponse(JSON.stringify(tag), {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      "Content-Type": "application/json",
    },
  });
}

// update a tag
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const tag = await prisma.tag.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!tag)
    return NextResponse.json({ error: "tag not found" }, { status: 404 });

  const updatedTag = await prisma.tag.update({
    where: { id: params.id },
    data: {
      name: body.name,
    },
  });
  return NextResponse.json(updatedTag);
}

// delete a tag
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tag = await prisma.tag.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!tag)
    return NextResponse.json({ error: "tag not found" }, { status: 404 });

  await prisma.tag.delete({
    where: { id: tag.id },
  });
  return NextResponse.json({ message: "tag deleted" }, { status: 200 });
}
