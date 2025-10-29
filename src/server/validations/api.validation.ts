import { z } from "zod";

export const queryParams = z
  .object({
    page: z
      .number({
        required_error: "Page is required.",
        invalid_type_error: "Page must be a number.",
      })
      .int("Page must be an integer.")
      .min(1, "Page must be at least 1.")
      .default(1),

    limit: z
      .number({
        required_error: "Limit is required.",
        invalid_type_error: "Limit must be a number.",
      })
      .int("Limit must be an integer.")
      .min(1, "Limit must be at least 1.")
      .max(500, "Limit must not exceed 500.")
      .default(20),

    search: z
      .string({
        invalid_type_error: "Search must be a string.",
      })
      .trim()
      .optional(),

    sort: z
      .string({
        invalid_type_error: "Sort must be a string.",
      })
      .optional()
      .default("createdAt"),

    order: z
      .enum(["asc", "desc"], {
        required_error: "Order is required.",
        invalid_type_error: "Order must be either 'asc' or 'desc'.",
      })
      .default("desc"),

    visibility: z
      .enum(["public", "private", "default"], {
        invalid_type_error: "Visibility must be either 'PUBLIC' or 'PRIVATE'.",
      })
      .optional(),
  })
  .optional()
  .default({
    page: 1,
    limit: 1000,
    search: "",
    sort: "createdAt",
    order: "desc",
    visibility: "default",
  });
