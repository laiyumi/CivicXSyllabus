import React, { useEffect } from "react";
import ResourceForm from "../../components/ResourceForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import AdminDashboardNavBar from "@/app/admin/NavBar";
import EditResourceForm from "../../components/EditResourceForm";
import axios from "axios";

interface Props {
  params: { id: string };
}

const EditResourcePage = async ({ params }: Props) => {
  const resource = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
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
      source: {
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
      <div className="w-full">
        <EditResourceForm resource={resource} />
      </div>
    </div>
  );
};

export default EditResourcePage;
