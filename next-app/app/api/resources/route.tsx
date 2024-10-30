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

  console.log(body.categoryIDs.map((category: string) => ({ id: category })));
  console.log(body.tagIDs.map((tag: string) => ({ id: tag })));

  console.log(body.categoryIDs);
  console.log(body.tagIDs);
  console.log(body.userIDs);

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
          create: {
            name: body.source,
          },
        },
      },
      categories: {
        create: body.categoryIDs.map((categoryId: string) => ({
          category: {
            connect: { id: categoryId },
          },
        })),
      },
      tags: {
        create: body.tagIDs.map((tagId: string) => ({
          tag: {
            connect: { id: tagId },
          },
        })),
      },
      users: {
        create: [
          {
            user: {
              connect: { id: body.userID },
            },
          },
        ],
      },
    },
    include: {
      source: true,
      categories: {
        include: {
          category: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
      users: {
        include: {
          user: true,
        },
      },
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}
