import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "../../../prisma/client";

// get all sources
export async function GET(request: NextRequest) {
  const sources = await prisma.source.findMany();
  // return NextResponse.json(sources);
  return new NextResponse(JSON.stringify(sources), {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      "Content-Type": "application/json",
    },
  });
}

// create a new source
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const source = await prisma.source.findUnique({
    where: {
      name: body.name,
    },
  });
  if (source)
    return NextResponse.json(
      { error: "source already exists" },
      { status: 400 }
    );
  const newSource = await prisma.source.create({
    data: {
      name: body.name,
    },
  });
  return NextResponse.json(newSource, { status: 201 });
}
