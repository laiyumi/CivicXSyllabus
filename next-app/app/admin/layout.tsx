import React from "react";
import AdminDashboardNavBar from "./NavBar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <AdminDashboardNavBar />

      <div className="w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
