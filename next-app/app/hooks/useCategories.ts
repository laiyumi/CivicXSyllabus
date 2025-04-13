import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Category, Post } from "@prisma/client";

interface CategoryWithPosts extends Category {
  posts: Post[];
}

export const useCategories = () => {
  return useQuery<CategoryWithPosts[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      console.log("fetching the categories data");
      const res = await axios.get(`/api/categories?ts=${Date.now()}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
