import { z } from "zod";

export const createResourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  link: z.string().url("Link must includes https://"),
  imageUrl: z.string().url("Link must includes https://"),
  source: z.string().min(1, "Source is required"),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
});

export const UserSubmittedResourceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address").trim(),
  resourceName: z.string().min(1, "Resource name is required"),
  resourceLink: z.string().url("Link must includes https://"),
  description: z.string().min(1, "Description is required"),
  bestFit: z
    .string()
    .min(
      1,
      "This field is required, it will help us understand the resource and better evalute it."
    ),
  moreInfo: z.string().optional(),
  tags: z.string().optional(),
  categories: z.string().optional(),
});
