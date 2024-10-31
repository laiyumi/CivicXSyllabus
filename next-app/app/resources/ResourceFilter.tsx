"use client";

import prisma from "@/prisma/client";
import { Category, Tag } from "@prisma/client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";

const ResourceFilter = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<
    { label: string; value?: string }[]
  >([]);
  const [tags, setTags] = useState<{ label: string; value?: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // fetch all categories and map them to options
      const categoryResponse = await fetch(
        "http://localhost:3000/api/categories",
        {
          next: { revalidate: 10 },
        }
      );
      const categoriesObj = await categoryResponse.json();
      const categoriesData = [
        { label: "All Categories" },
        ...categoriesObj.map((category: Category) => ({
          label: category.name,
          value: category.name,
        })),
      ];
      setCategories(categoriesData);

      // fetch all tags and map them to options
      const tagResponse = await fetch("http://localhost:3000/api/categories", {
        next: { revalidate: 10 },
      });
      const tagsObj = await tagResponse.json();
      const tagsData = [
        { label: "All Tags" },
        ...tagsObj.map((tag: Tag) => ({
          label: tag.name,
          value: tag.name,
        })),
      ];
      setTags(tagsData);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-around my-8">
      <SearchBar />
      <select className="select select-bordered w-full max-w-xs">
        {categories.map((category) => (
          <option key={category.label} value={category.value || ""}>
            {category.label}
          </option>
        ))}
      </select>
      <select className="select select-bordered w-full max-w-xs">
        {tags.map((tag) => (
          <option key={tag.label} value={tag.value || ""}>
            {tag.label}
          </option>
        ))}
      </select>
      <button className="btn btn-primary">Search</button>
    </div>
  );
};

export default ResourceFilter;
