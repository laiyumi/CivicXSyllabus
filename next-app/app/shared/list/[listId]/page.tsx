"use client";

import { Prisma } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "@/app/components/Spinner";

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

type ListWithPosts = Prisma.ListGetPayload<{
  include: {
    posts: {
      include: {
        categories: true;
        tags: true;
        source: true;
      };
    };
    user: {
      select: {
        name: true;
        email: true;
      };
    };
  };
}>;

const SharedListPage = () => {
  const params = useParams();
  const listId = params.listId as string;

  const [list, setList] = useState<ListWithPosts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedList = async () => {
      if (!listId) {
        setError("List ID is required");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/lists/${listId}/shared`);
        setList(response.data);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching shared list:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load shared list. It may be private or no longer available."
        );
        setLoading(false);
      }
    };

    fetchSharedList();
  }, [listId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error || !list) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-error mb-4">List Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || "This list is not available for public viewing."}
          </p>
          <Link href="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 flex justify-between place-items-end">
          <div className="flex flex-col algin-start">
            <h1 className="text-3xl font-bold">{list.name}</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                className="text-red-600 fill-current"
              >
                <path d="M23.3 5.076a6.582 6.582 0 0 0-10.446-1.71L12 4.147l-.827-.753a6.52 6.52 0 0 0-5.688-1.806A6.47 6.47 0 0 0 .7 5.075a6.4 6.4 0 0 0 1.21 7.469l9.373 9.656a1 1 0 0 0 1.434 0l9.36-9.638A6.41 6.41 0 0 0 23.3 5.076"></path>
              </svg>
              {list.posts.length} resource{list.posts.length !== 1 ? "s" : ""}
            </div>
          </div>
          <p className="text-gray-600">
            Created by{" "}
            <span className="font-semibold">
              {list.user.name || list.user.email}
            </span>
          </p>
        </div>

        {/* Resources Grid */}
        {list.posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">This list is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.posts.map((post) => (
              <div
                key={post.id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <figure className="w-full h-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.categories.map((category) => (
                      <div
                        key={category.id}
                        className="badge badge-secondary badge-sm"
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                  <h2 className="card-title text-lg">{post.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <div
                        key={tag.id}
                        className="badge badge-outline badge-sm"
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                  <div className="card-actions justify-between items-center mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      {post.year}
                    </div>
                    <Link
                      href={`/resources/${post.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-gray-500 mb-4">Want to create your own lists?</p>
          <Link href="/auth/signin" className="btn btn-outline btn-primary">
            Sign In to Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharedListPage;
