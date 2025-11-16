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
  .refine(
    (data) => {
      if (data.discount !== AmountType.NONE && !data.totalDiscount) {
        return false;
      }
      return true;
    },
    {
      message: "If discount is provided, totalDiscount is required",
      path: ["totalDiscount"],
    },
  )
  .refine(
    (data) => {
      if (data.tax !== AmountType.NONE && !data.totalTax) {
        return false;
      }
      return true;
    },
    {
      message: "If tax is provided, totalTax is required",
      path: ["totalDiscount"],
    },
  );

export const updateStoreRequest = baseStoreRequest
  .partial()
  .refine(
    (data) => {
      if (
        data.discount &&
        data.discount !== AmountType.NONE &&
        !data.totalDiscount
      ) {
        return false;
      }
      return true;
    },
    {
      message: "If discount is provided, totalDiscount is required",
      path: ["totalDiscount"],
    },
  )
  .refine(
    (data) => {
      if (data.tax && data.tax !== AmountType.NONE && !data.totalTax) {
        return false;
      }
      return true;
    },
    {
      message: "If tax is provided, totalTax is required",
      path: ["totalTax"],
    },
  );

export const deleteStoreRequest = z.object({
  id: z.string().min(1).uuid(),
});
