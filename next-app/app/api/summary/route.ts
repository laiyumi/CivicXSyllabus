import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";

export async function GET(request: NextRequest) {
  try {
    const [resources, users, sources, categories, tags] = await Promise.all([
      prisma.post.count(),
      prisma.user.count(),
      prisma.source.count(),
      prisma.category.count(),
      prisma.tag.count(),
    ]);
    return NextResponse.json({
      resources,
      users,
      sources,
      categories,
      tags,
    });
  } catch (error) {
    console.error("Failed to fetch dashboard summary:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard summary" },
      { status: 500 }
    );
  }
}
