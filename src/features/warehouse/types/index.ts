import type z from "zod";
import type {
  createWarehouseFormSchema,
  updateWarehouseFormSchema,
} from "../schemas";
import type { Prisma } from "@prisma/client";

export type CreateWarehouseFormSchema = z.infer<
  ReturnType<typeof createWarehouseFormSchema>
>;

export type UpdateWarehouseFormSchema = z.infer<
  ReturnType<typeof updateWarehouseFormSchema>
>;

export type WarehouseResponse = Prisma.WarehouseGetPayload<{
  select: {
    id: true;
    slug: true;
    name: true;
    address: true;
    image: true;
    shelves: true;
    storeId: true;
    store: {
      select: {
        name: true;
      };
    };
    createdAt: true;
    updatedAt: true;
  };
}>;
