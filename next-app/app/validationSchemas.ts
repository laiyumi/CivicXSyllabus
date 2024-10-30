import { z } from "zod";

const createResourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  link: z.string().url("Link must includes https://"),
  imageUrl: z.string().url("Link must includes https://"),
  source: z.string().min(1, "Source is required"),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
});

export default createResourceSchema;
