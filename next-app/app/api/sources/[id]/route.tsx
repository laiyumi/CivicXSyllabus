import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "../../../../prisma/client";

// get a single source
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const source = await prisma.source.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!source)
    return NextResponse.json({ error: "source not found" }, { status: 404 });
  // return NextResponse.json(source);
  return new NextResponse(JSON.stringify(source), {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      "Content-Type": "application/json",
    },
  });
}

// update a source
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const source = await prisma.source.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!source)
    return NextResponse.json({ error: "source not found" }, { status: 404 });
  const updatedSource = await prisma.source.update({
    where: { id: params.id },
    data: {
      name: body.name,
    },
  });
  return NextResponse.json(updatedSource);
}

// delete a source
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const source = await prisma.source.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!source)
    return NextResponse.json({ error: "source not found" }, { status: 404 });
  await prisma.source.delete({
    where: { id: source.id },
  });
  return NextResponse.json({ message: "source deleted" }, { status: 200 });
}
