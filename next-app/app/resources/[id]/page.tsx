import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import prisma from "../../../prisma/client";
import { Prisma } from "@prisma/client";
import ToggleLikes from "@/app/components/ToggleLikes";

interface Props {
  params: { id: string };
}

const ResourceDetailPage = async ({ params: { id } }: Props) => {
  // check if id exists
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/resources/${id}`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!response) return notFound();

  const resource = await prisma.post.findUnique({
    where: { id },
    include: {
      source: {
        select: {
          name: true,
        },
      },
      categories: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <div
        key={resource?.id}
        className="card lg:card-side bg-base-100 shadow-xl"
      >
        <figure className="w-[800px] h-[400px]">
          <img className="object-cover" src={resource?.imageUrl} alt="TODO" />
        </figure>
        <div className="card-body flex-auto justify-around">
          <div className="flex gap-3 flex-wrap">
            {resource?.categories.map((category) => (
              <div key={category.name} className="badge badge-secondary">
                {category.name}
              </div>
            ))}
          </div>
          <h2 className="card-title text-3xl">{resource?.title}</h2>
          <div className="card-actions justify-start flex-wrap">
            {resource?.tags.map((tag) => (
              <div key={tag.name} className="badge badge-outline">
                {tag.name}
              </div>
            ))}
          </div>
          <div>
            <p>Source | {resource?.source.name}</p>
          </div>
          <div className="card-actions justify-between">
            {/* <ToggleLikes resourceId={resource!.id} /> */}

            <Link
              href={resource?.link ?? "/resources"}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore this resource
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="card rounded-box grid h-20 place-items-center">
          <h3 className="text-xl">Overview</h3>
        </div>
        <div className="divider"></div>
        <div className="card rounded-box grid gap-4 h-20 place-items-center">
          {resource?.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="divider"></div>
        <div className="card rounded-box grid h-20 place-items-center">
          <h3 className="text-xl">Related Resources</h3>
        </div>
      </div>
    </>
  );
};

// need to fix

async function generateMetaData({ params: { id } }: Props) {
  const resource = await prisma.post.findUnique({
    where: { id },
  });

  return {
    title: resource?.title,
    description: "Details of " + resource?.id,
  };
}

export default ResourceDetailPage;
