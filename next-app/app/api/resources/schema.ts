import { z } from "zod";

const schema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(2),
  content: z.string().min(2),
  link: z.string().url(),
  imageUrl: z.string().url(),
  source: z.string(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  // savedByUsers: z.array(z.string()),
});

export default schema;
