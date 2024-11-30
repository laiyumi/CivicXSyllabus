import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import AdminDashboardNavBar from "../../NavBar";
import EditResourceButton from "./EditResourceButton";
import ResourceDetails from "./ResourceDetails";

interface Props {
  params: { id: string };
}

const ViewResourceDetailPage = async ({ params }: Props) => {
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

  return (
    <div className="flex">
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold leading-10 text-gray-900 pb-8">
            {resource.title}
          </h2>
          <EditResourceButton resourceId={resource.id} />
        </div>
        <ResourceDetails resource={resource} />
      </div>
    </div>
  );
};

export default ViewResourceDetailPage;
