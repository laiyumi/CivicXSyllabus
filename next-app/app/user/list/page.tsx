"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CreateListModal from "./CreateListModal";
import { useSession } from "next-auth/react";
import axios, { all } from "axios";
import { Prisma } from "@prisma/client";
import Spinner from "@/app/components/Spinner";
import { useNotifications } from "../../contexts/NotificationContext";

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

type List = Prisma.ListGetPayload<{
  include: {
    posts: true;
  };
}>;

const UserSavedResourcesPage = () => {
  const { showNotification, clearAllNotifications } = useNotifications();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [list, setList] = useState<List>();
  const [selectedListId, setSelectedListId] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  const { data: session, status } = useSession();

  // fetch user data
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      console.error("No session found");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        // Fetch user data by email
        const response = await axios.get(`/api/users/${session!.user.id}`);
        setUser(response.data);
        console.log("Fetched user data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [session, status]);

  // fetch saved posts in the selected list
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts in the selected list
        const response = await axios.get(
          `/api/users/${session?.user.id}/lists/${selectedListId}`
        );
        console.log("Fetched posts in the selected list:", response.data);
        setList(response.data);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts in the selected list:", error);
      }
    };
    fetchPosts();
  }, [session?.user.id, selectedListId]);

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

      setMessage("List created successfully!");
      setError("");
    } catch (error: any) {
      console.error("Error creating list:", error);
      setError(
        error.response?.data?.error ||
          "Failed to create list. Please try again."
      );
      setMessage("");
    }
  };

  const handleRemove = async (postId: string, listId: string) => {
    try {
      const response = await axios.delete(
        `/api/users/${session?.user.id}/lists/${listId}`,
        {
          data: { postId: postId },
        }
      );

      // Update the posts state by filtering out the removed post
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      console.log(`Post ${postId} removed from list ${listId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to remove from the list.");
    }
  };

  // Show notifications when error or message changes
  useEffect(() => {
    if (error) {
      clearAllNotifications();
      showNotification(error, "error");
      // Clear the error state after showing notification
      setTimeout(() => setError(""), 3000);
    }
  }, [error, showNotification, clearAllNotifications]);

  useEffect(() => {
    if (message) {
      clearAllNotifications();
      showNotification(message, "success");
      // Clear the message state after showing notification
      setTimeout(() => setMessage(""), 3000);
    }
  }, [message, showNotification, clearAllNotifications]);

  // While loading
  if (loading) {
    return (
      <div className="flex justify-center items-center ">
        <Spinner />
      </div>
    );
  }

  // When the user is not found
  if (!user) {
    return <p>User not found. Please log in with a valid account.</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl text-center font-normal">My List</h1>
        <div className="flex justify-center gap-8 w-full items-center ">
          <select
            className="select select-primary w-full max-w-xs"
            onChange={(e) => setSelectedListId(e.target.value)}
          >
            <option disabled selected>
              Select a list
            </option>
            {user?.lists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
          <CreateListModal onCreateList={handleCreateList} />
        </div>
        <div className="divider"></div>
        <div className="flex flex-col justify-center items-center gap-2 ">
          <h2 className="text-2xl">{list?.name}</h2>
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
              <figure className="w-full ">
                <img src={post.imageUrl} className="object-cover" />
                <button
                  className="btn btn-circle absolute top-5 right-5"
                  onClick={() => handleRemove(post.id, selectedListId)}
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
                  <Link
                    href={`/resources/${post.id}`}
                    className="btn btn-sm btn-primary"
                  >
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
