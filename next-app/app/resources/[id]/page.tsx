"use client";

import { Prisma } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import prisma from "../../../prisma/client";
import ToggleLikes from "../../components/ToggleLikes";
import ToggleSave from "../../components/ToggleSave";
import RelatedResourceCard from "../../components/ResourceCard/RelatedResourceCard";
import { useSession } from "next-auth/react";
import SaveToListModal from "../../components/SaveToListModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ResourceDetailCardSkeleton from "./ResourceDetailCardSkeleton";

interface Props {
  params: { id: string };
}

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

type PostWithScore = PostWithRelations & { score: number };

const ResourceDetailPage = ({ params: { id } }: Props) => {
  const [resource, setResource] = useState<PostWithRelations>();
  const [relatedResources, setRelatedResources] = useState<PostWithScore[]>();
  const { data: session, status } = useSession();
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      const response = await axios.get(`/api/resources/${id}`);
      setResource(response.data);
      // Split the content into paragraphs
      const content = response.data.content;
      const paragraphs = content.split(/\r?\n/);
      setParagraphs(paragraphs);
    };

    const fetchRelatedResources = async () => {
      const response = await axios.get(`/api/resources/${id}/related`);
      setRelatedResources(response.data);
    };

    fetchResource();
    fetchRelatedResources();

    setIsLoading(false);
  }, [id]);

  const handleSave = async (listId: string) => {
    if (status != "authenticated") {
      alert("You need to be logged in to save resources");
      return;
    }

    try {
      const response = await axios.post(
        `/api/users/${session?.user.id}/lists/${listId}`,
        {
          postId: id,
        }
      );
      console.log("saved to: ", { listId });
    } catch (err) {
      console.error(err);
      alert("Failed to save to the list.");
    }
  };

  const handleRemove = async (listId: string) => {
    if (status !== "authenticated") {
      alert("You need to be logged in to remove resources");
      return;
    }
    if (!listId) {
      console.error("List ID is missing");
      return;
    }

    try {
      const response = await axios.delete(
        `/api/users/${session?.user.id}/lists/${listId}`,
        {
          data: { postId: id },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("removed from: ", { listId });
    } catch (err) {
      console.error(err);
      alert("Failed to remove from the list.");
    }
  };

  return (
    <>
      {isLoading ? (
        <ResourceDetailCardSkeleton />
      ) : (
        <div
          key={resource?.id}
          className="card lg:card-side bg-base-100 shadow-xl h-[500px] flex flex-row"
        >
          <figure className="lg:w-1/2 md:w-full">
            <img
              src={resource?.imageUrl}
              alt="Resource thumbnail"
              className="object-cover w-full h-full"
            />
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
              {session ? (
                <div className="flex justify-center align-middle gap-2 rounded-md border border-gray-200	p-3">
                  <ToggleLikes resourceId={id} />
                  <div className="text-gray-500">|</div>
                  <ToggleSave
                    onSave={handleSave}
                    onRemove={handleRemove}
                    resourceId={id}
                  />
                </div>
              ) : (
                <div className="rounded-md border border-gray-200	p-3">
                  <ToggleLikes resourceId={id} />
                </div>
              )}
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
      )}
      <div className="flex w-full flex-col pt-4">
        <h3 className="text-xl pt-4 text-center">Overview</h3>
        <div className="divider"></div>
        <div>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="p-4">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="divider"></div>
        <div className="card rounded-box grid place-items-center">
          <h3 className="text-xl pb-4">Related Resources</h3>
          <div className="flex gap-8 justify-around">
            {relatedResources?.map((relatedResource) => (
              <RelatedResourceCard
                key={relatedResource.id}
                resource={relatedResource}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceDetailPage;
