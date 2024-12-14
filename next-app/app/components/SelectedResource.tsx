"use client";

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Category } from "@prisma/client";

interface SelectedResourceProps {
  resource: {
    name: string;
    summary: string;
  };
}

const SelectedResource = ({ resource }: SelectedResourceProps) => {
  const [resourceLink, setResourceLink] = useState("");

  // get the link of the resource
  useEffect(() => {
    const fetchResourceByName = async () => {
      try {
        const response = await axios.get(
          `/api/resources/byName?name=${encodeURIComponent(resource.name)}`
        );

        console.log("response: ", response);

        const resourceId = response.data.id;
        setResourceLink(`/resources/${resourceId}`);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResourceByName();
  }, [resource.name]);

  console.log("resource link: ", resourceLink);

  return (
    <>
      <li key={resource.name}>
        <Link
          href={resourceLink}
          className="text-blue-500 underline"
          onClick={(e) => e.stopPropagation()}
        >
          {resource.name}
        </Link>
        <span> </span>
        {resource.summary}
      </li>
    </>
  );
};

export default SelectedResource;
