import type { Prisma, UserWarehouse } from "@prisma/client";
import type z from "zod";
import type {
  createUserWarehouseRequest,
  deleteUserWarehouseRequest,
  updateUserWarehouseRequest,
} from "../validations";

export type CreateUserWarehouseRequest = z.infer<
  typeof createUserWarehouseRequest
>;

export type UpdateUserWarehouseRequest = z.infer<
  typeof updateUserWarehouseRequest
>;

export type DeleteUserWarehouseRequest = z.infer<
  typeof deleteUserWarehouseRequest
>;

export type UserWarehouseResponse = Prisma.UserWarehouseGetPayload<{
  select: {
    id: true;
    userId: true;
    warehouseId: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type CreateUserWarehouseResponse = Omit<
  UserWarehouse,
  "updatedAt" | "userId"
>;

export type UpdateUserWarehouseResponse = Omit<
  UserWarehouse,
  "createdAt" | "userId"
>;

export type DeleteUserWarehouseResponse = Pick<UserWarehouse, "id">;
