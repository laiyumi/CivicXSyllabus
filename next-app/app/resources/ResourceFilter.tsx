"use client";

import { Category, Post, Tag } from "@prisma/client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResourceFilter = () => {
  const router = useRouter();

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
  ];

  useEffect(() => {
    // fetch all categories and map them to options
    const fetchData = async () => {
      const categoryResponse = await axios.get("/api/categories");
      const categoriesObj = await categoryResponse.data;
      setCategories((prev) => [
        ...prev,
        ...categoriesObj.map((category: Category) => ({
          label: category.name,
          value: category.name,
        })),
      ]);

      // fetch all tags and map them to options
      const tagResponse = await axios.get("/api/tags");
      const tagsObj = await tagResponse.data;
      setTags((prev) => [
        ...prev,
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
  const [order, setOrder] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [searchParams, setSearchParams] = useState({
    category: "",
    tag: "",
    // order: "",
    search: "",
  });

  const onSearch = () => {
    // update the search parameters
    const newSearchParams = {
      category: selectedCategory,
      tag: selectedTag,
      // order: order,
      search: searchInput,
    };

    // update the search parameters
    setSearchParams(newSearchParams);

    // update the search parameters in the URL
    const queryString = Object.keys(newSearchParams)
      .filter(
        (key) => newSearchParams[key as keyof typeof newSearchParams] !== ""
      )
      .map(
        (key) =>
          `${key}=${newSearchParams[key as keyof typeof newSearchParams]}`
      )
      .join("&");

    // navigate to the page with the search parameters
    router.push(`/resources?${queryString}`);
  };

  const changeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value;

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("order", selectedOrder);

    const queryString = currentParams.toString();
    router.push(`/resources?${queryString}`);
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
          onChange={(category) =>
            setSelectedCategory(encodeURIComponent(category.target.value))
          }
        >
          {categories.map((category) => (
            <option key={category.label} value={category.value || ""}>
              {category.label}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered w-auto text-base-content "
          onChange={(tag) => setSelectedTag(tag.target.value)}
          aria-label="Select a tag"
        >
          {tags.map((tag) => (
            <option key={tag.label} value={tag.value || ""}>
              {tag.label}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered w-auto text-base-content "
          aria-label="Select an order"
          // onChange={(e) => setOrder(e.target.value)}
          onChange={changeOrder}
          defaultValue={orders[0].value}
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
