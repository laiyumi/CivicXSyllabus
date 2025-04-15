import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Category, Tag, Post } from "@prisma/client";

interface TagWithPosts extends Tag {
  posts: Post[];
}

interface CategoryWithPosts extends Category {
  posts: Post[];
}

export type ContentType = "tags" | "categories";

// Generic type for the return data
type ContentWithPosts<T extends ContentType> = T extends "tags"
  ? TagWithPosts[]
  : T extends "categories"
    ? CategoryWithPosts[]
    : never;

export const useContentType = <T extends ContentType>(
  contentType: T,
  options?: {
    staleTime?: number;
    enabled?: boolean;
  }
) => {
  return useQuery<ContentWithPosts<T>, Error>({
    queryKey: [contentType],
    queryFn: async () => {
      const res = await axios.get(`/api/${contentType}?ts=${Date.now()}`);
      return res.data;
    },
    staleTime: options?.staleTime || 1000 * 60 * 5, // 5 minutes by default
    enabled: options?.enabled !== undefined ? options.enabled : true,
  });
};

// Export specific hooks for better experience
export const useTags = (options?: {
  staleTime?: number;
  enabled?: boolean;
}) => {
  return useContentType("tags", options);
};

export const useCategories = (options?: {
  staleTime?: number;
  enabled?: boolean;
}) => {
  return useContentType("categories", options);
};
