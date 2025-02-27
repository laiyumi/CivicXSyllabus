import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { List } from "@prisma/client";

const SaveToListModal = ({ onSave }: { onSave: (listId: string) => void }) => {
  // get the lists of the user
  const [lists, setLists] = useState<List[]>([]);
  const { data: session } = useSession();
  const [selectedListId, setSelectedListId] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      const response = await axios.get(`/api/users/${session?.user.id}/lists`);
      setLists(response.data);
    };
    fetchLists();
  }, [session?.user.id]);

  const handleConfirm = () => {
    onSave(selectedListId);
    setSelectedListId("");
    (
      document.getElementById("save_to_list_modal") as HTMLDialogElement
    ).close();
  };

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
          <h3 className="font-bold text-lg pb-8">Save to: {selectedListId}</h3>
          <div className="form-control">
            {lists.map((list) => (
              <label className="label cursor-pointer" key={list.id}>
                <span className="label-text">{list.name}</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  value={list.id}
                  // checked={selectedListId === list.id}
                  onChange={(e) => setSelectedListId(e.target.value)}
                />
              </label>
            ))}
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SaveToListModal;
