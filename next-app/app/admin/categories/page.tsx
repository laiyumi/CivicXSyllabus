import Badge from "@/app/components/Badge";
import { Category } from "@prisma/client";
import React from "react";

const AdminCategoriesPage = async () => {
  const categoryResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/categories`
  );
  const categories = await categoryResponse.json();

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
