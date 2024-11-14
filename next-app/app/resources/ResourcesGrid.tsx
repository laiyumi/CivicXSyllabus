"use client";

import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";
import prisma from "../../prisma/client";
import { Category, Tag, Post, Prisma } from "@prisma/client";
import Pagination from "../components/Pagination";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "zod";

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

const ResourcesGrid = ({
  selectedCategory,
  selectedTag,
  sortOrder,
  searchText,
  page,
}: {
  selectedCategory: string;
  selectedTag: string;
  sortOrder: string;
  searchText: string;
  page: string;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
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

  // fetch categories from endpoint
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await axios.get("/api/categories");
      setCategories(categoryResponse.data);
    };
    fetchCategories();
  }, []);

  // fetch tags from endpoint
  useEffect(() => {
    const fetchTags = async () => {
      const tagResponse = await axios.get("/api/tags");
      setTags(tagResponse.data);
    };
    fetchTags();
  }, []);

  const currentPage = parseInt(page) || 1;
  const pageSize = 6;
  const postCount = resourcesCopy.length;

  // check if the search category are valid
  const categoryNames = categories.map((category) => category.name);
  const passedCategory = categoryNames.includes(selectedCategory)
    ? selectedCategory
    : undefined;

  // check if the search tags are valid
  const tagNames = tags.map((tag: Tag) => tag.name);
  const passedTag = tagNames.includes(selectedTag) ? selectedTag : undefined;

  // filter resources based on the search criteria
  const filteredResources = resourcesCopy
    .filter((resource) => {
      if (
        passedCategory &&
        !resource.categories.some(
          (category) => category.name === passedCategory
        )
      ) {
        return false;
      }
      if (passedTag && !resource.tags.some((tag) => tag.name === passedTag)) {
        return false;
      }
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
    })
    .sort((a, b) => {
      if (sortOrder === "createdAt") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortOrder === "updatedAt") {
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      } else if (sortOrder === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    })
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // render
  return (
    <>
      <div className="grid grid-flow-row-dense grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
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
