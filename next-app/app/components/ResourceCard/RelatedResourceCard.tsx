import React from "react";
import { Category, Prisma, Tag } from "@prisma/client";
import ToggleLikes from "../ToggleLikes";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

const RelatedResourceCard = ({ resource }: { resource: PostWithRelations }) => {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/resources?category=${encodeURIComponent(categoryName)}`);
  };

  const handleTagClick = (tagName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/resources?tag=${encodeURIComponent(tagName)}`);
  };

  return (
    <div
      key={resource.id}
      className="card bg-base-100 shadow-xl col-span-full xl:col-span-4 hover:-translate-y-2 transition ease-in-out delay-100 duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none flex flex-col h-full"
    >
      <Link
        href={`/resources/${resource.id}`}
        className="flex flex-col flex-grow"
      >
        <div className="card-body flex flex-col flex-grow p-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              {resource.categories.map((category) => (
                <div
                  key={category.name}
                  className="badge badge-secondary badge-sm md:badge-md cursor-pointer hover:bg-[hsl(248_49%_34%)] "
                  onClick={(e) => handleCategoryClick(category.name, e)}
                >
                  {category.name}
                </div>
              ))}
            </div>
            <h2 className="card-title">{resource.title}</h2>
            <p className="text-sm">{resource.excerpt}</p>
            <div className="flex gap-3 mt-1">
              {resource.tags.map((tag) => (
                <div
                  key={tag.name}
                  className="badge badge-outline badge-sm md:badge-md cursor-pointer hover:bg-base-300"
                  onClick={(e) => handleTagClick(tag.name, e)}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
          <div className="card-actions justify-end mt-auto">
            <button className="btn btn-sm btn-primary">Read More</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RelatedResourceCard;
