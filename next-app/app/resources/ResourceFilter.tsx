"use client";

import { Category, Tag, Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SortSelector from "./SortSelector"; // Adjust the path as necessary

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
      const tagResponse = await fetch("http://localhost:3000/api/tags", {
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

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    const queryParams = {
      category: selectedCategory,
      tag: selectedTag,
      order: order,
    };

    const queryString = Object.keys(queryParams)
      .filter((key) => queryParams[key as keyof typeof queryParams] !== "")
      .map((key) => `${key}=${queryParams[key as keyof typeof queryParams]}`)
      .join("&");

    router.push(`/resources?${queryString}`);
  }, [selectedCategory, selectedTag, order, router]);

  const handleCategoryChange = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  };

  const handleTagChange = (selectedTag: string) => {
    setSelectedTag(selectedTag);
  };

  const handleSortOrderChange = (sortOrder: string) => {
    setOrder(sortOrder);
  };

  // const handleFilterChange = () => {
  //   if (selectedCategory === "" && selectedTag === "") {
  //     router.push("/resources");
  //   }
  //   if (selectedCategory && selectedTag) {
  //     router.push(`/resources?category=${selectedCategory}&tag=${selectedTag}`);
  //   } else if (selectedCategory) {
  //     router.push(`/resources?category=${selectedCategory}`);
  //   } else if (selectedTag) {
  //     router.push(`/resources?tag=${selectedTag}`);
  //   }
  // };

  const orders: { label: string; value: keyof Post }[] = [
    { label: "Created Date", value: "createdAt" },
    { label: "Updated Date", value: "updatedAt" },
    { label: "Title", value: "title" },
  ];

  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  return (
    <div className="flex flex-col gap-4 justify-around my-8">
      <div className="flex gap-4">
        <div className="w-full">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
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
        {/* <button className="btn btn-primary" onClick={handleFilterChange}>
          Apply Filter
        </button> */}
      </div>
    </div>
  );
};

export default ResourceFilter;
