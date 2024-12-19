import Link from "next/link";
import React from "react";
import AdminDashboardNavBar from "../NavBar";
import ResourcesTable from "./ResourcesTable";
import SearchBar from "@/app/components/SearchBar";

const AdminResourcesPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1>Resources</h1>
      <div className="flex justify-between pb-5">
        {/* <div className="w-1/3">
          <SearchBar />
        </div> */}
        <Link className="btn btn-primary" href="/admin/resources/new">
          Create New Resource
        </Link>
      </div>
      <ResourcesTable />
    </div>
  );
};

export default AdminResourcesPage;
