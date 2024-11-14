"use client";
import Badge from "@/app/components/Badge";
import { Category } from "@prisma/client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await axios.get("/api/categories");
      setCategories(categoryResponse.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-5">
        <h1>Categories</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="New category"
            className="input input-bordered w-full max-w-xs"
          />{" "}
          <button className="btn btn-primary ml-2d">Add</button>
        </div>
        <div className="flex gap-6 flex-wrap">
          {categories.map((category: Category) => (
            <Badge name={category.name} key={category.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
