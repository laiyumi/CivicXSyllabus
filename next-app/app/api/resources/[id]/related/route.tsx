import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

// get related resources
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // find the resource with the given id
  const resource = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      categories: true,
      tags: true,
      source: true,
    },
  });
  if (!resource)
    return NextResponse.json({ error: "resource not found" }, { status: 404 });

  const tagsArray = resource.tags.map((tag) => tag.id);
  const categoriesArray = resource.categories.map((category) => category.id);
  const source = resource.source.id;

  // find related resources by matching tags, categories, or source
  const relatedPosts = await prisma.post.findMany({
    where: {
      id: {
        not: params.id, // Exclude the current post
      },
      OR: [
        {
          tags: {
            some: {
              id: {
                in: tagsArray,
              },
            },
          },
        },
        {
          categories: {
            some: {
              id: {
                in: categoriesArray,
              },
            },
          },
        },
        {
          sourceId: source, // Match posts with the same source
        },
      ],
    },
    include: {
      categories: true,
      tags: true,
      source: true,
    },
  });

  // Calculate relevance score for each related post
  const scoredPosts = relatedPosts.map((post) => {
    let score = 0;

    // Category matches
    const categoryMatches = post.categories.filter((category) =>
      categoriesArray.includes(category.id)
    ).length;
    score += categoryMatches * 3; // Higher weight for category matches

    // Tag matches
    const tagMatches = post.tags.filter((tag) =>
      tagsArray.includes(tag.id)
    ).length;
    score += tagMatches * 2; // Medium weight for tag matches

    // Source match
    if (post.sourceId === source) {
      score += 1; // Lower weight for source match
    }

    return {
      ...post,
      score,
    };
  });

  // Sort posts by score (highest first) and take the top 3
  const topRelatedPosts = scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const topRelatedPostsScores = topRelatedPosts.map((post) => post.score);
  console.log("topRelatedPostsScores", topRelatedPostsScores);

  return NextResponse.json(topRelatedPosts, { status: 200 });
}
