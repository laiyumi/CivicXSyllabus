import { NextRequest, NextResponse } from "next/server";
import createResourceSchema from "../../validationSchemas";
import prisma from "../../../prisma/client";

// get all posts
export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        categories: true,
        tags: true,
        source: true,
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

// create a new post
export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(body);

  // validate the body
  const validation = createResourceSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // check if the post already exists
  const post = await prisma.post.findUnique({
    where: {
      title: body.title,
    },
  });
  if (post)
    return NextResponse.json({ error: "post already exists" }, { status: 400 });

  // add the new post
  const newPost = await prisma.post.create({
    data: {
      title: body.title,
      excerpt: body.excerpt,
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
        connectOrCreate: body.categories.map((categoryName: string) => ({
          where: { name: categoryName },
          create: { name: categoryName },
        })),
      },
      tags: {
        connectOrCreate: body.tags.map((tagName: string) => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      },
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}
