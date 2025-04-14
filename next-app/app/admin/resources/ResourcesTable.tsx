"use client";

import { Prisma } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type PostWithSource = Prisma.PostGetPayload<{
  include: { source: true; lists: true };
}>;

const ResourcesTable = ({
  resources,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
  onResourceUpdate,
}: {
  resources: PostWithSource[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  setSortBy: (field: string) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  onResourceUpdate: (resourceId: string, newPublishedStatus: boolean) => void;
}) => {
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // handle publish toggle
  const handlePublish = async (id: string, published: boolean) => {
    try {
      if (published) {
        await axios.put(`/api/resources/${id}/unPublished`);
        onResourceUpdate(id, false);
      } else {
        await axios.put(`/api/resources/${id}/isPublished`);
        onResourceUpdate(id, true);
      }
    } catch (error) {
      console.error("Error occurs on toggling publish status:", error);
    }
  };

  const getSortIcon = (key: string) => {
    if (sortBy !== key)
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="xs:w-3 xs:h-3 lg:w-4 lg:h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          />
        </svg>
      );
    return sortOrder === "asc" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-3 h-3 lg:w-4 lg:h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-3 h-3 lg:w-4 lg:h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        />
      </svg>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-pin-rows ">
        {/* head */}
        <thead>
          <tr>
            <th
              className="w-3/10 cursor-pointer"
              onClick={() => handleSort("title")}
            >
              <span className="inline-flex items-center gap-1">
                Title {getSortIcon("title")}
              </span>
            </th>{" "}
            <th
              className="w-2/10 cursor-pointer"
              onClick={() => handleSort("source")}
            >
              <span className="inline-flex items-center gap-1">
                Source {getSortIcon("source")}
              </span>
            </th>
            <th className="w-1/10" onClick={() => handleSort("published")}>
              <span className="inline-flex items-center gap-1">
                Published {getSortIcon("published")}
              </span>
            </th>
            <th
              className="w-1/10 cursor-pointer"
              onClick={() => handleSort("likes")}
            >
              <span className="inline-flex items-center gap-1">
                # Likes {getSortIcon("likes")}
              </span>
            </th>{" "}
            <th
              className="w-1/10 cursor-pointer"
              onClick={() => handleSort("saves")}
            >
              <span className="inline-flex items-center gap-1">
                # Save {getSortIcon("saves")}
              </span>
            </th>{" "}
            <th className="w-1/10"></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-square h-12 w-12">
                      <img src={resource.imageUrl} alt="post thumbnail" />
                    </div>
                  </div>
                  <div className="font-bold">{resource.title}</div>
                </div>
              </td>
              <td> {resource.source.name}</td>
              <td>
                <div
                  onClick={() => handlePublish(resource.id, resource.published)}
                >
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={resource.published}
                    readOnly
                  />
                </div>
              </td>
              <td>{resource.likes}</td>
              <td>{resource.lists?.length || 0}</td>
              <td className="flex gap-2">
                <Link
                  href={`/admin/resources/${resource.id}`}
                  className="btn btn-outline btn-sm"
                >
                  View
                </Link>
                <Link
                  href={`/admin/resources/${resource.id}/edit`}
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
