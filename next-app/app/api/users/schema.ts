import { z } from "zod";

// define the validation rules
export const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export const listSchema = z.object({
  name: z.string().min(2),
});
