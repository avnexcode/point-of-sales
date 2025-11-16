import type { Prisma } from "@prisma/client";
import type z from "zod";
import type { createStoreFormSchema, updateStoreFormSchema } from "../schemas";

export type CreateStoreFormSchema = z.infer<
  ReturnType<typeof createStoreFormSchema>
>;

export type UpdateStoreFormSchema = z.infer<
  ReturnType<typeof updateStoreFormSchema>
>;

export type StoreResponse = Prisma.StoreGetPayload<{
  select: {
    id: true;
    slug: true;
    name: true;
    address: true;
    image: true;
    discount: true;
    totalDiscount: true;
    tax: true;
    totalTax: true;
    createdAt: true;
    updatedAt: true;
  };
}>;
