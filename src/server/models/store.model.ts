import type { Prisma, Store } from "@prisma/client";
import type z from "zod";
import type {
  createStoreRequest,
  deleteStoreRequest,
  updateStoreRequest,
} from "../validations";

export type CreateStoreRequest = z.infer<typeof createStoreRequest>;

export type UpdateStoreRequest = z.infer<typeof updateStoreRequest>;

export type DeleteStoreRequest = z.infer<typeof deleteStoreRequest>;

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

export type CreateStoreResponse = Omit<Store, "updatedAt">;

export type UpdateStoreResponse = Omit<Store, "createdAt">;

export type DeleteStoreResponse = Pick<Store, "id" | "image">;
