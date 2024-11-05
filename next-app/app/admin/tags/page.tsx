import Badge from "@/app/components/Badge";
import { Tag } from "@prisma/client";
import React from "react";

const AdminTagsPage = async () => {
  const tagResponse = await fetch("http://localhost:3000/api/tags");
  const tags = await tagResponse.json();
  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-5">
        <h1>Categories</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="New tag"
            className="input input-bordered w-full max-w-xs"
          />{" "}
          <button className="btn btn-primary ml-2d">Add</button>
        </div>
        <div className="flex gap-6 flex-wrap">
          {tags.map((tag: Tag) => (
            <Badge name={tag.name} key={tag.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTagsPage;
