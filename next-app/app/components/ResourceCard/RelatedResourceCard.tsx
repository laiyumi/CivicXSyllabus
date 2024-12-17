import React from "react";
import { Category, Prisma, Tag } from "@prisma/client";
import ToggleLikes from "../ToggleLikes";
import Link from "next/link";

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

const RelatedResourceCard = ({ resource }: { resource: PostWithRelations }) => {
  return (
    <div
      key={resource.id}
      className="card bg-base-100 w-96 shadow-xl
                hover:-translate-y-2 transition ease-in-out delay-100 duration-300 
        motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      {/* <figure>
        <img src={resource.imageUrl} alt={resource.title} />
      </figure> */}
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
          <Link
            href={`/resources/${resource.id}`}
            className="btn btn-sm btn-primary"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedResourceCard;