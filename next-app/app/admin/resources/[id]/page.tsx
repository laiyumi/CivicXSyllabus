import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import AdminDashboardNavBar from "../../NavBar";

interface Props {
  params: { id: string };
}

const EditResourcePage = async ({ params }: Props) => {
  const resource = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!resource) {
    notFound();
  }

  return (
    <div className="flex">
      <AdminDashboardNavBar />
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Edit Resource
          </h2>
          <button className="btn btn-primary ">
            Save Changes
            {/* {isSubmitting && <Spinner />} */}
          </button>
        </div>
        <div>
          <p>{resource.title}</p>
          <p>{resource.content}</p>
          <p>{resource.link}</p>
          <p>{resource.excerpt}</p>
          <p>{resource.imageUrl}</p>
          <p>{resource.published}</p>
          <p>{resource.sourceId}</p>
          <p>{resource.createdAt.toDateString()}</p>
          <p>{resource.updatedAt.toDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default EditResourcePage;
