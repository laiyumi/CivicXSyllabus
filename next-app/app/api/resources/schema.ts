import { z } from "zod";

const schema = z.object({
  title: z.string().min(3).max(30),
  description: z.string().min(5).max(100),
});

export default schema;
