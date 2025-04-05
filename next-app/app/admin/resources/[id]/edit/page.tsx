"use client";

import React, { useEffect, useState } from "react";
import ResourceForm from "../../components/ResourceForm";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import type { Post } from "@prisma/client";
import { notFound } from "next/navigation";
import AdminDashboardNavBar from "@/app/admin/NavBar";
import EditResourceForm from "../../components/EditResourceForm";
import axios from "axios";
import { useNotifications } from "../../../../contexts/NotificationContext";

interface Props {
  params: { id: string };
}

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

const EditResourcePage = ({ params }: Props) => {
  const { showNotification, clearAllNotifications } = useNotifications();
  const [resource, setResource] = useState<PostWithRelations>();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(`/api/resources/${params.id}`);
        const resourceData = response.data;
        if (!resourceData) {
          notFound();
        }

        setResource(resourceData);
        console.log("Resource data: ", resourceData);
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    };

    fetchResource();
  }, [params.id]);

  return (
    <div className="flex">
      <div className="w-full">
        {resource && <EditResourceForm resource={resource} />}
      </div>
    </div>
  );
};

export default EditResourcePage;
