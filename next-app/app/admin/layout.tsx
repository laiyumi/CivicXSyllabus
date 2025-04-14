import React from "react";
import AdminDashboardNavBar from "./NavBar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex my-10 mx-10 h-screen">
      <div className="sticky top-0 h-full flex-shrink-0">
        <AdminDashboardNavBar />
      </div>
      <div className="w-full overflow-auto px-5">{children}</div>
    </div>
  );
};

export default AdminLayout;
