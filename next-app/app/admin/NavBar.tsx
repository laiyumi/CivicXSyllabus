"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const AdminDashboardNavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links = [
    { label: "Resources", href: "/admin/resources" },
    { label: "Users", href: "/admin/users" },
    { label: "Media", href: "/admin/media" },
  ];

  return (
    <div className="flex">
      <aside className="flex flex-col bg-slate-200 p-5 mr-5 gap-5 h-auto">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              link.href === currentPath ? "text-slate-900" : "text-slate-500"
            } hover:text-slate-800 transition-colors`}
          >
            {link.label}
          </Link>
        ))}
      </aside>
    </div>
  );
};

export default AdminDashboardNavBar;
