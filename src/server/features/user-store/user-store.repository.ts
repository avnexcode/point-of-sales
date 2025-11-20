import type { DBClient } from "@/server/db";
import type {
  CreateUserStoreRequest,
  CreateUserStoreResponse,
  DeleteUserStoreRequest,
  DeleteUserStoreResponse,
  UserStoreResponse,
} from "@/server/models";

export class UserStoreRepository {
  static findUniqueUserAndStore = async (
    db: DBClient,
    userId: string,
    storeId: string,
  ): Promise<UserStoreResponse | null> => {
    const userStore = await db.userStore.findFirst({
      where: { userId, storeId },
      select: {
        id: true,
        userId: true,
        storeId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return userStore;
  };

  static countUniqueId = async (
    db: DBClient,
    userId: string,
    storeId: string,
    userStoreId: string,
  ): Promise<number> => {
    const userStoresCount = await db.userStore.count({
      where: { userId, storeId, id: userStoreId },
    });

    return userStoresCount;
  };

  static insert = async (
    db: DBClient,
    request: CreateUserStoreRequest,
  ): Promise<CreateUserStoreResponse> => {
    const { userId, storeId } = request;

    const userStore = await db.userStore.create({
      data: { userId, storeId },
      select: {
        id: true,
        userId: true,
        storeId: true,
        createdAt: true,
      },
    });

    return userStore;
  };

  static destroy = async (
    db: DBClient,
    userId: string,
    storeId: string,
    request: DeleteUserStoreRequest,
  ): Promise<DeleteUserStoreResponse> => {
    const userStore = await db.userStore.delete({
      where: { userId, storeId, id: request.id },
      select: {
        id: true,
      },
    });

    return userStore;
  };
}
