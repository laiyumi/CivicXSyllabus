import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

// update likes count for a resource
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("receiving PUT request to update likes");

  if (!params?.id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  // fetch the resource with the given id
  const resource = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!resource)
    return NextResponse.json({ error: "resource not found" }, { status: 404 });

  // update the likes
  const updatedLikes = await prisma.post.update({
    where: { id: resource.id },
    data: {
      likes: { increment: 1 },
    },
  });

  console.log("after updating likes: ", updatedLikes);

  return NextResponse.json(updatedLikes, { status: 200 });
}
