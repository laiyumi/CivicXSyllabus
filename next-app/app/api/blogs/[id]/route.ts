import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/client";

// Update an existing blog
export async function PUT(request: NextRequest) {
  try {
    const { blogId, featured, published } = await request.json();

    // Here you would typically update the blog in a database
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
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    // Here you would typically delete the blog from a database
    console.log("Blog ID to delete:", id);

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
