import type { DBClient } from "@/server/db";
import type {
  CreateStoreRequest,
  CreateStoreResponse,
  DeleteStoreRequest,
  DeleteStoreResponse,
  QueryParams,
  StoreResponse,
  UpdateStoreRequest,
  UpdateStoreResponse,
} from "@/server/models";

export class StoreRepository {
  static findManyUniqueUser = async (
    db: DBClient,
    userId: string,
    params: QueryParams,
  ): Promise<StoreResponse[]> => {
    const { page, limit, search, sort, order } = params;

    const skip = (page - 1) * limit;

    const userStores = await db.userStore.findMany({
      where: { userId },
      select: {
        store: {
          select: {
            id: true,
            slug: true,
            name: true,
            address: true,
            image: true,
            discount: true,
            totalDiscount: true,
            tax: true,
            totalTax: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      take: limit,
      skip,
      orderBy: {
        [sort]: order,
      },
    });

    const stores = userStores.map((userStore) => userStore.store);

    return stores;
  };

  static findUniqueId = async (
    db: DBClient,
    userId: string,
    storeId: string,
  ): Promise<StoreResponse | null> => {
    const userStore = await db.userStore.findFirst({
      where: { userId, storeId },
      select: {
        store: {
          select: {
            id: true,
            slug: true,
            name: true,
            address: true,
            image: true,
            discount: true,
            totalDiscount: true,
            tax: true,
            totalTax: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return userStore ? userStore.store : null;
  };

  static countAllSearchByUser = async (
    db: DBClient,
    userId: string,
    search?: string,
  ): Promise<number> => {
    const userStoresCount = await db.userStore.count({
      where: {
        userId,
        ...(search && { name: search }),
      },
    });

    return userStoresCount;
  };

  static countUniqueId = async (
    db: DBClient,
    userId: string,
    storeId: string,
  ): Promise<number> => {
    const userStoresCount = await db.userStore.count({
      where: { userId, storeId },
    });

    return userStoresCount;
  };

  static countUniqueName = async (
    db: DBClient,
    userId: string,
    name: string,
  ): Promise<number> => {
    const userStoresCount = await db.userStore.count({
      where: { userId, store: { name } },
    });

    return userStoresCount;
  };

  static insert = async (
    db: DBClient,
    storeId: string,
    slug: string,
    request: CreateStoreRequest,
  ): Promise<CreateStoreResponse> => {
    const store = await db.store.create({
      data: { ...request, id: storeId, slug },
      select: {
        id: true,
        slug: true,
        name: true,
        address: true,
        image: true,
        discount: true,
        totalDiscount: true,
        tax: true,
        totalTax: true,
        createdAt: true,
      },
    });

    return store;
  };

  static update = async (
    db: DBClient,
    storeId: string,
    request: UpdateStoreRequest,
  ): Promise<UpdateStoreResponse> => {
    const store = await db.store.update({
      where: { id: storeId },
      data: { ...request },
      select: {
        id: true,
        slug: true,
        name: true,
        address: true,
        image: true,
        discount: true,
        totalDiscount: true,
        tax: true,
        totalTax: true,
        updatedAt: true,
      },
    });

    return store;
  };

  static destroy = async (
    db: DBClient,
    request: DeleteStoreRequest,
  ): Promise<DeleteStoreResponse> => {
    const store = await db.store.delete({
      where: { id: request.id },
      select: {
        id: true,
        image: true,
      },
    });

    return store;
  };
}
