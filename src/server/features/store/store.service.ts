import serverI18n from "@/lib/i18n/server";
import { SUPABASE_BUCKET } from "@/lib/supabase/bucket";
import type { DBClient } from "@/server/db";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateStoreRequest,
  DeleteStoreRequest,
  DeleteStoreResponse,
  QueryParams,
  StoreResponse,
  UpdateStoreRequest,
  UpdateStoreResponse,
} from "@/server/models";
import { FileService } from "@/server/services";
import { generateSlug } from "@/utils";
import { BaseService } from "../common";
import { UserStoreService } from "../user-store";
import { StoreRepository } from "./store.repository";

export class StoreService extends BaseService {
  protected static baseModel = serverI18n.t("models.store.title");

  static getAllByUser = async (
    db: DBClient,
    userId: string,
    params: QueryParams,
  ): Promise<QueryResponse<StoreResponse>> => {
    const { page, limit, search } = params;

    const totalCount = await StoreRepository.countAllSearchByUser(
      db,
      userId,
      search,
    );

    const stores = await StoreRepository.findManyUniqueUser(db, userId, params);

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: stores,
      meta: {
        total: totalCount,
        limit,
        page,
        lastPage,
      },
    };
  };

  static getById = async (
    db: DBClient,
    userId: string,
    storeId: string,
  ): Promise<StoreResponse> => {
    const store = await StoreRepository.findUniqueId(db, userId, storeId);

    return this.checkNotNull(store, this.baseModel);
  };

  static create = async (
    db: DBClient,
    userId: string,
    storeId: string,
    request: CreateStoreRequest,
  ) => {
    const isStoreByNameExists = await StoreRepository.countUniqueName(
      db,
      userId,
      request.name,
    );

    await this.checkExists(
      isStoreByNameExists !== 0,
      this.baseModel,
      "CONFLICT",
    );

    const slug = generateSlug({
      text: request.name,
      withId: true,
      uuid: storeId,
    });

    const store = await StoreRepository.insert(db, storeId, slug, {
      ...request,
    });

    await UserStoreService.create(db, { userId, storeId });

    return store;
  };

  static update = async (
    db: DBClient,
    userId: string,
    storeId: string,
    request: UpdateStoreRequest,
  ): Promise<UpdateStoreResponse> => {
    const existingStore = await this.getById(db, userId, storeId);

    const isStoreByNameExists = await StoreRepository.countUniqueName(
      db,
      userId,
      request.name ?? "",
    );

    await this.checkExists(
      isStoreByNameExists !== 0 && request.name !== existingStore.name,
      this.baseModel,
      "CONFLICT",
    );

    let slug = existingStore.slug;

    if (existingStore.name !== request.name) {
      slug = generateSlug({
        text: request.name,
        withId: true,
        uuid: storeId,
      });
    }

    const store = await StoreRepository.update(db, storeId, slug, request);

    return store;
  };

  static delete = async (
    db: DBClient,
    userId: string,
    request: DeleteStoreRequest,
  ): Promise<DeleteStoreResponse> => {
    const isStoreExists = await StoreRepository.countUniqueId(
      db,
      userId,
      request.id,
    );

    await this.checkExists(isStoreExists === 0, this.baseModel);

    try {
      const userStore = await UserStoreService.getByUserAndStore(
        db,
        userId,
        request.id,
      );

      await UserStoreService.delete(db, userId, request.id, {
        id: userStore.id,
      });

      const store = await StoreRepository.destroy(db, { id: request.id });

      if (store.image) {
        await FileService.deleteImageByUrl(SUPABASE_BUCKET.Store, store.image);
      }

      return store;
    } catch (error) {
      throw error;
    }
  };
}
