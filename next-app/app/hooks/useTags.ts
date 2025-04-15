import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tag, Post } from "@prisma/client";

interface TagWithPosts extends Tag {
  posts: Post[];
}

export const useTags = () => {
  return useQuery<TagWithPosts[], Error>({
    queryKey: ["tags"],
    queryFn: async () => {
      console.log("fetching the tags data");
      const res = await axios.get(`/api/tags?ts=${Date.now()}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
