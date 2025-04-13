"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const AdminDashboardNavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links = [
    { label: "Dashboard", href: "/admin" },
    { label: "Resources", href: "/admin/resources" },
    { label: "Users", href: "/admin/users" },
    { label: "Topics", href: "/admin/categories" },
    { label: "Types", href: "/admin/tags" },
    { label: "Sources", href: "/admin/sources" },
    { label: "Media", href: "/admin/media" },
  ];

  return (
    <div className="flex h-full">
      <aside className="flex flex-col border-r-4 border-slate-300 p-5 mr-5 gap-5 h-full">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              link.href === currentPath
                ? "text-base-context font-bold"
                : "text-base-content"
            } hover:font-semibold transition-colors`}
          >
            {link.label}
          </Link>
        ))}
      </aside>
    </div>
  );
};

export default AdminDashboardNavBar;
