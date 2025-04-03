"use client";

import { Category, Prisma, Tag } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useSearchParams } from "next/navigation";
import ResourceCard from "../components/ResourceCard/ResourceCard";

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

const ResourcesGrid = () => {
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState("");

  useEffect(() => {
    // get the search parameters from the URL
    const passedCategory = searchParams.get("category") || "";
    const passedTag = searchParams.get("tag") || "";
    const passedOrder = searchParams.get("order") || "title";
    const passedSearchText = searchParams.get("search") || "";
    const passedPage = searchParams.get("page") || "1";

    setSelectedCategory(passedCategory);
    setSelectedTag(passedTag);
    setSelectedOrder(passedOrder);
    setSearchText(passedSearchText);
    setPage(passedPage);
  }, [searchParams]);

  const [resources, setResources] = useState<PostWithRelations[]>([]);
  const [resourcesCopy, setResourcesCopy] = useState<PostWithRelations[]>([]);

  // fetch all resources from the endpoint
  useEffect(() => {
    const fetchResources = async () => {
      const resourceResponse = await axios.get("/api/resources?published=true");
      setResources(resourceResponse.data);
      setResourcesCopy(resourceResponse.data);
      setLoading(false);
    };
    fetchResources();
  }, []);

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  // fetch categories for filtering text
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await axios.get("/api/categories");
      setCategories(categoryResponse.data);
    };
    fetchCategories();
  }, []);

  // fetch tags for filtering text
  useEffect(() => {
    const fetchTags = async () => {
      const tagResponse = await axios.get("/api/tags");
      setTags(tagResponse.data);
    };
    fetchTags();
  }, []);

  const currentPage = parseInt(page) || 1;
  const pageSize = 9;

  // filter resources based on the filtering, search, and sorting inputs
  const filteredResources = resourcesCopy.filter((resource) => {
    // filter categories
    if (
      selectedCategory &&
      !resource.categories.some(
        (category) => category.name === selectedCategory
      )
    ) {
      return false;
    }
    // filter tags
    if (selectedTag && !resource.tags.some((tag) => tag.name === selectedTag)) {
      return false;
    }
    // filter search text
    if (
      searchText &&
      !(
        resource.title.toLowerCase().includes(searchText.toLowerCase()) ||
        resource.content.toLowerCase().includes(searchText.toLowerCase()) ||
        resource.excerpt.toLowerCase().includes(searchText.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });

  const paginatedResources = filteredResources
    .sort((a, b) => {
      if (selectedOrder === "title") {
        return a.title.localeCompare(b.title);
      } else if (selectedOrder === "OldestToNewest") {
        return a.year - b.year;
      } else if (selectedOrder === "NewestToOldest") {
        return b.year - a.year;
      } else if (selectedOrder === "createdAt") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (selectedOrder === "updatedAt") {
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      }
      return 0;
    })
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const postCount = filteredResources.length;

  console.log("Resource passed to ResourceCard: ", resources[0]);

  // render
  return (
    <div className="flex justify-center">
      {loading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : filteredResources.length === 0 ? (
        <p className="text-center" data-test="not-found-message">
          No results found for your search.
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-12 gap-10 xs:flex xs:flex-col xs:gap-5">
            {paginatedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          <div className="mt-16 mb-8 flex justify-center ">
            <Pagination
              itemCount={postCount}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesGrid;
