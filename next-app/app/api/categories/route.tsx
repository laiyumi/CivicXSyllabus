import schema from "./schema";
import prisma from "../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

// get all categories
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany();
    console.log("Fetched categories:", categories);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// create a new category
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const category = await prisma.category.findUnique({
    where: {
      name: body.name,
    },
  });
  if (category) {
    return NextResponse.json(
      { error: "category already exists" },
      { status: 400 }
    );
  }

  const newCategory = await prisma.category.create({
    data: {
      name: body.name,
    },
  });
  return NextResponse.json(newCategory, { status: 201 });
}
