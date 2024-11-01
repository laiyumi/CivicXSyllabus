import React from "react";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
