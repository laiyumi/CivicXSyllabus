"use client";

import React, { useState, useEffect } from "react";
import blogPostsData from "@/data/blog-posts.json";

const AdminBlogPage = () => {
  const blogPosts = blogPostsData;

  const [newBlog, setNewBlog] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  return (
    <div>
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl">Blogs</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter the linkedin article url"
              value={newBlog}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setNewBlog(e.target.value)}
            />{" "}
            <button
              className="btn btn-primary ml-2d"
              onClick={() => console.log("Add blog clicked")}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl">Blog Posts</h2>
        <div className="flex flex-col gap-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="border-b border-base-300 pb-4">
              <p className="text-sm text-base-content/70">{post.url}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPage;
