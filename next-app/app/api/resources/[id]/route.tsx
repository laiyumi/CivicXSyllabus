import { NextRequest, NextResponse } from "next/server";
import createResourceSchema from "../../../validationSchemas";
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
    include: {
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      source: {
        select: {
          id: true,
          name: true,
        },
      },
      // lists: true,
      _count: {
        select: { lists: true },
      },
    },
  });
  if (!resource)
    return NextResponse.json({ error: "resource not found" }, { status: 404 });
  return new NextResponse(JSON.stringify(resource), {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      "Content-Type": "application/json",
    },
  });
}

// update a single resource
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // console.log("edit resource params: ", params);

  const body = await request.json();

  console.log("receiving resource body: ", body);

  // validate the request body
  const validation = createResourceSchema.safeParse(body);
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
      year: Number(body.year),
      content: body.content,
      link: body.link,
      imageUrl: body.imageUrl,
      source: {
        connectOrCreate: {
          where: { name: body.source },
          create: { name: body.source },
        },
      },
      categories: {
        set: body.categories.map((categoryID: string) => ({
          id: categoryID,
        })),
      },
      tags: {
        set: body.tags.map((tagID: string) => ({ id: tagID })),
      },
    },
  });

  console.log("updated resource: ", updatedResource);

  // return the updated resource
  return NextResponse.json(updatedResource, { status: 200 });
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
  await prisma.post.update({
    where: { id: resource.id },
    data: {
      published: false,
    },
  });

  return NextResponse.json(
    { message: "resource deleted(soft)" },
    { status: 200 }
  );
}
