import serverI18n from "@/lib/i18n/server";
import type { DBClient } from "@/server/db";
import type {
  CreateUserStoreRequest,
  CreateUserStoreResponse,
  DeleteUserStoreRequest,
  DeleteUserStoreResponse,
  UserStoreResponse,
} from "@/server/models";
import { BaseService } from "../common";
import { UserStoreRepository } from "./user-store.repository";

export class UserStoreService extends BaseService {
  protected static baseModel = serverI18n.t("models.store.title");

  static getByUserAndStore = async (
    db: DBClient,
    userId: string,
    storeId: string,
  ): Promise<UserStoreResponse> => {
    const userStore = await UserStoreRepository.findUniqueUserAndStore(
      db,
      userId,
      storeId,
    );

    return this.checkNotNull(userStore, this.baseModel);
  };

  static create = async (
    db: DBClient,
    request: CreateUserStoreRequest,
  ): Promise<CreateUserStoreResponse> => {
    const userStore = await UserStoreRepository.insert(db, request);

    return userStore;
  };

  static delete = async (
    db: DBClient,
    userId: string,
    storeId: string,
    request: DeleteUserStoreRequest,
  ): Promise<DeleteUserStoreResponse> => {
    const isUserStoreByIdExists = await UserStoreRepository.countUniqueId(
      db,
      userId,
      storeId,
      request.id,
    );

    await this.checkExists(isUserStoreByIdExists === 0, this.baseModel);

    const userStore = await UserStoreRepository.destroy(
      db,
      userId,
      storeId,
      request,
    );

    return userStore;
  };
}
