"use client";

import { Category, Prisma, Tag } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useSearchParams } from "next/navigation";

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

const ResourcesGrid = () => {
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
    const passedOrder = searchParams.get("order") || "createdAt";
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
      const resourceResponse = await axios.get("/api/resources");
      setResources(resourceResponse.data);
      setResourcesCopy(resourceResponse.data);
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
  const pageSize = 6;

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
      if (selectedOrder === "createdAt") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (selectedOrder === "updatedAt") {
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      } else if (selectedOrder === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    })
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const postCount = filteredResources.length;

  // render
  return (
    <>
      <div className="grid grid-flow-row-dense grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {paginatedResources.map((resource) => (
          <div
            key={resource.id}
            className="card bg-base-100 shadow-xl col-span-1"
          >
            <figure className="w-full h-[300px]">
              <img
                className="object-cover"
                src={resource.imageUrl}
                alt={resource.title}
              />
            </figure>
            <div className="card-body">
              <div className="flex flex-wrap gap-3">
                {resource.categories.map((category) => (
                  <div key={category.name} className="badge badge-secondary">
                    {category.name}
                  </div>
                ))}
              </div>
              <h2 className="card-title">{resource.title}</h2>
              <p className="text-sm">{resource.excerpt}</p>
              <div className="flex gap-3 mt-1">
                {resource.tags.map((tag) => (
                  <div key={tag.name} className="badge badge-outline">
                    {tag.name}
                  </div>
                ))}
              </div>
              <div className="card-actions justify-end mt-4">
                <Link
                  href={`/resources/${resource.id}`}
                  className="btn btn-sm btn-primary"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 mb-8 flex justify-center">
        <Pagination
          itemCount={postCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default ResourcesGrid;
