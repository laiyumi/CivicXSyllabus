"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Blog } from "@prisma/client";
import axios from "axios";
import { create } from "domain";

const AdminBlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<Blog[]>();

  const [sortBy, setSortBy] = useState<keyof Blog>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [newBlog, setNewBlog] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Call API to fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get("/api/blogs");
      const data = response.data as Blog[];
      setBlogPosts(data);
    };
    fetchBlogs();
  }, [newBlog]);

  const createBlog = async () => {
    try {
      const response = await axios.post("/api/blogs", {
        blogUrl: newBlog,
      });
      console.log("Blog created:", response.data);
      setMessage("Blog created successfully.");
      setNewBlog("");
    } catch (error) {
      console.error("Failed to create blog:", error);
      setError("Failed to create blog.");
    }
  };

  // Sort blogs based on current sort criteria
  const sortedBlogs = (blogPosts ?? []).slice().sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (typeof aValue === "string" && typeof bValue === "string") {
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
      setSortBy(field as keyof Blog);
      setSortOrder("asc");
    }
  };

  // Call PUT API to update blog feature status
  const updateBlogFeature = async (
    id: string,
    featured: boolean,
    published: boolean
  ) => {
    try {
      const res = await axios.put(`/api/blogs/${id}`, {
        blogId: id,
        featured: !featured,
        published,
      });
      if (res.status === 200) {
        setMessage("Blog feature status updated successfully.");
      }
    } catch (error) {
      console.error("Failed to update blog feature status:", error);
      setError("Failed to update blog feature status.");
    }
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
            <button className="btn btn-primary ml-2" onClick={createBlog}>
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
                <th
                  className="w-2/10 cursor-pointer"
                  onClick={() => handleSort("published")}
                >
                  <span className="inline-flex items-center gap-1">
                    Published
                  </span>
                </th>
                <th className="w-1/10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>
                    <div className="flex flex-col">
                      <div className="font-semibold text-sm">{blog.title}</div>
                      <Link
                        href={blog.link}
                        target="_blank"
                        className="text-xs text-blue-600 hover:underline truncate max-w-md"
                      >
                        {blog.link}
                      </Link>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${blog.type === "ARTICLE" ? "badge-primary" : "badge-secondary"}`}
                    >
                      {blog.type === "ARTICLE" ? "Article" : "Post"}
                    </span>
                  </td>
                  <td>
                    <div
                      onClick={() =>
                        updateBlogFeature(
                          blog.id,
                          blog.featured,
                          blog.published
                        )
                      }
                    >
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={blog.featured}
                        readOnly
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      onClick={() =>
                        updateBlogFeature(
                          blog.id,
                          blog.featured,
                          blog.published
                        )
                      }
                    >
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={blog.published}
                        readOnly
                      />
                    </div>
                  </td>
                  <td className="flex gap-2">
                    <Link
                      href={blog.link}
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
