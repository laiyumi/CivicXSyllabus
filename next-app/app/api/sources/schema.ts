import { z } from "zod";

const schema = z.object({
  name: z.string(),
});

export default schema;
