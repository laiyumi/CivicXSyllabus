import React from "react";
import AdminDashboardNavBar from "../../NavBar";
import Link from "next/link";
import ResourceForm from "../components/ResourceForm";

const AdminCreateResourcePage = () => {
  return (
    <div className="flex">
      <AdminDashboardNavBar />
      <div className="w-full">
        <ResourceForm />
      </div>
    </div>
  );
};

export default AdminCreateResourcePage;
