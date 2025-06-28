import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { listId: string } }
) {
  try {
    const { listId } = params;

    if (!listId) {
      return NextResponse.json(
        { message: "List ID is required" },
        { status: 400 }
      );
    }

    // Fetch the list with posts and user info
    const list = await prisma.list.findUnique({
      where: {
        id: listId,
      },
      include: {
        posts: {
          include: {
            categories: true,
            tags: true,
            source: true,
          },
          where: {
            published: true, // Only include published posts
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!list) {
      return NextResponse.json({ message: "List not found" }, { status: 404 });
    }

    // Return the list data (no authentication required for public access)
    return NextResponse.json(list);
  } catch (error) {
    console.error("Error fetching shared list:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
