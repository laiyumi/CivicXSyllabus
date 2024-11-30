import React from "react";
import { Post } from "@prisma/client";
import { format } from "date-fns";

interface Resource extends Post {
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  source: { id: string; name: string };
}

const ResourceDetails = ({ resource }: { resource: Resource }) => {
  const created_date = format(resource.createdAt, "MM/dd/yy");
  const updated_date = format(resource.updatedAt, "MM/dd/yy");

  return (
    <div className="grid grid-cols-3 gap-16">
      <div className="col-span-2 justify-self-center w-full flex flex-col gap-6">
        <div className="flex justify-between">
          <p>Created at: {created_date}</p>
          <p>Updated at: {updated_date}</p>
        </div>
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
            className="textarea textarea-bordered h-36"
            value={resource.content}
            disabled
          ></textarea>
        </label>
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Thumbnail Image</span>
          <img src={resource.imageUrl} className="w-72 h-54 object-cover"></img>
        </label>
      </div>

      <div className="col-span-1 justify-self-center border-l border-gray-900/10 w-full">
        <div className="flex flex-col gap-6 pl-16">
          <div>
            <h2>Categories</h2>
            <div className="flex gap-3 flex-wrap mt-4">
              {resource.categories.map((category) => (
                <div key={category.id} className="badge badge-ghost">
                  {category.name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>Tags</h2>
            <div className="flex gap-3 flex-wrap mt-4">
              {resource.tags.map((tag) => (
                <div key={tag.id} className="badge badge-ghost">
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
