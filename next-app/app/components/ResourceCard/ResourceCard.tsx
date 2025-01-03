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
        card bg-base-100 shadow-xl col-span-1 
        hover:-translate-y-2 transition ease-in-out delay-100 duration-300 
        motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <figure className="w-full h-[300px] relative">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={resource.imageUrl}
          alt={resource.title}
        />
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
        <div className="card-actions justify-between mt-4">
          <div onClick={(e) => e.stopPropagation()}>
            <ToggleLikes resourceId={resource.id} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;
