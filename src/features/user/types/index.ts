import type { Prisma } from "@prisma/client";

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
