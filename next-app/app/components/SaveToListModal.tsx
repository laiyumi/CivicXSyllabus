import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { List } from "@prisma/client";

const SaveToListModal = () => {
  // get the lists of the user
  const [lists, setLists] = useState<List[]>([]);
  const { data: session } = useSession();
  const [selectedList, setSelectedList] = useState<string | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
      const response = await axios.get(`/api/users/${session?.user.id}/lists`);
      setLists(response.data);
    };
    fetchLists();
  }, []);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document.getElementById("save_to_list_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        Save
      </button>
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
          <h3 className="font-bold text-lg pb-8">Save to: {selectedList}</h3>
          <div className="form-control">
            {lists.map((list) => (
              <label className="label cursor-pointer" key={list.id}>
                <span className="label-text">{list.name}</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  value={list.id}
                  checked={selectedList === list.id}
                  onChange={(e) => setSelectedList(e.target.value)}
                />
              </label>
            ))}
            <div className="flex gap-4 justify-between items-baseline py-4">
              <input
                type="text"
                placeholder="Create a new list"
                className="input input-bordered w-full"
                //   onChange={(e) => setListName(e.target.value)}
              />
              <button
                className="btn btn-outline"
                type="submit"
                //   onClick={handleCreate}
              >
                Create
              </button>
            </div>
            <button className="btn btn-primary">Confirm</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SaveToListModal;
