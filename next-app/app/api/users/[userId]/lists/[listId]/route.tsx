import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

// get all posts in a list
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; listId: string } }
) {
  // fetch posts from db, if not found return 404
  const posts = await prisma.list.findUnique({
    where: { id: params.listId },
    include: {
      posts: {
        include: {
          categories: true,
          tags: true,
        },
      },
    },
  });

  if (!posts)
    return NextResponse.json({ error: "list not found" }, { status: 404 });

  // return NextResponse.json(posts);
  return new NextResponse(JSON.stringify(posts), {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      "Content-Type": "application/json",
    },
  });
}

// update a list name
export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string; listId: string } }
) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { error: "Invalid request. Name is required." },
        { status: 400 }
      );
    }

    // Check if list exists
    const existingList = await prisma.list.findUnique({
      where: { id: params.listId },
    });

    if (!existingList) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    // Verify that the list belongs to the user
    if (existingList.userId !== params.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if a list with the new name already exists for the user
    const existingListWithName = await prisma.list.findFirst({
      where: {
        userId: params.userId,
        name: body.name,
      },
    });
    if (existingListWithName) {
      return NextResponse.json(
        { error: "A list with this name already exists" },
        { status: 409 }
      );
    }

    // Update the list name
    const updatedList = await prisma.list.update({
      where: { id: params.listId },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(updatedList, { status: 200 });
  } catch (error) {
    console.error("Error updating list name:", error);
    return NextResponse.json(
      { error: "Failed to update list name" },
      { status: 500 }
    );
  }
}

// add a post to the list
export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string; listId: string } }
) {
  const body = await request.json();

  // add the post to the list
  const updatedList = await prisma.list.update({
    where: { id: params.listId },
    data: {
      posts: {
        connect: { id: body.postId },
      },
    },
  });

  return NextResponse.json(updatedList, { status: 201 });
}

// delete a post from the list or delete the whole list
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string; listId: string } }
) {
  const body = await request.json();
  if (body.postId) {
    const postId = body.postId;

    // remove the post from the list
    const updatedList = await prisma.list.update({
      where: { id: params.listId },
      data: {
        posts: {
          disconnect: { id: postId },
        },
      },
    });

    return NextResponse.json(updatedList, { status: 201 });
  } else {
    // Otherwise, delete the list
    const list = await prisma.list.findUnique({
      where: { id: params.listId },
    });

    if (!list) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    if (list.userId !== params.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.list.delete({
      where: { id: params.listId },
    });

    return NextResponse.json(
      { message: "List deleted successfully" },
      { status: 200 }
    );
  }
}
