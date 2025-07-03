import { useUserStore } from "@/app/stores/useUserStore";
import { List, Post } from "@prisma/client";
import { useRouter } from "next/navigation"; // Import useRouter
import React, { useState, useEffect } from "react";

type ListWithPosts = List & { posts: Post[] };

const ToggleSave = ({
  resourceId,
  onSave,
  onRemove,
}: {
  resourceId: string;
  onSave: (listId: string, listName: string) => void;
  onRemove: (listId: string, listName: string) => void;
}) => {
  const [selectedListId, setSelectedListId] = useState("");
  const [selectedListName, setSelectedListName] = useState("");
  const router = useRouter();

  // Create unique modal ID for this component instance
  const modalId = `save_to_list_modal_${resourceId}`;

  const user = useUserStore((state) => state.user);
  const isPostSaved = useUserStore((state) => state.isPostSaved);
  const getListThatSavedPost = useUserStore(
    (state) => state.getListThatSavedPost
  );

  // Get saved status and the list it's saved in
  const hasSaved = isPostSaved(resourceId);
  const savedList = getListThatSavedPost(resourceId);
  const lists = user?.lists || [];

  useEffect(() => {
    if (lists.length === 1 && user) {
      setSelectedListId(lists[0].id);
      setSelectedListName(lists[0].name);
    }
  }, [lists, user]);

  const handleConfirmSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      "Confirming save for resource:",
      resourceId,
      "to list:",
      selectedListId
    );
    try {
      onSave(selectedListId, selectedListName); // call backend
      (document.getElementById(modalId) as HTMLDialogElement).close();
      setSelectedListId("");
      setSelectedListName("");
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleCreateAndSave = () => {
    router.push("/user/list");
  };

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up to parent Link
    console.log(
      "ToggleSave clicked for resource:",
      resourceId,
      "hasSaved:",
      hasSaved
    );
    try {
      if (hasSaved && savedList) {
        // call backend to remove the post from the list
        console.log("Removing from list:", savedList.id);
        onRemove(savedList.id, savedList.name);
      } else {
        // Set default selection if there's only one list
        if (lists.length === 1) {
          setSelectedListId(lists[0].id);
          setSelectedListName(lists[0].name);
        }
        // open the modal
        console.log("Opening save modal");
        (document.getElementById(modalId) as HTMLDialogElement).showModal();
      }
      console.log("current status: ", !hasSaved);
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedList = lists.find((list) => list.id === e.target.value);
    setSelectedListId(e.target.value);
    setSelectedListName(selectedList?.name || "");
  };

  return (
    <div className="flex flex-start items-center">
      <div className="flex flex-start items-center gap-2">
        <div className="rating rating-sm md:rating-md gap-1">
          <input
            type="radio"
            name="rating-2"
            className={`mask mask-star-2 ${
              hasSaved ? "bg-green-500" : "bg-green-200"
            }`}
            checked={hasSaved}
            onClick={handleToggleSave}
          />
        </div>
        <span className="inline-block w-12 text-center">
          {hasSaved ? "Saved" : "Save"}
        </span>
      </div>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="form-control">
            {lists.length === 0 ? (
              <>
                <p className="text-center mb-4">
                  You don&apos;t have any list yet.
                </p>
                <button
                  className="btn btn-primary mt-4"
                  type="submit"
                  onClick={handleCreateAndSave}
                >
                  Create a List
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-6">
                <h3 className="font-bold text-lg">
                  Save to: {selectedListName}
                </h3>
                <div>
                  {lists.map((list) => (
                    <label className="label cursor-pointer" key={list.id}>
                      <span className="label-text">{list.name}</span>
                      <input
                        type="radio"
                        name="list"
                        className="radio radio-primary"
                        value={list.id}
                        onChange={handleChange}
                        checked={selectedListId === list.id}
                      />
                    </label>
                  ))}
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleConfirmSave}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ToggleSave;
