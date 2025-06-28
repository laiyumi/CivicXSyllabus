"use client";

import Spinner from "@/app/components/Spinner";
import { useUserStore } from "@/app/stores/useUserStore";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useNotifications } from "../../contexts/NotificationContext";
import CreateListModal from "./CreateListModal";
import { exportListToPDF, generatePDFBlob } from "@/app/utils/pdfExport";
import PDFPreviewModal from "../../components/PDFPreviewModal";

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
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [selectedListId, setSelectedListId] = useState<string>("");

  const user = useUserStore((state) => state.user);
  const list = useUserStore((state) => {
    if (!selectedListId || !state.user) return null;
    return state.user.lists.find((l) => l.id === selectedListId);
  });

  const removePostFromList = useUserStore((state) => state.removePostFromList);

  // Use selectedList instead of list throughout your component
  const posts = list?.posts || [];

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
    } else if (user?.lists && user.lists.length > 0 && !selectedListId) {
      // If no list is selected from URL and user has lists, select the first one
      const firstListId = user.lists[0].id;
      setSelectedListId(firstListId);
      updateUrlWithSelectedList(firstListId);
    }
  }, [searchParams.toString(), user?.lists, selectedListId]);

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

  // Generate share URL for the current list
  const generateShareUrl = () => {
    if (!selectedListId || !list) return "";

    const baseUrl = window.location.origin;
    return `${baseUrl}/shared/list/${selectedListId}`;
  };

  // Handle share button click
  const handleShareClick = () => {
    if (!selectedListId || !list) {
      showNotification("Please select a list first", "error");
      return;
    }

    const url = generateShareUrl();
    setShareUrl(url);
    setShowShareModal(true);
  };

  // Copy share URL to clipboard
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showNotification("Share link copied to clipboard!", "success");
    } catch (error) {
      console.error("Failed to copy URL:", error);
      showNotification("Failed to copy link", "error");
    }
  };

  // Preview PDF before downloading
  const handlePreviewPDF = async () => {
    if (!list || !posts.length) {
      showNotification("No content to export", "error");
      return;
    }

    try {
      const baseUrl = window.location.origin;

      // Create PDF content with resource URLs
      const pdfData = {
        title: list.name,
        resources: posts.map((post) => ({
          title: post.title,
          excerpt: post.excerpt,
          categories: post.categories.map((cat) => cat.name).join(", "),
          tags: post.tags.map((tag) => tag.name).join(", "),
          year: post.year,
          url: `${baseUrl}/resources/${post.id}`,
        })),
        createdBy: user?.name || user?.email || "Unknown",
      };

      console.log("Generating PDF preview with data:", pdfData);
      const blobUrl = await generatePDFBlob(pdfData);

      // Create filename for display
      const sanitizedTitle = list.name
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      const sanitizedCreator = (user?.name || user?.email || "Unknown")
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      const fileName = `${sanitizedTitle}_${sanitizedCreator}_resources.pdf`;

      setPdfPreviewUrl(blobUrl);
      setPdfFileName(fileName);
      setShowPDFPreview(true);
    } catch (error) {
      console.error("Failed to generate PDF preview:", error);
      showNotification(
        `Failed to generate PDF preview: ${error instanceof Error ? error.message : "Unknown error"}`,
        "error"
      );
    }
  };

  // Download PDF (called from preview modal)
  const handleDownloadPDF = async () => {
    if (!list || !posts.length) {
      showNotification("No content to export", "error");
      return;
    }

    try {
      const baseUrl = window.location.origin;

      // Create PDF content with resource URLs
      const pdfData = {
        title: list.name,
        resources: posts.map((post) => ({
          title: post.title,
          excerpt: post.excerpt,
          categories: post.categories.map((cat) => cat.name).join(", "),
          tags: post.tags.map((tag) => tag.name).join(", "),
          year: post.year,
          url: `${baseUrl}/resources/${post.id}`,
        })),
        createdBy: user?.name || user?.email || "Unknown",
      };

      await exportListToPDF(pdfData);
      setShowPDFPreview(false);
    } catch (error) {
      console.error("Failed to export PDF:", error);
      showNotification(
        `Failed to export list to PDF: ${error instanceof Error ? error.message : "Unknown error"}`,
        "error"
      );
    }
  };

  // Close PDF preview and clean up blob URL
  const handleClosePDFPreview = () => {
    setShowPDFPreview(false);
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }
  };

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
      if (response.status === 201) {
        removePostFromList(listId, postId);
      }

      setMessage(`Removed from the ${list?.name}`);
      // console.log(`Post ${postId} removed from list ${listId}`);
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
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      clearAllNotifications();
      showNotification(message, "success");
      // Clear the message state after showing notification
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // While loading
  if (user === undefined) {
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
                {posts.length} resource saved
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

          {/* Share List Button - only show when a list is selected */}
          {selectedListId && list && (
            <button
              className="btn btn-outline btn-primary"
              onClick={handleShareClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0-3.933-2.185 2.25 2.25 0 0 0 3.933 2.185Z"
                />
              </svg>
              Share List
            </button>
          )}

          {/* Create a list */}
          <CreateListModal onCreateList={handleCreateList} />
        </div>
        <div className="divider"></div>

        {/* View Toggle Buttons - only show when a list is selected */}
        {selectedListId && list && (
          <div className="flex justify-center gap-2">
            <button
              className={`btn btn-sm ${viewMode === "grid" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setViewMode("grid")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
              Grid
            </button>
            <button
              className={`btn btn-sm ${viewMode === "list" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setViewMode("list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 17.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              List
            </button>
          </div>
        )}

        {/* Display selected list */}
        {viewMode === "grid" ? (
          <div className="grid grid-flow-row-dense grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="card bg-base-100 shadow-xl col-span-1"
              >
                <figure className="w-full h-[300px] relative md:h-[250px] xs: h-[200px]">
                  <img
                    src={post.imageUrl}
                    className="w-full h-full object-cover"
                  />
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
                      <span
                        key={category.id}
                        className="badge badge-secondary whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <h2 className="card-title">{post.title}</h2>
                  <p className="text-sm">{post.excerpt}</p>
                  <div className="flex gap-3 mt-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="badge badge-outline whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        {tag.name}
                      </span>
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
        ) : (
          // List View
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Resource</th>
                  <th>Topics</th>
                  <th>Type</th>
                  <th>Year</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="rounded-xl h-12 w-12">
                            <img src={post.imageUrl} alt={post.title} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-md">{post.title}</div>
                          <div className="text-sm opacity-50 line-clamp-2">
                            {post.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {post.categories.map((category) => (
                          <span
                            key={category.id}
                            className="badge badge-secondary whitespace-nowrap overflow-hidden text-ellipsis"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="badge badge-outline whitespace-nowrap overflow-hidden text-ellipsis"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{post.year}</td>
                    <th>
                      <div className="flex gap-2">
                        <Link
                          href={`/resources/${post.id}`}
                          className="btn btn-ghost"
                        >
                          View
                        </Link>
                        <button
                          className="btn btn-ghost text-error"
                          onClick={() =>
                            handlePostRemove(post.id, selectedListId)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
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
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th>Resource</th>
                  <th>Topics</th>
                  <th>Type</th>
                  <th>Year</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Share List: {list?.name}</h3>
              <button
                className="btn btn-ghost rounded-full"
                onClick={() => setShowShareModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Share Link</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="input input-bordered flex-1"
                    placeholder="Share URL will appear here..."
                  />
                  <button className="btn btn-primary" onClick={handleCopyUrl}>
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-outline flex-1"
                  onClick={handlePreviewPDF}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {/* PDF Preview Modal */}
      <PDFPreviewModal
        isOpen={showPDFPreview}
        onClose={handleClosePDFPreview}
        pdfUrl={pdfPreviewUrl}
        fileName={pdfFileName}
        onDownload={handleDownloadPDF}
      />
    </>
  );
};

export default UserSavedResourcesPage;
