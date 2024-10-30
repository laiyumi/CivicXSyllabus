import { NextRequest, NextResponse } from "next/server";
import schema from "../../../validationSchemas";
import prisma from "../../../../prisma/client";

// get a single resource
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const resource = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!resource)
    return NextResponse.json({ error: "resource not found" }, { status: 404 });
  return NextResponse.json(resource);
}

// update a single resource
export async function PUT(
  request: NextResponse,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  // validate the request body
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // fetch the resource with the given id
  const resource = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!resource)
    return NextResponse.json({ error: "resource not found" }, { status: 404 });

  // update the resource in the db
  const updatedResource = await prisma.post.update({
    where: { id: resource.id },
    data: {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      link: body.link,
      imageUrl: body.imageUrl,
    },
  });

  // return the updated resource
  return NextResponse.json(updatedResource);
}

// delete a single resource
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // fetch the resource from the db
  const resource = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!resource)
    return NextResponse.json({ error: "resource not found" }, { status: 404 });

  // delete the resource
  await prisma.post.delete({
    where: { id: resource.id },
  });

  return NextResponse.json({ message: "resource deleted" }, { status: 200 });
}
