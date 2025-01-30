import { List, Post } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import React, { useEffect, useState } from "react";

type ListWithPosts = List & { posts: Post[] };

const ToggleSave = ({
  resourceId,
  onSave,
  onRemove,
}: {
  resourceId: string;
  onSave: (listId: string) => void;
  onRemove: (listId: string) => void;
}) => {
  const [hasSaved, setHasSaved] = useState<boolean>(false);

  const [lists, setLists] = useState<List[]>([]);
  const { data: session } = useSession();
  const [selectedListId, setSelectedListId] = useState("");
  const [selectedListName, setSelectedListName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!session?.user.id) return;

    // get all lists of the user
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          `/api/users/${session?.user.id}/lists`
        );
        setLists(response.data);

        // check if the post is already saved
        const isSaved = response.data.some((list: ListWithPosts) =>
          list.posts.some((post) => post.id === resourceId)
        );

        const listId = response.data.find((list: ListWithPosts) =>
          list.posts.some((post) => post.id === resourceId)
        )?.id;

        setSelectedListId(listId);
        // update the state
        setHasSaved(isSaved);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
    fetchLists();
  }, [session?.user.id, resourceId]);

  const handleConfirmSave = () => {
    try {
      onSave(selectedListId); // call backend
      setHasSaved((prev) => !prev);
      (
        document.getElementById("save_to_list_modal") as HTMLDialogElement
      ).close();
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleCreateAndSave = () => {
    // redirect to the create list page
    router.push("/user/list");
  };

  const handleToggleSave = async () => {
    try {
      if (hasSaved) {
        // call backend to remove the post from the list
        onRemove(selectedListId);
        setHasSaved((prev) => !prev);
      } else {
        // open the modal
        (
          document.getElementById("save_to_list_modal") as HTMLDialogElement
        ).showModal();
      }
      console.log("current status: ", !hasSaved);
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedListId(e.target.value);
    setSelectedListName(e.target.name);
  };

  return (
    <>
      <div className="rating gap-1" onClick={handleToggleSave}>
        <input
          type="radio"
          name="rating-2"
          className={`mask mask-star-2 ${
            hasSaved ? "bg-green-500" : "bg-green-200"
          }`}
          checked={hasSaved} // Add this line to conditionally set defaultChecked
        />
      </div>{" "}
      <span className="inline-block w-12 text-center">
        {hasSaved ? "Saved" : "Save"}
      </span>
      <dialog
        id="save_to_list_modal"
        className="modal modal-bottom sm:modal-middle"
      >
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
                        name={list.name}
                        className="radio checked:bg-red-500"
                        value={list.id}
                        onChange={handleChange}
                      />
                    </label>
                  ))}
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleConfirmSave}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ToggleSave;
