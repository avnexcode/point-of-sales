import type z from "zod";
import type {
  createWarehouseRequest,
  deleteWarehouseRequest,
  updateWarehouseRequest,
} from "../validations";
import type { Prisma, Warehouse } from "@prisma/client";

export type CreateWarehouseRequest = z.infer<typeof createWarehouseRequest>;

export type UpdateWarehouseRequest = z.infer<typeof updateWarehouseRequest>;

export type DeleteWarehouseRequest = z.infer<typeof deleteWarehouseRequest>;

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

export type CreateWarehouseResponse = Omit<Warehouse, "updatedAt">;

export type UpdateWarehouseResponse = Omit<Warehouse, "createdAt">;

export type DeleteWarehouseResponse = Pick<Warehouse, "id" | "image">;
