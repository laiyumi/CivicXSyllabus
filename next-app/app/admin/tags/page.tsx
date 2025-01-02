"use client";
import Badge from "@/app/components/Badge";
import { Tag } from "@prisma/client";
import axios from "axios";
import React, { useState, useEffect } from "react";

const AdminTagsPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState(null);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      const response = await axios.get("/api/tags");
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
        <div className="flex gap-6 flex-wrap">
          {tags.map((tag: Tag) => (
            <Badge name={tag.name} key={tag.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTagsPage;
