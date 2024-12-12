import { Category, Prisma, Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import ToggleLikes from "../ToggleLikes";

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

const ResourceCard = ({ resource }: { resource: PostWithRelations }) => {
  console.log("the resource: ", resource);

  // const resourceLikes = resource.likes ?? 0;

  // const [likes, setLikes] = useState<number>(resourceLikes);
  // const [hasLiked, setHasLiked] = useState<boolean>(false);
  // const [isLikeDisabled, setIsLikeDisabled] = useState<boolean>(false);

  // console.log("the number of likes: ", resource.likes);

  // const handleToggleLike = async () => {
  //   try {
  //     if (hasLiked) {
  //       // Unlike: Decrement the likes count
  //       setLikes((prevLikes) => Math.max(prevLikes - 1, 0)); // Prevent negative likes
  //       await axios.put(`/api/resources/${resource.id}/unlike`);
  //     } else {
  //       // Like: Increment the likes count
  //       setLikes((prevLikes) => prevLikes + 1);
  //       await axios.put(`/api/resources/${resource.id}/like`);
  //     }
  //     setHasLiked(!hasLiked); // Toggle the liked state
  //     console.log("has liked: ", hasLiked);
  //   } catch (error) {
  //     console.error("Error toggling like:", error);
  //   }
  // };

  return (
    <div
      key={resource.id}
      className="
        card bg-base-100 shadow-xl col-span-1 
        hover:-translate-y-2 transition ease-in-out delay-100 duration-300 
        motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <figure className="w-full h-[300px]">
        <img
          className="object-cover"
          src={resource.imageUrl}
          alt={resource.title}
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-wrap gap-3">
          {resource.categories.map((category) => (
            <div key={category.name} className="badge badge-secondary">
              {category.name}
            </div>
          ))}
        </div>
        <h2 className="card-title">{resource.title}</h2>
        <p className="text-sm">{resource.excerpt}</p>
        <div className="flex gap-3 mt-1">
          {resource.tags.map((tag) => (
            <div key={tag.name} className="badge badge-outline">
              {tag.name}
            </div>
          ))}
        </div>
        <div className="card-actions justify-between mt-4">
          <ToggleLikes resourceId={resource.id} />
          <Link
            href={`/resources/${resource.id}`}
            className="btn btn-sm btn-primary"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
