import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import AdminDashboardNavBar from "../../NavBar";
import EditResourceButton from "./EditResourceButton";
import ResourceDetails from "./ResourceDetails";

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
    },
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
            View Resource
          </h2>
          <EditResourceButton resourceId={resource.id} />
        </div>
        <ResourceDetails resource={resource} />
      </div>
    </div>
  );
};

export default EditResourcePage;
