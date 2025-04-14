"use client";
import Badge from "@/app/components/Badge";
import { Tag, Post } from "@prisma/client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTags } from "@/app/hooks/useTags";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/app/components/Spinner";
import { useNotifications } from "../../contexts/NotificationContext";

interface TagWithPosts extends Tag {
  posts: Post[];
}

type SortOption = {
  label: string;
  value: string;
};

const AdminTagsPage = () => {
  const queryClient = useQueryClient();

  const { data: tags = [], isLoading, error: tagsError, refetch } = useTags();
  const [newTag, setNewTag] = useState("");
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
    if (tagsError) {
      clearAllNotifications();
      showNotification(tagsError.message, "error");
    }
  }, [tagsError, showNotification, clearAllNotifications]);

  const sortedTags = [...tags].sort((a: TagWithPosts, b: TagWithPosts) => {
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
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post("/api/tags", {
        name: newTag.trim(),
      });

      if (response.status === 201) {
        setMessage("Type added successfully");
        setNewTag("");
        refetch();
        return;
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          // Zod validation errors - extract the message from the response
          // Zod returns an array of errors - get the first one's message
          if (Array.isArray(data) && data.length > 0) {
            const errorMessage = data[0]?.message || "Validation failed";
            setError(`${errorMessage}_${Date.now()}`);
          } else {
            setError(`Validation failed_${Date.now()}`);
          }
        } else if (status === 409) {
          // Duplicate error
          setError(`${data?.error || "Type already exists"}_${Date.now()}`);
        } else {
          // Other errors
          setError(
            `${data?.error || "An unexpected error occurred"}_${Date.now()}`
          );
        }
      } else {
        // Network errors or other issues without a response
        setError(`Failed to add type: ${error.message}_${Date.now()}`);
      }
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/tags/${id}`);
    },
    onSuccess: () => {
      // Force refetch (bypasses cache)
      queryClient.refetchQueries({ queryKey: ["tags"] });
      setMessage("Type deleted successfully");
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
        <h1 className="text-2xl">Types</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter a new type"
              value={newTag}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setNewTag(e.target.value)}
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
            {sortedTags.map((tag: TagWithPosts) => (
              <Badge
                type="tags"
                name={tag.name}
                key={tag.id}
                postCount={tag.posts.length}
                id={tag.id}
                onDelete={(id, onComplete) => {
                  deleteMutation.mutate(id, {
                    onSuccess: () => {
                      queryClient.refetchQueries({ queryKey: ["tags"] });
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

export default AdminTagsPage;
