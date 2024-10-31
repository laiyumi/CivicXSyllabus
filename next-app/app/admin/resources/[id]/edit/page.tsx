import React from "react";
import ResourceForm from "../../components/ResourceForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import AdminDashboardNavBar from "@/app/admin/NavBar";

interface Props {
  params: { id: string };
}

const EditResourcePage = async ({ params }: Props) => {
  const resource = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      source: {
        select: {
          name: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!resource) {
    notFound();
  }

  // console.log("-----: " + resource.categories.map((category) => category.id));
  console.log(resource);

  return (
    <div className="flex">
      <AdminDashboardNavBar />
      <div className="w-full">
        <ResourceForm resource={resource} />
      </div>
    </div>
  );
};

export default EditResourcePage;
