import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "../../../../prisma/client";

// get a single category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!category)
    return NextResponse.json({ error: "category not found" }, { status: 404 });
  return NextResponse.json(category);
}

// update a category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const category = await prisma.category.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!category)
    return NextResponse.json({ error: "category not found" }, { status: 404 });

  const updatedCategory = await prisma.category.update({
    where: { id: params.id },
    data: {
      name: body.name,
    },
  });
  return NextResponse.json(updatedCategory);
}

// delete a category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!category)
    return NextResponse.json({ error: "category not found" }, { status: 404 });
  await prisma.category.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ message: "category deleted" });
}
