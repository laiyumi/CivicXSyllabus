"use client";

import SearchBarWithoutBtn from "@/app/components/SearchBarWithoutBtn";
import Spinner from "@/app/components/Spinner";
import { Prisma } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import ResourcesTable from "./ResourcesTable";

type PostWithSource = Prisma.PostGetPayload<{
  include: { source: true; lists: true };
}>;

type SortOrder = "desc" | "asc";

const AdminResourcesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState<PostWithSource[]>([]);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/resources`);
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleResourceUpdate = (
    resourceId: string,
    newPublishedStatus: boolean
  ) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === resourceId
          ? { ...resource, published: newPublishedStatus }
          : resource
      )
    );
  };
  const sortedResources = [...resources].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case "title":
        aValue = a.title;
        bValue = b.title;
        break;
      case "source":
        aValue = a.source.name;
        bValue = b.source.name;
        break;
      case "published":
        aValue = a.published;
        bValue = b.published;
        break;
      case "likes":
        aValue = a.likes;
        bValue = b.likes;
        break;
      case "saves":
        aValue = a.lists?.length || 0;
        bValue = b.lists?.length || 0;
        break;
      default:
        return 0;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      return sortOrder === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const filteredResources = sortedResources.filter((resource) => {
    const titleMatch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const sourceMatch = resource.source.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || sourceMatch;
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Resources</h1>
        <div className="flex gap-4">
          <p>
            <span className="font-bold">Total:</span>{" "}
            <span className="badge badge-primary">{resources.length}</span>
          </p>
          <p>
            <span className="font-bold">Published:</span>{" "}
            <span className="badge badge-primary">
              {resources.filter((resource) => resource.published).length}
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-between pb-5">
        <Link className="btn btn-primary" href="/admin/resources/new">
          Create New Resource
        </Link>
        {/* search bar */}
        <div className="w-1/3">
          <SearchBarWithoutBtn value={searchQuery} onChange={handleSearch} />{" "}
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <ResourcesTable
          resources={filteredResources}
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          onResourceUpdate={handleResourceUpdate}
        />
      )}
    </div>
  );
};

export default AdminResourcesPage;
