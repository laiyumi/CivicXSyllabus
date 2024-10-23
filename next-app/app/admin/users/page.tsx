import Link from "next/link";
import React from "react";

const AdminUsersPage = () => {
  return (
    <div className="flex">
      <aside className="flex flex-col bg-slate-200 p-5 mr-5 gap-5 h-auto">
        <Link href="/admin/resources" className=" hover:text-slate-500">
          Resources
        </Link>
        <Link href="/admin/users" className=" hover:text-slate-500">
          Users
        </Link>
        <Link href="/admin/media" className=" hover:text-slate-500">
          Media
        </Link>
      </aside>
      <div>Users page</div>
    </div>
  );
};

export default AdminUsersPage;
