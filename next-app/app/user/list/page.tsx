"use client";

import Spinner from "@/app/components/Spinner";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useNotifications } from "../../contexts/NotificationContext";
import CreateListModal from "./CreateListModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/app/stores/useUserStore";
import { use } from "chai";
import { set } from "date-fns";

type User = Prisma.UserGetPayload<{
  include: {
    lists: {
      include: {
        _count: {
          select: { posts: true };
        };
      };
    };
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const { showNotification, clearAllNotifications } = useNotifications();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const user = useUserStore((state) => state.user);

  const [loading, setLoading] = useState<boolean>(true);

  const [selectedListId, setSelectedListId] = useState<string>("");
  const list = useUserStore((state) =>
    state.user?.lists.find((l) => l.id === selectedListId)
  );

  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [editedListName, setEditedListName] = useState<string>("");

  const { data: session, status } = useSession();

  // Function to manually close the dropdown
  const closeDropdown = () => {
    // only close if not in editing mode
    if (!editingListId) {
      if (dropdownButtonRef.current) {
        // blur the dropdown trigger to close it
        dropdownButtonRef.current.blur();
      }
      setDropdownOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If dropdown ref exists and click is outside of it
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // If we're in editing mode, exit it
        if (editingListId) {
          setEditingListId(null);
          setEditedListName("");
        }
        // Always close the dropdown when clicking outside
        closeDropdown();
      }
    };

    // Add listener for mousedown events (will catch clicks outside)
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingListId]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Check for list ID in URL on initial load
  useEffect(() => {
    const listIdFromUrl = searchParams.get("list");
    if (listIdFromUrl) {
      setSelectedListId(listIdFromUrl);
    }
  }, [searchParams]);

  const updateUrlWithSelectedList = (listId: string) => {
    // Create new URL with the list parameter
    const params = new URLSearchParams(searchParams.toString());

    if (listId) {
      params.set("list", listId);
    } else {
      params.delete("list");
    }

    // Update URL without reloading the page
    const url = `${window.location.pathname}?${params.toString()}`;
    router.push(url, { scroll: false });
  };

  // Select a list and close the dropdown
  const handleSelectList = (listId: string) => {
    // Exit any edit mode first
    setEditingListId(null);
    setSelectedListId(listId);
    updateUrlWithSelectedList(listId);

    // Immediately close the dropdown without delay
    setDropdownOpen(false);
    if (dropdownButtonRef.current) {
      dropdownButtonRef.current.blur();
    }
  };

  // fetch user lists data
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      console.error("No session found");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${session!.user.id}`);
        // set initial user lists state
        useUserStore.getState().setUser(response.data);
        console.log("Fetched user lists data:", response.data);
      } catch (error) {
        console.error("Error fetching user lists data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [session, status]);

  const handleCreateList = async (listName: string) => {
    if (!session?.user.id) {
      alert("You must be logged in to create a list");
      return;
    }
    try {
      const response = await axios.post(`/api/users/${session.user.id}/lists`, {
        name: listName,
      });
      const newList = response.data;
      useUserStore.getState().createList(newList);

      setMessage(`${listName} created successfully!`);
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

  // Function to start editing a list name
  const handleStartEdit = (
    listId: string,
    currentName: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation(); // Prevent click from closing dropdown
    e.preventDefault(); // Prevent other default actions

    setEditingListId(listId);
    setEditedListName(currentName);
  };

  // Function to cancel editing
  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setEditingListId(null);
    setEditedListName("");
  };

  // Function to save the edited list name
  const handleSaveEdit = async (listId: string) => {
    if (!session?.user.id) return;

    // Check if the new name is empty
    if (editedListName.trim() === "") {
      setError("List name cannot be empty");
      return;
    }

    // Check if the new name is different from the current name
    // Find the current list name to compare
    const currentList = user?.lists.find((list) => list.id === listId);
    const currentName = currentList?.name || "";

    // Check if the name hasn't changed
    if (editedListName.trim() === currentName.trim()) {
      setEditingListId(null);
      setError("List name hasn't changed");
      return;
    }

    // Check if the new name is too long
    if (editedListName.trim().length > 30) {
      setError("List name is too long (maximum 30 characters)");
      return;
    }

    try {
      // Update list name in the backend
      const response = await axios.put(
        `/api/users/${session.user.id}/lists/${listId}`,
        {
          name: editedListName,
        }
      );

      // Update the list name in the user state
      if (response.status === 200) {
        useUserStore.getState().renameList(listId, editedListName);
      }

      setEditingListId(null);
      setMessage("List name updated successfully!");
      setDropdownOpen(false); // Close dropdown
    } catch (error: any) {
      console.error("Error updating list name:", error);
      setError(
        error.response?.data?.error ||
          "Failed to update list name. Please try again."
      );
    }
  };

  const handlePostRemove = async (postId: string, listId: string) => {
    try {
      const response = await axios.delete(
        `/api/users/${session?.user.id}/lists/${listId}`,
        {
          data: { postId: postId },
        }
      );

      // Update the posts state by filtering out the removed post
      if (response.status === 200) {
        useUserStore.getState().removePostFromList(listId, postId);
      }

      setMessage(`Removed from the ${list?.name}`);
      console.log(`Post ${postId} removed from list ${listId}`);
    } catch (err: any) {
      console.error(err);
      setError("Failed to remove from the list.");
    }
  };

  const handleDeleteList = (
    listId: string,
    listName: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    e.preventDefault();

    // Show a confirmation dialog
    if (
      window.confirm(
        `Are you sure you want to delete the list "${listName}"? This action cannot be undone.`
      )
    ) {
      deleteList(listId);
      setMessage(`${listName} deleted successfully!`);
    }
  };

  const deleteList = async (listId: string) => {
    if (!session?.user.id) return;

    if (selectedListId === listId) {
      setSelectedListId("");
      updateUrlWithSelectedList(""); // Remove list from URL
    }

    try {
      const response = await axios.delete(
        `/api/users/${session.user.id}/lists/${listId}`,
        {
          data: {},
        }
      );

      // Update the user state by filtering out the deleted list
      if (response.status === 200) {
        useUserStore.getState().deleteList(listId);
      }
    } catch (error: any) {
      console.error("Error deleting list:", error);
      setError(
        error.response?.data?.error ||
          "Failed to delete list. Please try again."
      );
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
      <div className="flex flex-col gap-6 items-center">
        <div>
          <h1 className="text-2xl text-center font-normal">
            {selectedListId == "" ? "My Lists" : list?.name}
          </h1>
          <div className="text-l flex gap-2 items-center min-h-[24px]">
            {selectedListId !== "" && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20px"
                  className="text-red-600 fill-current"
                >
                  <path d="M23.3 5.076a6.582 6.582 0 0 0-10.446-1.71L12 4.147l-.827-.753a6.52 6.52 0 0 0-5.688-1.806A6.47 6.47 0 0 0 .7 5.075a6.4 6.4 0 0 0 1.21 7.469l9.373 9.656a1 1 0 0 0 1.434 0l9.36-9.638A6.41 6.41 0 0 0 23.3 5.076"></path>
                </svg>
                {list?.posts.length} resource saved
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-8 w-full items-center ">
          <div className="flex justify-center items-center gap-2">
            <div
              ref={dropdownRef}
              className={`dropdown ${isDropdownOpen || editingListId ? "dropdown-open" : ""}`}
            >
              <div
                ref={dropdownButtonRef}
                tabIndex={0}
                role="button"
                className="btn m-1 w-full max-w-xs"
                onClick={toggleDropdown}
              >
                {list?.name || "Select a list"}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72 z-50"
              >
                {user?.lists.map((listItem) => (
                  <li
                    key={listItem.id}
                    className="flex justify-between items-center"
                  >
                    {editingListId === listItem.id ? (
                      // Editing mode (layout matches normal mode)
                      <button
                        className="w-full flex justify-between items-center px-2 py-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex-grow">
                          <input
                            type="text"
                            value={editedListName}
                            onChange={(e) => setEditedListName(e.target.value)}
                            className="input input-bordered input-sm w-full"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button
                            className="btn btn-xs btn-ghost btn-square"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleSaveEdit(listItem.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6 p-0.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                          </button>
                          <button
                            className="btn btn-xs btn-ghost btn-square"
                            onClick={(e) => handleCancelEdit(e)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6 p-0.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </button>
                    ) : (
                      // Normal mode (not editing)
                      <button
                        onClick={() => handleSelectList(listItem.id)}
                        className="w-full flex justify-between items-center"
                      >
                        <div>
                          {listItem.name}
                          {"  "}
                          <span className="badge badge-primary badge-sm">
                            {listItem._count?.posts ?? 0}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-xs btn-square btn-ghost"
                            onClick={(e) => {
                              handleStartEdit(listItem.id, listItem.name, e);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6 p-0.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                          <button
                            className="btn btn-xs btn-square btn-ghost"
                            onClick={(e) => {
                              handleDeleteList(listItem.id, listItem.name, e);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6 p-0.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Create a list */}
          <CreateListModal onCreateList={handleCreateList} />
        </div>
        <div className="divider"></div>

        {/* Display selected list */}

        <div className="grid grid-flow-row-dense grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {list?.posts.map((post) => (
            <div
              key={post.id}
              className="card bg-base-100 shadow-xl col-span-1"
            >
              <figure className="w-full ">
                <img src={post.imageUrl} className="object-cover" />
                <button
                  className="btn btn-circle absolute top-5 right-5"
                  onClick={() => handlePostRemove(post.id, selectedListId)}
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
