import serverI18n from "@/lib/i18n/server";
import { SUPABASE_BUCKET } from "@/lib/supabase/bucket";
import type { DBClient } from "@/server/db";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateStoreRequest,
  DeleteStoreResponse,
  QueryParams,
  StoreResponse,
  UpdateStoreRequest,
  UpdateStoreResponse,
} from "@/server/models";
import { FileService } from "@/server/services";
import { generateSlug } from "@/utils";
import { BaseService } from "../common";
import { UserStoreRepository, UserStoreService } from "../user-store";
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

    return this.checkNotNullOrThrow(store, "NOT_FOUND", this.baseModel);
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

    await this.checkExistsOrThrow(
      "EXISTS",
      isStoreByNameExists > 0,
      "CONFLICT",
      this.baseModel,
    );

    // let imageUrl = "";

    const slug = generateSlug({
      text: request.name,
      withId: true,
      uuid: storeId,
    });

    // const fileName = `store-${slug}.jpeg`;

    try {
      // imageUrl = await FileService.uploadImage(
      //   SUPABASE_BUCKET.Store,
      //   fileName,
      //   request.image,
      // );

      const store = await StoreRepository.insert(db, storeId, slug, {
        ...request,
      });

      await UserStoreService.create(db, { userId, storeId });

      return store;
    } catch (error) {
      // if (imageUrl) {
      //   await FileService.deleteImageByUrl(SUPABASE_BUCKET.Store, imageUrl);
      // }

      throw error;
    }
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

    await this.checkExistsOrThrow(
      "EXISTS",
      isStoreByNameExists > 0 && request.name !== existingStore.name,
      "CONFLICT",
      this.baseModel,
    );

    const store = await StoreRepository.update(db, storeId, request);

    return store;
  };

  static delete = async (
    db: DBClient,
    userId: string,
    storeId: string,
  ): Promise<DeleteStoreResponse> => {
    const isStoreExists = await StoreRepository.countUniqueId(
      db,
      userId,
      storeId,
    );

    await this.checkExistsOrThrow(
      "NULL",
      isStoreExists > 0,
      "NOT_FOUND",
      this.baseModel,
    );

    try {
      const userStore = await UserStoreService.getByUserAndStore(
        db,
        userId,
        storeId,
      );

      await UserStoreRepository.destroy(db, userId, storeId, {
        id: userStore.id,
      });

      const store = await StoreRepository.destroy(db, { id: storeId });

      if (store.image) {
        await FileService.deleteImageByUrl(SUPABASE_BUCKET.Store, store.image);
      }

      return store;
    } catch (error) {
      throw error;
    }
  };
}
