import z from "zod";

export const createProductRequest = z.object({
  name: z.string().min(1).max(10),
});
