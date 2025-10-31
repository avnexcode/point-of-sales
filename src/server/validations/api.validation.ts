import { z } from "zod";

export const queryParams = z
  .object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(500).default(20),
    search: z.string().trim().optional(),
    sort: z.string().optional().default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
    visibility: z.enum(["public", "private", "default"]).optional(),
  })
  .optional()
  .default({
    page: 1,
    limit: 100,
    search: "",
    sort: "createdAt",
    order: "desc",
    visibility: "default",
  });
