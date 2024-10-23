import React from "react";
import AdminDashboardNavBar from "../../NavBar";
import Link from "next/link";
import NewResourceForm from "./NewResourceForm";

const AdminCreateResourcePage = () => {
  return (
    <div className="flex">
      <AdminDashboardNavBar />
      <div className="w-full">
        <NewResourceForm />
      </div>
    </div>
  );
};

export default AdminCreateResourcePage;
