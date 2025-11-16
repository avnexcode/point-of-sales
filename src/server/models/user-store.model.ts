import type { Prisma, UserStore } from "@prisma/client";
import type z from "zod";
import type {
  createUserStoreRequest,
  deleteUserStoreRequest,
  updateUserStoreRequest,
} from "../validations";

export type CreateUserStoreRequest = z.infer<typeof createUserStoreRequest>;

export type UpdateUserStoreRequest = z.infer<typeof updateUserStoreRequest>;

export type DeleteUserStoreRequest = z.infer<typeof deleteUserStoreRequest>;

export type UserStoreResponse = Prisma.UserStoreGetPayload<{
  select: {
    id: true;
    userId: true;
    storeId: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type CreateUserStoreResponse = Omit<UserStore, "updatedAt" | "userId">;

export type UpdateUserStoreResponse = Omit<UserStore, "createdAt" | "userId">;

export type DeleteUserStoreResponse = Pick<UserStore, "id">;
