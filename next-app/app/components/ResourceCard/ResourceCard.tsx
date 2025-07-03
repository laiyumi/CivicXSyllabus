import { Category, Prisma, Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import ToggleLikes from "../ToggleLikes";
import { useSession } from "next-auth/react";
import ToggleSave from "../ToggleSave";
import { useUserStore } from "@/app/stores/useUserStore";
import { useNotifications } from "@/app/contexts/NotificationContext";

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

const ResourceCard = ({ resource }: { resource: PostWithRelations }) => {
  const { data: session, status } = useSession();

  const addPostToList = useUserStore((state) => state.addPostToList);
  const removePostFromList = useUserStore((state) => state.removePostFromList);

  const { showNotification, clearAllNotifications } = useNotifications();
  const [message, setMessage] = useState<React.ReactNode>("");
  const [error, setError] = useState("");

  const handleSave = async (listId: string, listName: string) => {
    console.log(
      "handleSave called with listId:",
      listId,
      "listName:",
      listName
    );
    if (status != "authenticated") {
      alert("You need to be logged in to save resources");
      return;
    }

    try {
      // the API returns the updated list with the post added
      const response = await axios.post(
        `/api/users/${session?.user.id}/lists/${listId}`,
        {
          postId: resource.id,
        }
      );
      console.log("Save API response:", response);
      if (response.status === 201) {
        // update the user store
        addPostToList(listId, resource as PostWithRelations);
        console.log("Added to store, showing notification");

        setMessage(
          <span>
            Resource saved to{" "}
            <Link
              href={`/user/list?list=${listId}`}
              className="link link-primary underline"
            >
              {listName}
            </Link>
          </span>
        );
        return;
      }
    } catch (error: any) {
      console.error("Error saving resource:", error);
      setError(error.response?.data?.message || "Failed to save resource");
    }
  };

  const handleRemove = async (listId: string, listName: string) => {
    if (status !== "authenticated") {
      alert("You need to be logged in to remove resources");
      return;
    }
    if (!listId) {
      console.error("List ID is missing");
      return;
    }

    try {
      const response = await axios.delete(
        `/api/users/${session?.user.id}/lists/${listId}`,
        {
          data: { postId: resource.id },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        // update the user store
        removePostFromList(listId, resource.id);
        setMessage(`Resource removed from ${listName}`);
        return;
      }
    } catch (err) {
      console.error(err);
      alert("Failed to remove from the list.");
    }
  };

  // Show notifications when error or message changes
  useEffect(() => {
    if (error) {
      clearAllNotifications();
      const actualErrorMessage = error.includes("_")
        ? error.split("_")[0]
        : error;
      showNotification(actualErrorMessage, "error");
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

  return (
    <Link
      href={`/resources/${resource.id}`}
      key={resource.id}
      className="
        card bg-base-100 shadow-xl
        col-span-full md:col-span-6 xl:col-span-4 
        hover:-translate-y-2 transition ease-in-out delay-100 duration-300 
        motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <figure className="w-full h-[300px] relative md:h-[250px] xs: h-[200px]">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={resource.imageUrl}
          alt={resource.title}
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          {resource.categories.map((category) => (
            <div
              key={category.name}
              className="badge badge-secondary badge-sm md:badge-md"
            >
              {category.name}
            </div>
          ))}
        </div>
        <h2 className="card-title">{resource.title}</h2>
        <p className="text-sm">{resource.excerpt}</p>
        <div className="flex flex-wrap gap-3 mt-1">
          {resource.tags.map((tag) => (
            <div
              key={tag.name}
              className="badge badge-outline badge-sm md:badge-md"
            >
              {tag.name}
            </div>
          ))}
        </div>
        <div className="card-actions justify-between mt-4 items-center">
          {session ? (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-center align-middle gap-2 rounded-md  md:p-3 p-2">
                <ToggleLikes resourceId={resource.id} />
                <div className="text-gray-500">|</div>
                <ToggleSave
                  onSave={(listId, listName) => handleSave(listId, listName)}
                  onRemove={(listId, listName) =>
                    handleRemove(listId, listName)
                  }
                  resourceId={resource.id}
                />
              </div>
            </div>
          ) : (
            <div onClick={(e) => e.stopPropagation()}>
              <ToggleLikes resourceId={resource.id} />
            </div>
          )}
          <div className="flex gap-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 xs:size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            {resource.year}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;
