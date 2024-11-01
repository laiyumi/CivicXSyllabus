import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";
import prisma from "../../prisma/client";

// define the shape of the resource object
interface Resource {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  link: string;
  imageUrl: string;
  published: boolean;
  saves: number;
  likes: number;
  sourceId: string;
  categoryIDs: string[];
  tagIDs: string[];
  userIDs: string[];
}

const ResourcesGrid = async () => {
  // fetch resources from endpoint and set the cache time to 10 seconds
  const response = await fetch("http://localhost:3000/api/resources", {
    next: { revalidate: 10 },
  });

  // convert response to json and declare the type
  const resources = await prisma.post.findMany({
    include: {
      categories: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
  });

  // render
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <div key={resource.id} className="card bg-base-100 w-96 shadow-xl">
          <figure className="w-full h-[300px]">
            <img className="object-cover" src={resource.imageUrl} alt="TODO" />
          </figure>
          <div className="card-body">
            <div className="flex flex-wrap gap-3">
              {resource.categories.map((category) => (
                <div key={category.name} className="badge badge-secondary">
                  {category.name}
                </div>
              ))}
            </div>
            <h2 className="card-title">{resource.title}</h2>
            <p className="text-sm">{resource.excerpt}</p>
            <div className="flex gap-3 mt-1">
              {resource.tags.map((tag) => (
                <div key={tag.name} className="badge badge-outline">
                  {tag.name}
                </div>
              ))}
            </div>
            <div className="card-actions justify-start mt-4">
              <Link
                href={`/resources/${resource.id}`}
                className="btn btn-sm btn-primary"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourcesGrid;
