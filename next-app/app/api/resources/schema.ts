import { z } from "zod";

const schema = z.object({
  title: z.string().min(3).max(30),
  excerpt: z.string().min(5).max(30),
  content: z.string().min(5).max(200),
  link: z.string().url(),
  imageUrl: z.string().url(),
  source: z.string(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
});

export default schema;
