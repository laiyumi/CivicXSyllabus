import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface CreateListModalProps {
  onCreateList: (listName: string) => void; // Callback prop to notify the parent
}

const CreateListModal = ({ onCreateList }: CreateListModalProps) => {
  const [listName, setListName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (!listName.trim()) {
      alert("List name cannot be empty");
      return;
    }

    onCreateList(listName); // Notify the parent
    setListName(""); // Reset the input field
    (
      document.getElementById("create_list_modal") as HTMLDialogElement
    )?.close(); // Close the modal
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document.getElementById("create_list_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        Create a List
      </button>
      <dialog
        id="create_list_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg pb-8">
            Create a list<span className="text-red-600"> *</span>
          </h3>
          <form className="flex flex-col ">
            <input
              type="text"
              placeholder="Enter the name of the list"
              className="input input-primary"
              onChange={(e) => setListName(e.target.value)}
              required
            />
            <button
              className="btn btn-primary mt-4"
              type="submit"
              onClick={handleSubmit}
            >
              Create
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreateListModal;
