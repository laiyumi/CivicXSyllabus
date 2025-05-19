import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "date-fns";
import { signOut } from "next-auth/react";

interface DeleteListProps {
  userId: string;
  listId: string;
}

export const DeleteAccountButton = ({ userId, listId }: DeleteListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      await axios.delete(`/api/users/${userId}/lists/${listId}`, {
        data: {},
      });
      setIsDeleted(true);
      console.log("Delete list with id:", listId);
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        data-test="delete-account-button"
        onClick={() => setIsDialogOpen(true)}
        className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      >
        Delete my account
      </button>

      {isDialogOpen && (
        <dialog
          id="delete_account_modal"
          className="modal modal-bottom sm:modal-middle fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          open
        >
          <div className="modal-box relative bg-white p-6 rounded-lg shadow-lg">
            <form method="dialog">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            {!isDeleted ? (
              <>
                <h3 className="font-bold text-lg text-center">
                  Confirm Delete
                </h3>
                <p className="py-4 text-center">
                  Are you sure you want to delete your account? <br />
                  This action <strong className="text-red-600">
                    cannot
                  </strong>{" "}
                  be undone.
                </p>
                <div className="modal-action">
                  <button
                    data-test="confirm-delete-button"
                    className="btn btn-error"
                    onClick={handleDelete}
                  >
                    Yes, Delete my account
                  </button>
                  <button
                    className="btn"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <h3>Your account has been deleted.</h3>
            )}
          </div>
        </dialog>
      )}
    </>
  );
};
