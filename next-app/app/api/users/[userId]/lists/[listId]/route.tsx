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

  return NextResponse.json(posts);
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

// delete a post from the list
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string; listId: string } }
) {
  const body = await request.json();
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
}
