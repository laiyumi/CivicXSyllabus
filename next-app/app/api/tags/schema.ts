import { z } from "zod";

const schema = z.object({
  name: z
    .string({
      required_error: "Type is required",
    })
    .min(2, {
      message: "Type must be at least 2 characters",
    }),
});

export default schema;
