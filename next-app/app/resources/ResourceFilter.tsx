import prisma from "@/prisma/client";
import { Category } from "@prisma/client";
import React from "react";
import SearchBar from "./SearchBar";

const ResourceFilter = async () => {
  // fetch all categories and map them to options
  const allCategories = await prisma.category.findMany();
  const categories: { label: string; value?: string }[] = [
    { label: "All" },
    ...allCategories.map((category) => ({
      label: category.name,
      value: category.name,
    })),
  ];

  // fetch all tags and map them to options
  const allTags = await prisma.tag.findMany();
  const tags: { label: string; value?: string }[] = [
    { label: "All" },
    ...allTags.map((tag) => ({
      label: tag.name,
      value: tag.name,
    })),
  ];

  return (
    <div className="flex justify-around my-8">
      <SearchBar />
      <select className="select select-bordered w-full max-w-xs">
        <option disabled selected>
          Categories
        </option>
        {categories.map((category) => (
          <option key={category.value} value={category.value || ""}>
            {category.label}
          </option>
        ))}
      </select>
      <select className="select select-bordered w-full max-w-xs">
        <option disabled selected>
          Tags
        </option>
        {tags.map((tag) => (
          <option key={tag.value} value={tag.value || ""}>
            {tag.label}
          </option>
        ))}
      </select>
      <button className="btn btn-primary">Search</button>
    </div>
  );
};

export default ResourceFilter;
