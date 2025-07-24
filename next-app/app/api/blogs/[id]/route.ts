import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/client";

// Update an existing blog
export async function PUT(request: NextRequest) {
  try {
    const { blogId, featured, published } = await request.json();

    console.log("[Calling API]Updating blog:", {
      blogId,
      featured,
      published,
    });

    // If trying to set featured to true, check if we already have 2 featured posts
    if (featured) {
      const currentFeaturedCount = await prisma.blog.count({
        where: { 
          featured: true,
          id: { not: blogId } // Exclude current blog from count
        },
      });

      if (currentFeaturedCount >= 2) {
        return NextResponse.json(
          { error: "Maximum of 2 featured posts allowed" },
          { status: 400 }
        );
      }
    }

    // Update the blog in the database
    const res = await prisma.blog.update({
      where: { id: blogId },
      data: { featured, published },
    });
    console.log("Updated blog data:", res);
    return NextResponse.json(
      { message: "Blog updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// Delete a blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = params.id;
    console.log("Blog ID to delete:", blogId);

    // Delete the blog from the database
    await prisma.blog.delete({
      where: { id: blogId },
    });

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting blog:", err);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
