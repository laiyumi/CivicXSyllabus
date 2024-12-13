import { NextRequest, NextResponse } from "next/server";
import createResourceSchema from "../../../validationSchemas";
import prisma from "../../../../prisma/client";

interface Resource {
  title: string;
  excerpt: string;
  content: string;
  link: string;
  imageUrl: string;
  source: string;
  categories: string[];
  tags: string[];
}

// Create posts
export async function POST(request: NextRequest) {
  const body = await request.json();

  const resources: Resource[] = body;

  const failedPosts: { title: string; reason: string }[] = [];
  const successfulPosts: string[] = [];

  // iterate over the resources
  for (const resource of resources) {
    try {
      // step 1: do validation
      const validation = createResourceSchema.safeParse(resource);
      if (!validation.success) {
        failedPosts.push({
          title: resource.title,
          reason: "Validation failed",
        });
        continue;
      }

      // step 2: check if the post already exists
      const post = await prisma.post.findUnique({
        where: {
          title: resource.title,
        },
      });
      if (post) {
        failedPosts.push({
          title: resource.title,
          reason: "Post already exists",
        });
        continue;
      }

      // step 3: create the new resouce
      const newPost = await prisma.post.create({
        data: {
          title: resource.title,
          excerpt: resource.excerpt,
          content: resource.content,
          link: resource.link,
          imageUrl: resource.imageUrl,
          source: {
            connectOrCreate: {
              where: { name: resource.source },
              create: { name: resource.source },
            },
          },
          categories: {
            connectOrCreate: resource.categories.map(
              (categoryName: string) => ({
                where: { name: categoryName },
                create: { name: categoryName },
              })
            ),
          },
          tags: {
            connectOrCreate: resource.tags.map((tagName: string) => ({
              where: { name: tagName },
              create: { name: tagName },
            })),
          },
        },
      });
      successfulPosts.push(resource.title);
    } catch (error) {
      console.error(`Error creating post: ${error}`);

      failedPosts.push({
        title: resource.title,
        reason: "Prisma failed to create post",
      });
    }
  }

  return NextResponse.json({
    message: "Bulk upload completed",
    successfulPosts,
    failedPosts,
  });
}

// Delete all posts
export async function DELETE(request: NextRequest) {
  await prisma.post.deleteMany();
  return NextResponse.json({ message: "All posts deleted" }, { status: 200 });
}
