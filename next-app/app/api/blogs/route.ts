const mql = require("@microlink/mql");
import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../prisma/client";
import { BlogType } from "@prisma/client";

// GET all blogs with optional published filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published');
    
    let whereClause = {};
    
    // If publishedOnly parameter is 'true', filter for published blogs only
    if (publishedOnly === 'true') {
      whereClause = { published: true };
    }
    
    const blogs = await prisma.blog.findMany({
      where: whereClause,
    });
    
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

// Create a new blog
export async function POST(request: NextRequest) {
  try {
    const { blogUrl } = await request.json();

    // validate URL
    if (!blogUrl || !/^https?:\/\/.+/.test(blogUrl)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Check if blog with this URL already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { link: blogUrl },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: "Blog with this URL already exists" },
        { status: 409 }
      );
    }

    // Fetch metadata from the blog URL
    const title = extractTitleFromUrl(blogUrl);
    const type = getUrlType(blogUrl);

    const newBlog = await prisma.blog.create({
      data: {
        title,
        link: blogUrl,
        type: type as BlogType,
        published: false,
        featured: false,
      },
    });
    console.log("New blog created:", newBlog);

    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json(
      {
        error: "Failed to create blog",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

const getUrlType = (url: string): string => {
  if (url.includes("/pulse/")) {
    return "ARTICLE";
  } else if (url.includes("/posts/")) {
    return "POST";
  }
  return "ARTICLE"; // Default type if not recognized
};

const extractTitleFromUrl = (url: string): string => {
  try {
    // Handle LinkedIn articles: /pulse/{title}-{author}-{id}/
    const pulseMatch = url.match(/\/pulse\/([^\/\?]+)/);
    if (pulseMatch && pulseMatch[1]) {
      const titlePart = pulseMatch[1];
      // Remove the author and ID parts (everything after the last occurrence of author pattern)
      const cleanTitle = titlePart.replace(/-civicxsyllabus-[a-zA-Z0-9]+$/, "");
      // Convert to readable title
      return cleanTitle
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(/\s+/g, " ")
        .trim();
    }

    // Handle LinkedIn posts: /posts/civicxsyllabus_{title}-activity-{id}/
    const postMatch = url.match(/\/posts\/civicxsyllabus_(.+?)-activity-/);
    if (postMatch && postMatch[1]) {
      const titlePart = postMatch[1];
      // Convert to readable title
      return titlePart
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(/\s+/g, " ")
        .trim();
    }

    // Fallback: try to extract any meaningful text from the URL
    const urlParts = url.split("/").filter((part) => part.length > 0);
    const lastPart = urlParts[urlParts.length - 1] || "";
    if (lastPart.includes("-")) {
      return lastPart
        .split("?")[0] // Remove query parameters
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(/\s+/g, " ")
        .trim();
    }

    return "LinkedIn Content";
  } catch (error) {
    return "LinkedIn Content";
  }
};
