import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "../../../prisma/client";

// get all posts
export async function GET(request: NextRequest) {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

// create a new post
export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(body);
  console.log(body.tags.map((tag: string) => ({ name: tag })));
  console.log(body.categories.map((category: string) => ({ name: category })));

  // validate the body
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
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
        connect: body.categories.map((category: string) => ({
          name: category,
        })),
      },
      tags: {
        connect: body.tags.map((tag: string) => ({ name: tag })),
      },
      // savedByUsers: {
      //   connect: [{ name: body.savedByUsers }],
      // },
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}
