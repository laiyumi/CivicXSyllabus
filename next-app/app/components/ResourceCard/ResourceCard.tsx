import { Category, Prisma, Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import ToggleLikes from "../ToggleLikes";

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

const ResourceCard = ({ resource }: { resource: PostWithRelations }) => {
  return (
    <Link
      href={`/resources/${resource.id}`}
      key={resource.id}
      className="
        card bg-base-100 shadow-xl
        col-span-full md:col-span-6 xl:col-span-4 
        hover:-translate-y-2 transition ease-in-out delay-100 duration-300 
        motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <figure className="w-full h-[300px] relative md:h-[250px] xs: h-[200px]">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={resource.imageUrl}
          alt={resource.title}
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          {resource.categories.map((category) => (
            <div
              key={category.name}
              className="badge badge-secondary badge-sm md:badge-md"
            >
              {category.name}
            </div>
          ))}
        </div>
        <h2 className="card-title">{resource.title}</h2>
        <p className="text-sm">{resource.excerpt}</p>
        <div className="flex flex-wrap gap-3 mt-1">
          {resource.tags.map((tag) => (
            <div
              key={tag.name}
              className="badge badge-outline badge-sm md:badge-md"
            >
              {tag.name}
            </div>
          ))}
        </div>
        <div className="card-actions justify-between mt-4">
          <div onClick={(e) => e.stopPropagation()}>
            <ToggleLikes resourceId={resource.id} />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 xs:size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            {resource.year}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;
