import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";
import prisma from "../../prisma/client";
import { Category, Tag } from "@prisma/client";

// define the shape of the resource object
interface Resource {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  link: string;
  imageUrl: string;
  published: boolean;
}

const ResourcesGrid = async ({
  selectedCategory,
  selectedTag,
}: {
  selectedCategory: string;
  selectedTag: string;
}) => {
  // fetch categories from endpoint and set the cache time to 10 seconds
  const categoryResponse = await fetch("http://localhost:3000/api/categories", {
    next: { revalidate: 10 },
  });

  // check if the search category are valid
  const categories = await categoryResponse.json();
  const categoryNames = categories.map((category: Category) => category.name);
  const passedCategory = categoryNames.includes(selectedCategory)
    ? selectedCategory
    : undefined;

  const tagResponse = await fetch("http://localhost:3000/api/tags", {
    next: { revalidate: 10 },
  });
  // check if the search tags are valid
  const tags = await tagResponse.json();
  const tagNames = tags.map((tag: Tag) => tag.name);
  const passedTag = tagNames.includes(selectedTag) ? selectedTag : undefined;

  // convert response to json and declare the type
  const resources = await prisma.post.findMany({
    where: {
      AND: [
        {
          categories: {
            some: {
              name: passedCategory,
            },
          },
        },
        {
          tags: {
            some: {
              name: passedTag,
            },
          },
        },
      ],
    },
    include: {
      categories: {
        where: {
          name: passedCategory,
        },
      },
      tags: {
        where: {
          name: passedTag,
        },
      },
    },
  });

  // render
  return (
    <div className="grid grid-flow-row-dense grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="card bg-base-100 shadow-xl col-span-1"
        >
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
            <div className="card-actions justify-end mt-4">
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
