import { z } from "zod";

const schema = z.object({
  name: z
    .string({
      required_error: "Topic is required",
    })
    .min(3, {
      message: "Topic must be at least 3 characters",
    }),
});

export default schema;
