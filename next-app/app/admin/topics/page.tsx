"use client";

import Badge from "@/app/components/Badge";
import { Category, Post } from "@prisma/client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCategories } from "@/app/hooks/useCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/app/components/Spinner";
import { useNotifications } from "../../contexts/NotificationContext";

interface CategoryWithPosts extends Category {
  posts: Post[];
}

type SortOption = {
  label: string;
  value: string;
};

const AdminCategoriesPage = () => {
  const queryClient = useQueryClient();

  const {
    data: categories = [],
    isLoading,
    error: categoriesError,
    refetch,
  } = useCategories();

  const [newCategory, setNewCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<string>("name-asc");

  const { showNotification, clearAllNotifications } = useNotifications();

  const sortOptions: SortOption[] = [
    { label: "Name: A to Z", value: "name-asc" },
    { label: "Name: Z to A", value: "name-desc" },
    { label: "Count: Low to High", value: "count-asc" },
    { label: "Count: High to Low", value: "count-desc" },
  ];

  // Watch errors from the hook
  useEffect(() => {
    if (categoriesError) {
      clearAllNotifications();
      showNotification(categoriesError.message, "error");
    }
  }, [categoriesError, showNotification, clearAllNotifications]);

  const sortedCategories = [...categories].sort(
    (a: CategoryWithPosts, b: CategoryWithPosts) => {
      const [field, direction] = sortBy.split("-");

      if (field === "name") {
        return direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (field === "count") {
        return direction === "asc"
          ? a.posts.length - b.posts.length
          : b.posts.length - a.posts.length;
      }

      return 0;
    }
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post("/api/categories", {
        name: newCategory.trim(),
      });

      if (response.status === 201) {
        setMessage("Topic added successfully");
        setNewCategory("");
        refetch();
        return;
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          // Zod validation errors - extract the message from the response
          if (Array.isArray(data) && data.length > 0) {
            const errorMessage = data[0]?.message || "Validation failed";
            setError(`${errorMessage}_${Date.now()}`);
          } else {
            setError(`Validation failed_${Date.now()}`);
          }
        } else if (status === 409) {
          // Duplicate error
          setError(`${data?.error || "Topic already exists"}_${Date.now()}`);
        } else {
          // Other errors
          setError(
            `${data?.error || "An unexpected error occurred"}_${Date.now()}`
          );
        }
      } else {
        // Network errors or other issues without a response
        setError(`Failed to add topic: ${error.message}_${Date.now()}`);
      }
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["categories"] });
      setMessage("Topic deleted successfully");
    },
  });

  // Show notifications when error or message changes
  useEffect(() => {
    if (error) {
      clearAllNotifications();
      const actualErrorMessage = error.includes("_")
        ? error.split("_")[0]
        : error;
      showNotification(actualErrorMessage, "error");
      setTimeout(() => setError(""), 3000);
    }
  }, [error, showNotification, clearAllNotifications]);

  useEffect(() => {
    if (message) {
      clearAllNotifications();
      showNotification(message, "success");
      // Clear the message state after showing notification
      setTimeout(() => setMessage(""), 3000);
    }
  }, [message, showNotification, clearAllNotifications]);

  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl">Topics</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter a new topic"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setNewCategory(e.target.value)}
            />{" "}
            <button className="btn btn-primary ml-2d" onClick={handleAdd}>
              Add
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm font-medium">
              Sort by:
            </label>
            <select
              id="sort-select"
              className="select select-bordered select-md"
              value={sortBy}
              onChange={handleSortChange}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid gap-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {sortedCategories.map((category: CategoryWithPosts) => (
              <Badge
                type="categories"
                name={category.name}
                id={category.id}
                key={category.id}
                postCount={category.posts.length}
                onDelete={(id, onComplete) => {
                  deleteMutation.mutate(id, {
                    onSuccess: () => {
                      queryClient.refetchQueries({ queryKey: ["categories"] });
                      onComplete();
                    },
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
