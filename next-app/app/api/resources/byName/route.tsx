import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "Missing 'name' query parameter" },
      { status: 400 }
    );
  }

  const resource = await prisma.post.findUnique({
    where: {
      title: name,
    },
    include: {
      categories: true,
      tags: true,
      source: true,
    },
  });

  if (!resource) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  // return NextResponse.json(resource);
  return new NextResponse(JSON.stringify(resource), {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      "Content-Type": "application/json",
    },
  });
}
