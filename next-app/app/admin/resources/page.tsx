import Link from "next/link";
import React from "react";

const AdminResourcesPage = () => {
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
            key={link.label}
            href={link.href}
            className=" hover:text-slate-500 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </aside>
      <div>Resources page</div>
    </div>
  );
};

export default AdminResourcesPage;
