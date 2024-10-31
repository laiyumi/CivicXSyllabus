import React from "react";
import { Post } from "@prisma/client";

interface Resource extends Post {
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
}

const ResourceDetails = ({ resource }: { resource: Resource }) => {
  console.log(resource.categories);

  return (
    <div className="grid grid-cols-2 gap-16">
      <p>Created At: {resource.createdAt.toDateString()}</p>
      <p>Updated At: {resource.updatedAt.toDateString()}</p>
      <div className="justify-self-center w-full flex flex-col gap-6">
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Title *</span>
          <input
            type="text"
            value={resource.title}
            className="input input-bordered w-full"
            disabled
          />
        </label>
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Source *</span>
          <input
            type="text"
            value={resource.sourceId}
            className="input input-bordered w-full"
            disabled
          />
        </label>
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Excerpt *</span>
          <textarea
            className="textarea textarea-bordered h-24"
            value={resource.excerpt}
            disabled
          ></textarea>
        </label>
        <label className="form-control w-full  flex gap-2">
          <span className="text-m">Link *</span>
          <input
            type="text"
            value={resource.link}
            className="input input-bordered w-full"
            disabled
          />
        </label>
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Content *</span>
          <textarea
            className="textarea textarea-bordered h-36"
            value={resource.content}
            disabled
          ></textarea>
        </label>
        <label className="form-control w-full flex gap-2">
          <span className="text-m">Thumbnail Image *</span>
          {/* <UploadImage onImageUpload={handleImageUpload} /> */}
        </label>
      </div>

      <div className="justify-self-center border-l border-gray-900/10 w-full">
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
