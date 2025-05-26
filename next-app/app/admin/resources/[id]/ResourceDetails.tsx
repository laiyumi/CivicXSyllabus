import React from "react";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";

const ResourceDetails = async ({ resourceId }: { resourceId: string }) => {
  const resource = await prisma.post.findUnique({
    where: { id: resourceId },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      source: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!resource) {
    notFound();
  }

  const created_date = format(resource.createdAt, "MM/dd/yy");
  const updated_date = format(resource.updatedAt, "MM/dd/yy");

  return (
    <div className="flex flex-col gap-16">
      <div className="justify-self-center w-full flex flex-col gap-6">
        <div className="flex justify-between mr-5">
          <p>Created at: {created_date}</p>
          <p>Updated at: {updated_date}</p>
        </div>
        <div className="flex items-baseline gap-4">
          <h2>Categories</h2>
          <div className="flex gap-3 flex-wrap mt-4">
            {resource.categories.map((category) => (
              <div key={category.id} className="badge badge-secondary">
                {category.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-baseline gap-4">
          <h2>Tags</h2>
          <div className="flex gap-3 flex-wrap mt-4">
            {resource.tags.map((tag) => (
              <div key={tag.id} className="badge badge-secondary">
                {tag.name}
              </div>
            ))}
          </div>
        </div>
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Year</span>
          <input
            type="text"
            value={resource.year}
            className="input input-bordered w-full"
            disabled
          />
        </label>
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Source</span>
          <input
            type="text"
            value={resource.source.name}
            className="input input-bordered w-full"
            disabled
          />
        </label>
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Excerpt</span>
          <textarea
            className="textarea textarea-bordered h-24"
            value={resource.excerpt}
            disabled
          ></textarea>
        </label>
        <label className="form-control w-full  flex gap-2">
          <span className="text-m">Link</span>
          <input
            type="text"
            value={resource.link}
            className="input input-bordered w-full"
            disabled
          />
        </label>
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Content</span>
          <textarea
            className="textarea textarea-bordered h-48"
            value={resource.content}
            disabled
          ></textarea>
        </label>
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Thumbnail Image</span>
          <Image
            src={resource.imageUrl}
            alt="thumbnail"
            className="w-72 h-54 object-cover"
          />
        </label>
      </div>

      <div className="flex flex-col gap-6 pl-16"></div>
    </div>
  );
};

export default ResourceDetails;
