import React from "react";
import AdminDashboardNavBar from "./NavBar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex my-10">
      <AdminDashboardNavBar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
