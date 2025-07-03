import schema from "./schema";
import prisma from "../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { formatTitleCase } from "@/utils/formatter";

// get all categories
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        posts: {
          include: {
            categories: true,
            tags: true,
          },
        },
      },
    });
    // return NextResponse.json(categories);
    return new NextResponse(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      },
    });
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
  const inputName = body.name.trim();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const formattedName = formatTitleCase(inputName);

  const allCategories = await prisma.category.findMany();
  const existingCategory = allCategories.find(
    (category) => category.name.toLowerCase() === inputName.toLowerCase()
  );

  if (existingCategory) {
    return NextResponse.json(
      { error: "Topic already exists" },
      { status: 409 }
    );
  }

  const newCategory = await prisma.category.create({
    data: {
      name: formattedName,
    },
    include: {
      posts: {
        include: {
          categories: true,
          tags: true,
        },
      },
    },
  });
  return NextResponse.json(newCategory, { status: 201 });
}
