"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CreateListModal from "./CreateListModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Prisma, Category, Tag } from "@prisma/client";

type User = Prisma.UserGetPayload<{
  include: {
    lists: true;
  };
}>;

type Post = Prisma.PostGetPayload<{
  include: {
    categories: true;
    tags: true;
  };
}>;

const UserSavedResourcesPage = () => {
  const { data: session } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);

  const [selectedList, setSelectedList] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  // fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data by email
        const response = await axios.get(`/api/users/${session?.user.id}`);
        setUser(response.data);
        console.log("Fetched user data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // fetch posts in the selected list
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts in the selected list
        const response = await axios.get(
          `/api/users/${session?.user.id}/lists/${selectedList}`
        );
        console.log("Fetched posts in the selected list:", response.data);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts in the selected list:", error);
      }
    };
    fetchPosts();
  }, [selectedList]);

  const handleCreateList = async (listName: string) => {
    if (!session?.user.id) {
      alert("You must be logged in to create a list");
      return;
    }

    try {
      const response = await axios.post(`/api/users/${session.user.id}/lists`, {
        name: listName,
      });

      // Add the newly created list to the user state
      setUser((prevUser) =>
        prevUser
          ? {
              ...prevUser,
              lists: [...prevUser.lists, response.data],
            }
          : null
      );

      setIsCreated(true);
    } catch (error) {
      console.error("Error creating list:", error);
      alert("Failed to create list. Please try again.");
    }
  };

  useEffect(() => {
    if (isCreated) {
      setShowAlert(true);
      setTimeout(() => {
        const alertElement = document.querySelector(".alert");
        alertElement?.classList.add("opacity-0");
      }, 5000);
    }
  }, [isCreated]);

  // While loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // When the user is not found
  if (!user) {
    return <p>User not found. Please log in with a valid account.</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        {/* <h2 className="text-2xl">My List</h2> */}
        {showAlert && (
          <div
            role="alert"
            className="alert alert-success absolute w-1/2 top-10 opacity-100 transition-opacity duration-3000"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>List created successfully!</span>
          </div>
        )}
        <div className="flex justify-center gap-8 w-full items-center ">
          <select
            className="select select-primary w-full max-w-xs"
            onChange={(e) => setSelectedList(e.target.value)}
          >
            {user.lists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
          {/* <button className="btn btn-primary">Share the list</button> */}
          <CreateListModal onCreateList={handleCreateList} />
        </div>
        <div className="divider"></div>
        <div className="flex flex-col justify-center items-center gap-2 ">
          <h2 className="text-2xl">{selectedList}</h2>
          <div className="text-l flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20px"
              className="text-red-600 fill-current"
            >
              <path d="M23.3 5.076a6.582 6.582 0 0 0-10.446-1.71L12 4.147l-.827-.753a6.52 6.52 0 0 0-5.688-1.806A6.47 6.47 0 0 0 .7 5.075a6.4 6.4 0 0 0 1.21 7.469l9.373 9.656a1 1 0 0 0 1.434 0l9.36-9.638A6.41 6.41 0 0 0 23.3 5.076"></path>
            </svg>{" "}
            {posts?.length} resource saved
          </div>
        </div>

        <div className="grid grid-flow-row-dense grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <div
              key={post.id}
              className="card bg-base-100 shadow-xl col-span-1"
            >
              <figure className="w-full h-[300px]">
                <img src={post.imageUrl} className="object-cover" />
                <button
                  className="btn btn-circle absolute top-5 right-5"
                  onClick={() => alert("Remove from the list.")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </figure>
              <div className="card-body">
                <div className="flex flex-wrap gap-3">
                  {post.categories.map((category) => (
                    <div key={category.id} className="badge badge-secondary">
                      {category.name}
                    </div>
                  ))}
                </div>
                <h2 className="card-title">{post.title}</h2>
                <p className="text-sm">{post.excerpt}</p>
                <div className="flex gap-3 mt-1">
                  {post.tags.map((tag) => (
                    <div key={tag.id} className="badge badge-outline">
                      {tag.name}
                    </div>
                  ))}
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link href="/" className="btn btn-sm btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserSavedResourcesPage;
