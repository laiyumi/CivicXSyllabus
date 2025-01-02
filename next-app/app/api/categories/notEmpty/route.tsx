import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

// get categories with at least one resource
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        posts: {
          some: {},
        },
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
