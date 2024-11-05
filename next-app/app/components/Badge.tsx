import React from "react";

interface BadgeProps {
  name: string;
}
const Badge = ({ name }: BadgeProps) => {
  return (
    <div className="badge bg-slate-200 gap-3 py-3">
      {name}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-4 w-4 stroke-current hover:bg-slate-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </div>
  );
};

export default Badge;
