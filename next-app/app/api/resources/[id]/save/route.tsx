import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("receiving POST request to save a resource");

  const updatedList = await prisma.list.update({
    where: {
      id: "list_id_here",
    },
    data: {
      posts: {
        connect: {
          id: params.id,
        },
      },
    },
    include: {
      posts: true,
    },
  });
}
