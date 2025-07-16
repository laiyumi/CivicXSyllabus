"use client";

import React, { useState, useEffect } from "react";
import blogPostsData from "@/data/blog-posts.json";
import Link from "next/link";

interface BlogPost {
  id: number;
  url: string;
  featured: boolean;
}

const AdminBlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(blogPostsData);
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [newBlog, setNewBlog] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Sort blogs based on current sort criteria
  const sortedBlogs = [...blogPosts].sort((a, b) => {
    let aValue: any = a[sortBy as keyof BlogPost];
    let bValue: any = b[sortBy as keyof BlogPost];

    if (sortBy === "url") {
      // Extract title from URL for better sorting
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleFeatureToggle = (id: number, currentFeatured: boolean) => {
    setBlogPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, featured: !currentFeatured } : post
      )
    );
  };

  const getSortIcon = (key: string) => {
    if (sortBy !== key)
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="xs:w-3 xs:h-3 lg:w-4 lg:h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          />
        </svg>
      );
    return sortOrder === "asc" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-3 h-3 lg:w-4 lg:h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-3 h-3 lg:w-4 lg:h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        />
      </svg>
    );
  };

  const getUrlType = (url: string): string => {
    if (url.includes("/pulse/")) {
      return "Article";
    } else if (url.includes("/posts/")) {
      return "Post";
    }
    return "Other";
  };

  const extractTitleFromUrl = (url: string): string => {
    try {
      // Handle LinkedIn articles: /pulse/{title}-{author}-{id}/
      const pulseMatch = url.match(/\/pulse\/([^\/\?]+)/);
      if (pulseMatch && pulseMatch[1]) {
        const titlePart = pulseMatch[1];
        // Remove the author and ID parts (everything after the last occurrence of author pattern)
        const cleanTitle = titlePart.replace(
          /-civicxsyllabus-[a-zA-Z0-9]+$/,
          ""
        );
        // Convert to readable title
        return cleanTitle
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())
          .replace(/\s+/g, " ")
          .trim();
      }

      // Handle LinkedIn posts: /posts/civicxsyllabus_{title}-activity-{id}/
      const postMatch = url.match(/\/posts\/civicxsyllabus_(.+?)-activity-/);
      if (postMatch && postMatch[1]) {
        const titlePart = postMatch[1];
        // Convert to readable title
        return titlePart
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())
          .replace(/\s+/g, " ")
          .trim();
      }

      // Fallback: try to extract any meaningful text from the URL
      const urlParts = url.split("/").filter((part) => part.length > 0);
      const lastPart = urlParts[urlParts.length - 1] || "";
      if (lastPart.includes("-")) {
        return lastPart
          .split("?")[0] // Remove query parameters
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())
          .replace(/\s+/g, " ")
          .trim();
      }

      return "LinkedIn Content";
    } catch (error) {
      return "LinkedIn Content";
    }
  };

  return (
    <div>
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl">Blogs</h1>
        <div className="">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter the linkedin article url"
              value={newBlog}
              className="input input-bordered w-full"
              onChange={(e) => setNewBlog(e.target.value)}
            />{" "}
            <button
              className="btn btn-primary ml-2"
              onClick={() => console.log("Add blog clicked")}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="table table-zebra table-pin-rows">
            <thead>
              <tr>
                <th
                  className="w-1/10 cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <span className="inline-flex items-center gap-1">
                    ID {getSortIcon("id")}
                  </span>
                </th>
                <th
                  className="w-5/10 cursor-pointer"
                  onClick={() => handleSort("url")}
                >
                  <span className="inline-flex items-center gap-1">
                    Content {getSortIcon("url")}
                  </span>
                </th>
                <th className="w-1/10">
                  <span className="inline-flex items-center gap-1">Type</span>
                </th>
                <th
                  className="w-2/10 cursor-pointer"
                  onClick={() => handleSort("featured")}
                >
                  <span className="inline-flex items-center gap-1">
                    Featured
                  </span>
                </th>
                <th className="w-1/10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBlogs.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <div className="flex flex-col">
                      <div className="font-semibold text-sm">
                        {extractTitleFromUrl(post.url)}
                      </div>
                      <Link
                        href={post.url}
                        target="_blank"
                        className="text-xs text-blue-600 hover:underline truncate max-w-md"
                      >
                        {post.url}
                      </Link>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${getUrlType(post.url) === "Article" ? "badge-primary" : "badge-secondary"}`}
                    >
                      {getUrlType(post.url)}
                    </span>
                  </td>
                  <td>
                    <div
                      onClick={() =>
                        handleFeatureToggle(post.id, post.featured)
                      }
                    >
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={post.featured}
                        readOnly
                      />
                    </div>
                  </td>
                  <td className="flex gap-2">
                    <Link
                      href={post.url}
                      target="_blank"
                      className="btn btn-outline btn-sm"
                    >
                      View
                    </Link>
                    <button className="btn btn-outline btn-sm btn-error">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPage;
