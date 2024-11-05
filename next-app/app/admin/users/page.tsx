import React from "react";
import AdminDashboardNavBar from "../NavBar";
import Link from "next/link";
import UsersTable from "./UsersTable";
import UploadImage from "@/app/upload/page";
import UserTable from "@/app/resources/UserTable";
import SearchBar from "@/app/components/SearchBar";

const AdminUsersPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1>Users</h1>
      <div className="flex justify-between pb-5">
        <div className="w-1/3">
          <SearchBar />
        </div>
      </div>
      <UsersTable />
    </div>
  );
};

export default AdminUsersPage;
