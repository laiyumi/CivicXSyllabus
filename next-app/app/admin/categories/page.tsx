"use client";

import Badge from "@/app/components/Badge";
import { Category, Post } from "@prisma/client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface CategoryWithPosts extends Category {
  posts: Post[];
}

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryWithPosts[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await axios.get("/api/categories");
      setCategories(categoryResponse.data);
    };
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    const response = await axios.post("/api/categories", {
      name: newCategory,
    });
    setCategories([...categories, response.data]);
    setNewCategory("");
  };

  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl">Categories</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="New category"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setNewCategory(e.target.value)}
          />{" "}
          <button className="btn btn-primary ml-2d" onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className="grid gap-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category: CategoryWithPosts) => (
            <Badge
              name={category.name}
              key={category.id}
              postCount={category.posts.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
