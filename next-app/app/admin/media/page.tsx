import Link from "next/link";
import React from "react";
import AdminDashboardNavBar from "../NavBar";
import prisma from "../../../prisma/client";
import Image from "next/image";

const AdminMediaPage = async () => {
  const resources = await prisma.post.findMany();

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl">Medias</h1>
      <div className="flex flex-wrap gap-4 ">
        {resources.map((resource) => (
          <div className="h-full w-[200px]" key={resource.id}>
            <Image
              src={resource.imageUrl}
              alt="post thumbnail"
              className="object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMediaPage;
