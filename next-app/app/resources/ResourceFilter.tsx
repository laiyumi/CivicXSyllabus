"use client";

import { Category, Post, Tag } from "@prisma/client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResourceFilter = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<
    { label: string; value?: string }[]
  >([]);
  const [tags, setTags] = useState<{ label: string; value?: string }[]>([]);

  useEffect(() => {
    // fetch all categories and map them to options
    const fetchData = async () => {
      const categoryResponse = await axios.get("/api/categories");
      const categoriesObj = await categoryResponse.data;
      const categoriesData = [
        { label: "All Categories" },
        ...categoriesObj.map((category: Category) => ({
          label: category.name,
          value: category.name,
        })),
      ];
      setCategories(categoriesData);

      // fetch all tags and map them to options
      const tagResponse = await axios.get("/api/tags");
      const tagsObj = await tagResponse.data;
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

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [order, setOrder] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");

  const [onClickSearch, setOnClickSearch] = useState(false);

  const onSearch = () => {
    setSearchText(searchInput);
    setOnClickSearch(true);
  };

  // update URL when search parameters change
  useEffect(() => {
    if (onClickSearch) {
      const queryParams = {
        category: selectedCategory,
        tag: selectedTag,
        order: order,
        search: searchText,
      };

      const queryString = Object.keys(queryParams)
        .filter((key) => queryParams[key as keyof typeof queryParams] !== "")
        .map((key) => `${key}=${queryParams[key as keyof typeof queryParams]}`)
        .join("&");

      router.push(`/resources?${queryString}`);
    }
  }, [onClickSearch, order, searchText, selectedCategory, selectedTag, router]);

  const orders: { label: string; value: keyof Post }[] = [
    { label: "Created Date", value: "createdAt" },
    { label: "Updated Date", value: "updatedAt" },
    { label: "Title", value: "title" },
  ];

  return (
    <div className="flex flex-col gap-4 justify-around my-8">
      <div className="flex gap-4">
        <div className="w-full">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <select
          className="select select-bordered w-auto"
          onChange={(category) => setSelectedCategory(category.target.value)}
        >
          {categories.map((category) => (
            <option key={category.label} value={category.value || ""}>
              {category.label}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered w-auto"
          onChange={(tag) => setSelectedTag(tag.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag.label} value={tag.value || ""}>
              {tag.label}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered w-auto"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option disabled selected>
            Order By
          </option>
          {orders.map((order) => (
            <option key={order.value} value={order.value}>
              {order.label}
            </option>
          ))}
        </select>{" "}
        <button className="btn btn-primary" onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default ResourceFilter;
