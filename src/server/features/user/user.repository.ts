import { type DBClient } from "@/server/db";
import type {
  CreateUserRequest,
  CreateUserResponse,
  UserResponse,
} from "@/server/models";

export class UserRepository {
  static findUniqueId = async (
    db: DBClient,
    userId: string,
  ): Promise<UserResponse | null> => {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        avatar: true,
        image: true,
        role: true,
        providers: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  };

  static countUniqueEmail = async (
    db: DBClient,
    email: string,
  ): Promise<number> => {
    const usersCount = await db.user.count({ where: { email } });

    return usersCount;
  };

  static insert = async (
    db: DBClient,
    userId: string,
    username: string,
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> => {
    const user = await db.user.create({
      data: {
        id: userId,
        username,
        name: request.name,
        email: request.email,
        role: request.role,
        providers: [request.provider],
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        avatar: true,
        image: true,
        role: true,
        providers: true,
        createdAt: true,
      },
    });

    return user;
  };
}
