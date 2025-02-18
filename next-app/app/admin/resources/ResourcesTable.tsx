"use client";
import React, { useState, useEffect } from "react";
import prisma from "../../../prisma/client";
import delay from "delay";
import Link from "next/link";
import axios from "axios";
import { Prisma, Post } from "@prisma/client";

type PostWithSource = Prisma.PostGetPayload<{
  include: { source: true };
}>;

const ResourcesTable = () => {
  const [resources, setResources] = useState<PostWithSource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await axios.get(`/api/resources`);
      setResources(response.data);
    };
    fetchResources();
  }, []);

  // handle publish toggle
  const handlePublish = async (id: string, published: boolean) => {
    try {
      if (published) {
        await axios.put(`/api/resources/${id}/unPublished`);
      } else {
        await axios.put(`/api/resources/${id}/isPublished`);
      }
    } catch (error) {
      console.error("Error occurs on toggling publish status:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-pin-rows ">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className="w-3/10">Title</th>
            <th className="w-2/10">Source</th>
            <th className="w-1/10">Published</th>
            <th className="w-3/10 hidden md:table-cell">Excerpt</th>
            {/* <th className="w-2/10 hidden md:table-cell">Link</th> */}
            <th className="w-1/10"></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {resources.map((resouce) => (
            <tr key={resouce.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-square h-12 w-12">
                      <img src={resouce.imageUrl} alt="post thumbnail" />
                    </div>
                  </div>
                  <div className="font-bold">{resouce.title}</div>
                </div>
              </td>
              <td> {resouce.source.name}</td>
              <td>
                <div
                  onClick={() => handlePublish(resouce.id, resouce.published)}
                >
                  <input
                    type="checkbox"
                    className="toggle"
                    defaultChecked={resouce.published}
                  />
                </div>
              </td>
              <td className="hidden md:table-cell">{resouce.excerpt}</td>
              <td className="flex gap-2">
                <Link
                  href={`/admin/resources/${resouce.id}`}
                  className="btn btn-outline btn-sm"
                >
                  View
                </Link>
                <Link
                  href={`/admin/resources/${resouce.id}/edit`}
                  className="btn btn-outline btn-sm"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourcesTable;
