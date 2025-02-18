import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

// set the published to false
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const resource = await prisma.post.update({
    where: {
      id: params.id,
    },
    data: {
      published: false,
    },
  });

  return NextResponse.json(resource, { status: 200 });
}
