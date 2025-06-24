"use client";

import { Category, Post, Tag } from "@prisma/client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

const ResourceFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<
    { label: string; value?: string }[]
  >([{ label: "All Topics", value: "" }]);

  const [tags, setTags] = useState<{ label: string; value?: string }[]>([
    { label: "All Types", value: "" },
  ]);

  const orders: { label: string; value: string }[] = [
    // { label: "Created Date", value: "createdAt" },
    { label: "Title", value: "title" },
    { label: "Newest to Oldest", value: "NewestToOldest" },
    { label: "Oldest to Newest", value: "OldestToNewest" },
    { label: "# Likes", value: "Likes" },
  ];

  useEffect(() => {
    // fetch all categories and map them to options
    const fetchData = async () => {
      const categoryResponse = await axios.get("/api/categories");
      const categoriesObj = await categoryResponse.data;
      setCategories([
        { label: "All Topics", value: "" },
        ...categoriesObj.map((category: Category) => ({
          label: category.name,
          value: category.name,
        })),
      ]);

      // fetch all tags and map them to options
      const tagResponse = await axios.get("/api/tags");
      const tagsObj = await tagResponse.data;
      setTags([
        { label: "All Types", value: "" },
        ...tagsObj.map((tag: Tag) => ({
          label: tag.name,
          value: tag.name,
        })),
      ]);
    };
    fetchData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [order, setOrder] = useState(orders[0].value);
  const [searchInput, setSearchInput] = useState("");

  // Sync state with URL params
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const tag = searchParams.get("tag") || "";
    const orderParam = searchParams.get("order") || orders[0].value;
    const search = searchParams.get("search") || "";
    setSelectedCategory(category);
    setSelectedTag(tag);
    setOrder(orderParam);
    setSearchInput(search);
  }, [searchParams]);

  const onSearch = () => {
    const searchParams = new URLSearchParams();
    if (selectedCategory) {
      searchParams.set("category", selectedCategory);
    }
    if (selectedTag) {
      searchParams.set("tag", selectedTag);
    }
    if (searchInput) {
      searchParams.set("search", searchInput);
    }

    router.push(`/resources?${searchParams.toString()}`);
  };

  const changeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value;

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("order", selectedOrder);

    const queryString = currentParams.toString();
    router.push(`/resources?${queryString}`);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);

    const searchParams = new URLSearchParams();
    if (value) searchParams.set("category", value);
    if (selectedTag) searchParams.set("tag", selectedTag);
    if (searchInput) searchParams.set("search", searchInput);

    router.push(`/resources?${searchParams.toString()}`);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTag(value);

    const searchParams = new URLSearchParams();
    if (selectedCategory) searchParams.set("category", selectedCategory);
    if (value) searchParams.set("tag", value);
    if (searchInput) searchParams.set("search", searchInput);

    router.push(`/resources?${searchParams.toString()}`);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    {
      if (e.key === "Enter") {
        e.preventDefault();
        onSearch();
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-around my-8">
      <div className="flex lg:flex-row xs:flex-col gap-4">
        <div className="w-full">
          <label className="input input-bordered flex items-center gap-2">
            <input
              aria-label="Search"
              id="search-input"
              name="search"
              type="search"
              className="grow"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <title>Search icon</title>
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <select
          className="select select-bordered w-auto text-base-content "
          aria-label="Select a category"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          {categories.map((category) => (
            <option key={category.label} value={category.value || ""}>
              {category.label}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered w-auto text-base-content "
          onChange={handleTagChange}
          aria-label="Select a tag"
          value={selectedTag}
        >
          {tags.map((tag) => (
            <option key={tag.label} value={tag.value || ""}>
              {tag.label}
            </option>
          ))}
        </select>
        {/* <MultiSelectDropdown /> */}
        <select
          className="select select-bordered w-auto text-base-content "
          aria-label="Select an order"
          onChange={changeOrder}
          value={order}
        >
          {orders.map((order) => (
            <option key={order.value} value={order.value}>
              Order by: {order.label}
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
