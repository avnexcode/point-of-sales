import type { Prisma, User } from "@prisma/client";
import type z from "zod";
import type { createUserRequest, updateUserRequest } from "../validations";

export type CreateUserRequest = z.infer<typeof createUserRequest>;

export type UpdateUserRequest = z.infer<typeof updateUserRequest>;

export type DeleteUserRequest = Pick<User, "id">;

export type UserResponse = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    username: true;
    email: true;
    phone: true;
    avatar: true;
    image: true;
    providers: true;
    role: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type UpdateUserResponse = Omit<User, "createdAt">;

export type CreateUserResponse = Omit<User, "updatedAt">;

export type DeleteUserResponse = Pick<User, "id">;
