"use client";
import Badge from "@/app/components/Badge";
import { Tag, Post } from "@prisma/client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTags } from "@/app/hooks/useTags";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/app/components/Spinner";

interface TagWithPosts extends Tag {
  posts: Post[];
}

const AdminTagsPage = () => {
  const queryClient = useQueryClient();
  const { data: tags = [], isLoading, error, refetch } = useTags();
  const [newTag, setNewTag] = useState("");

  const handleAdd = async () => {
    // Bypass the CDN cache
    const response = await axios.post(`/api/tags?ts=${Date.now()}`, {
      name: newTag,
    });
    setNewTag("");
    refetch();
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/tags/${id}`);
    },
    onSuccess: () => {
      // Force refetch (bypasses cache)
      queryClient.refetchQueries({ queryKey: ["tags"] });
    },
  });

  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl">Tags</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter a new tag"
            value={newTag}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setNewTag(e.target.value)}
          />{" "}
          <button className="btn btn-primary ml-2d" onClick={handleAdd}>
            Add
          </button>
        </div>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="grid gap-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tags.map((tag: TagWithPosts) => (
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
