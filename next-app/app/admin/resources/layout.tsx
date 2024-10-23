import React from "react";

interface Props {
  children: React.ReactNode;
}

const AdminResourcesLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AdminResourcesLayout;
