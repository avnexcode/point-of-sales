import { AmountType } from "@prisma/client";
import z from "zod";

export const amountTypes = Object.values(AmountType) as [
  AmountType,
  ...AmountType[],
];

export const baseStoreRequest = z.object({
  name: z.string().min(1).max(100).trim().toLowerCase(),
  address: z.string().min(1).max(255),
  image: z.string().nullable().optional(),
  discount: z.enum(amountTypes).default("NONE"),
  totalDiscount: z.number().optional(),
  tax: z.enum(amountTypes).default("NONE"),
  totalTax: z.number().optional(),
});

export const createStoreRequest = baseStoreRequest
  .refine((data) => data.discount === AmountType.NONE || !!data.totalDiscount, {
    message: "If discount is provided, totalDiscount is required",
    path: ["totalDiscount"],
  })
  .refine((data) => data.discount !== AmountType.NONE || !data.totalDiscount, {
    message: "If discount is NONE, totalDiscount must be empty",
    path: ["totalDiscount"],
  })
  .refine((data) => data.tax === AmountType.NONE || !!data.totalTax, {
    message: "If tax is provided, totalTax is required",
    path: ["totalTax"],
  })
  .refine((data) => data.tax !== AmountType.NONE || !data.totalTax, {
    message: "If tax is NONE, totalTax must be empty",
    path: ["totalTax"],
  });

export const updateStoreRequest = baseStoreRequest
  .partial()
  .refine((data) => data.discount === AmountType.NONE || !!data.totalDiscount, {
    message: "If discount is provided, totalDiscount is required",
    path: ["totalDiscount"],
  })
  .refine((data) => data.discount !== AmountType.NONE || !data.totalDiscount, {
    message: "If discount is NONE, totalDiscount must be empty",
    path: ["totalDiscount"],
  })
  .refine((data) => data.tax === AmountType.NONE || !!data.totalTax, {
    message: "If tax is provided, totalTax is required",
    path: ["totalTax"],
  })
  .refine((data) => data.tax !== AmountType.NONE || !data.totalTax, {
    message: "If tax is NONE, totalTax must be empty",
    path: ["totalTax"],
  });

export const deleteStoreRequest = z.object({
  id: z.string().min(1).uuid(),
});
