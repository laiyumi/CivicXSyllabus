import { z } from "zod";

// define the validation rules
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export default schema;
