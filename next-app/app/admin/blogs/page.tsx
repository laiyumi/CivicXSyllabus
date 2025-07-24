"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Blog } from "@prisma/client";
import axios from "axios";
import { create } from "domain";
import { useNotifications } from "@/app/contexts/NotificationContext";
import { CreateBlogSchema } from "@/app/validationSchemas";

const AdminBlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<Blog[]>();
  const [sortBy, setSortBy] = useState<keyof Blog>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [newBlog, setNewBlog] = useState("");
  const [validationError, setValidationError] = useState("");

  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const { showNotification } = useNotifications();

  // Call API to fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, [newBlog]);

  const createBlog = async () => {
    // Clear previous validation error
    setValidationError("");

    // Validate the input using CreateBlogSchema
    try {
      CreateBlogSchema.parse({ blogUrl: newBlog });
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        setValidationError(error.errors[0].message);
        showNotification(error.errors[0].message, "error");
        return;
      }
    }

    try {
      const response = await axios.post("/api/blogs", {
        blogUrl: newBlog,
      });
      console.log("Blog created:", response.data);
      showNotification("Blog created successfully.", "success");
      setNewBlog("");
      setValidationError("");
    } catch (error) {
      console.error("Failed to create blog:", error);
      showNotification("Failed to create blog.", "error");
    }
  };

  // Handle input change with validation
  const handleBlogUrlChange = (value: string) => {
    setNewBlog(value);

    // Clear validation error if input is empty
    if (!value.trim()) {
      setValidationError("");
      return;
    }

    // Validate on change
    try {
      CreateBlogSchema.parse({ blogUrl: value });
      setValidationError("");
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        setValidationError(error.errors[0].message);
      }
    }
  };
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

  // Fetch blogs function for reuse
  const fetchBlogs = async () => {
    const response = await axios.get("/api/blogs");
    const data = response.data as Blog[];
    setBlogPosts(data);
  };

  // Call PUT API to update blog featured status
  const updateBlogFeatured = async (
    id: string,
    featured: boolean,
    published: boolean
  ) => {
    // If trying to feature a post, check if we already have 2 featured posts
    if (!featured) {
      const currentFeaturedCount =
        blogPosts?.filter((blog) => blog.featured && blog.id !== id).length ||
        0;
      if (currentFeaturedCount >= 2) {
        showNotification(
          "Maximum of 2 featured posts allowed. Please unfeature another post first.",
          "error"
        );
        return;
      }
    }

    try {
      const res = await axios.put(`/api/blogs/${id}`, {
        blogId: id,
        featured: !featured,
        published,
      });
      if (res.status === 200) {
        showNotification(
          "Blog featured status updated successfully.",
          "success"
        );
        await fetchBlogs(); // Refresh the data
      }
    } catch (error: any) {
      console.error("Failed to update blog featured status:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to update blog featured status.";
      showNotification(errorMessage, "error");
    }
  };

  // Call PUT API to update blog published status
  const updateBlogPublished = async (
    id: string,
    featured: boolean,
    published: boolean
  ) => {
    try {
      const res = await axios.put(`/api/blogs/${id}`, {
        blogId: id,
        featured,
        published: !published,
      });
      if (res.status === 200) {
        showNotification(
          "Blog published status updated successfully.",
          "success"
        );
        await fetchBlogs(); // Refresh the data
      }
    } catch (error: any) {
      console.error("Failed to update blog published status:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to update blog published status.";
      showNotification(errorMessage, "error");
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (id: string, title: string) => {
    setBlogToDelete({ id, title });
    setIsDeleteDialogOpen(true);
  };

  // Handle actual blog deletion
  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;

    setIsDeleting(true);
    try {
      const res = await axios.delete(`/api/blogs/${blogToDelete.id}`);
      if (res.status === 200) {
        showNotification("Blog deleted successfully.", "success");
        await fetchBlogs(); // Refresh the data
        setIsDeleteDialogOpen(false);
        setBlogToDelete(null);
      }
    } catch (error: any) {
      console.error("Failed to delete blog:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to delete blog.";
      showNotification(errorMessage, "error");
    } finally {
      setIsDeleting(false);
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
            <div className="w-full">
              <input
                type="text"
                placeholder="Enter the linkedin article url"
                value={newBlog}
                className={`input input-bordered w-full ${validationError ? "input-error" : ""}`}
                onChange={(e) => handleBlogUrlChange(e.target.value)}
              />
              {validationError && (
                <div className="text-error text-sm mt-1">{validationError}</div>
              )}
            </div>
            <button
              className="btn btn-primary ml-2"
              onClick={createBlog}
              disabled={!!validationError || !newBlog.trim()}
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
              {sortedBlogs.map((blog, index) => (
                <tr key={blog.id}>
                  <td>{index + 1}</td>
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
                        updateBlogFeatured(
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
                        updateBlogPublished(
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
                    <button
                      className="btn btn-outline btn-sm btn-error"
                      onClick={() =>
                        openDeleteDialog(blog.id, blog.title || "this blog")
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <dialog
          className="modal modal-bottom sm:modal-middle fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          open
        >
          <div className="modal-box relative bg-white p-6 rounded-lg shadow-lg">
            <form method="dialog">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-center">Delete Blog Post</h3>
            <p className="py-4 text-center">
              Are you sure you want to delete "{blogToDelete?.title}"? <br />
              This action <strong className="text-red-600">cannot</strong> be
              undone.
            </p>
            <div className="modal-action">
              <button
                className={`btn btn-error ${isDeleting ? "loading" : ""}`}
                onClick={handleDeleteBlog}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Blog"}
              </button>
              <button
                className="btn"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AdminBlogPage;
