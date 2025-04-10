"use client";

import { useState } from "react";

interface BadgeProps {
  name: string;
  postCount: number;
  id: string;
  type: "tags" | "categories";
  onDelete: (id: string, onComplete: () => void) => void;
}
const Badge = ({ type, name, postCount, id, onDelete }: BadgeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="badge bg-base-100 gap-3 py-1 h-auto">
        <span>{name}</span>
        <div className="badge badge-secondary badge-sm">{postCount}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => setIsDialogOpen(true)}
          className="inline-block h-4 w-4 stroke-current hover:bg-slate-100 hover:rounded-full hover:cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      {isDialogOpen && (
        <dialog
          id="delete_confirm_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-center">Confirm Delete</h3>
            <p className="py-4 text-center">
              Are you sure you want to delete this tag?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => {
                  onDelete(id, () => setIsDialogOpen(false));
                }}
              >
                Yes, Delete
              </button>
              <button className="btn" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Badge;
