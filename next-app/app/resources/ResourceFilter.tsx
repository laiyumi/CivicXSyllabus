"use client";

import { Category, Post, Tag } from "@prisma/client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

interface CategoryWithPosts extends Category {
  posts: PostWithRelations[];
}

interface TagWithPosts extends Tag {
  posts: PostWithRelations[];
}

interface PostWithRelations extends Post {
  categories: Category[];
  tags: Tag[];
}

const ResourceFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [order, setOrder] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [disableFilterBtn, setDisableFilterBtn] = useState(true);

  const [categories, setCategories] = useState<
    { label: string; value?: string; count?: number }[]
  >([{ label: "All Topics", value: "" }]);

  const [tags, setTags] = useState<
    { label: string; value?: string; count?: number }[]
  >([{ label: "All Types", value: "" }]);

  const [allCategories, setAllCategories] = useState<CategoryWithPosts[]>([]);
  const [allTags, setAllTags] = useState<TagWithPosts[]>([]);

  const [lastSearchedTerm, setLastSearchedTerm] = useState("");

  const orders: { label: string; value: string }[] = [
    // { label: "Created Date", value: "createdAt" },
    { label: "Title", value: "title" },
    { label: "Newest to Oldest", value: "NewestToOldest" },
    { label: "Oldest to Newest", value: "OldestToNewest" },
    { label: "# Likes", value: "Likes" },
  ];

  // Fetch all data initially
  useEffect(() => {
    const fetchAllData = async () => {
      const categoryResponse = await axios.get("/api/categories");
      const categoriesObj: CategoryWithPosts[] = await categoryResponse.data;
      setAllCategories(categoriesObj);

      const tagResponse = await axios.get("/api/tags");
      const tagsObj: TagWithPosts[] = await tagResponse.data;
      setAllTags(tagsObj);
    };
    fetchAllData();
  }, []);

  // Update dropdowns based on current selections
  useEffect(() => {
    updateDropdowns();
  }, [allCategories, allTags, selectedCategory, selectedTag]);

  // Update disableFilterBtn based on selections
  useEffect(() => {
    setDisableFilterBtn(!selectedCategory && !selectedTag);
  }, [selectedCategory, selectedTag]);

  const updateDropdowns = () => {
    // Update categories dropdown
    if (selectedTag) {
      // Filter categories by selected tag
      const filteredCategories = allCategories.map((category) => {
        const filteredPosts = category.posts.filter((post) =>
          post.tags.some((tag: Tag) => tag.name === selectedTag)
        );
        return {
          ...category,
          posts: filteredPosts,
        };
      });

      setCategories([
        { label: "All Topics", value: "" },
        ...filteredCategories.map((category) => ({
          label: `${category.name} (${category.posts.length})`,
          value: category.name,
          count: category.posts.length,
        })),
      ]);
    } else {
      // Show all categories with their full counts
      setCategories([
        { label: "All Topics", value: "" },
        ...allCategories.map((category) => ({
          label: `${category.name} (${category.posts.length})`,
          value: category.name,
          count: category.posts.length,
        })),
      ]);
    }

    // Update tags dropdown
    if (selectedCategory) {
      // Filter tags by selected category
      const filteredTags = allTags.map((tag) => {
        const filteredPosts = tag.posts.filter((post) =>
          post.categories.some(
            (category: Category) => category.name === selectedCategory
          )
        );
        return {
          ...tag,
          posts: filteredPosts,
        };
      });

      setTags([
        { label: "All Types", value: "" },
        ...filteredTags.map((tag) => ({
          label: `${tag.name} (${tag.posts.length})`,
          value: tag.name,
          count: tag.posts.length,
        })),
      ]);
    } else {
      // Show all tags with their full counts
      setTags([
        { label: "All Types", value: "" },
        ...allTags.map((tag) => ({
          label: `${tag.name} (${tag.posts.length})`,
          value: tag.name,
          count: tag.posts.length,
        })),
      ]);
    }
  };

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
      setLastSearchedTerm(searchInput);
    } else {
      setLastSearchedTerm("");
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

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedTag("");
    setSearchInput("");
    setLastSearchedTerm("");
    setOrder(orders[0].value);

    // Clear URL parameters
    router.push("/resources");
  };

  return (
    <div className="flex flex-col gap-4 justify-around my-8">
      <div className="flex md:flex-row xs:flex-col gap-2">
        <div className="w-full">
          <label className="input input-sm md:input-md input-bordered flex items-center gap-2">
            <input
              aria-label="Search"
              id="search-input"
              name="search"
              type="text"
              className="grow"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e)}
            />
            <button
              type="button"
              onClick={handleClearFilters}
              className={`btn btn-xs btn-ghost btn-circle${!searchInput ? " invisible" : ""}`}
              aria-label="Clear search"
              tabIndex={searchInput ? 0 : -1}
              style={{ pointerEvents: searchInput ? "auto" : "none" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
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
          className="select select-sm md:select-md select-bordered md:w-40 text-base-content"
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
          className="select select-sm md:select-md select-bordered md:w-40 text-base-content "
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
          className="select select-sm md:select-md select-bordered md:w-40 text-base-content "
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
        <button className="btn btn-sm md:btn-md btn-primary" onClick={onSearch}>
          Search
        </button>
        <button
          className="btn btn-sm md:btn-md btn-outline"
          disabled={disableFilterBtn}
          onClick={handleClearFilters}
        >
          ✕ Clear Filter
        </button>
      </div>
      {(selectedCategory ||
        selectedTag ||
        lastSearchedTerm ||
        (order && order !== orders[0].value)) && (
        <div className="flex flex-wrap gap-2 mt-2 items-center">
          Results for:{" "}
          {selectedCategory && (
            <span className="badge badge-info">Topic: {selectedCategory}</span>
          )}
          {selectedTag && (
            <span className="badge badge-success">Type: {selectedTag}</span>
          )}
          {lastSearchedTerm && (
            <span className="badge badge-primary">
              Search: &quot;{lastSearchedTerm}&quot;
            </span>
          )}
          {order && order !== orders[0].value && (
            <span className="badge badge-secondary">
              Order: {orders.find((o) => o.value === order)?.label || order}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceFilter;
