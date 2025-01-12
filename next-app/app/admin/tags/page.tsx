"use client";
import Badge from "@/app/components/Badge";
import { Tag, Post } from "@prisma/client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface TagWithPosts extends Tag {
  posts: Post[];
}

const AdminTagsPage = () => {
  const [tags, setTags] = useState<TagWithPosts[]>([]);
  const [error, setError] = useState(null);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      const response = await axios.get("/api/tags");
      console.log("fetching the tags data:" + response.data);
      setTags(response.data);
    };
    fetchTags();
  }, []);

  const handleAdd = async () => {
    const response = await axios.post("/api/tags", {
      name: newTag,
    });
    setTags([...tags, response.data]);
    setNewTag("");
  };

  const handleDelete = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

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
        <div className="grid gap-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag: TagWithPosts) => (
            <Badge
              type="tags"
              name={tag.name}
              key={tag.id}
              postCount={tag.posts.length}
              id={tag.id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTagsPage;
