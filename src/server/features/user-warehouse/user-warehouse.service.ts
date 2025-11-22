import serverI18n from "@/lib/i18n/server";
import type { DBClient } from "@/server/db";
import type {
  CreateUserWarehouseRequest,
  CreateUserWarehouseResponse,
  DeleteUserWarehouseRequest,
  DeleteUserWarehouseResponse,
  UserWarehouseResponse,
} from "@/server/models";
import { BaseService } from "../common";
import { UserWarehouseRepository } from "./user-warehouse.repository";

export class UserWarehouseService extends BaseService {
  protected static baseModel = serverI18n.t("models.warehouse.title");

  static getByUserAndWarehouse = async (
    db: DBClient,
    userId: string,
    warehouseId: string,
  ): Promise<UserWarehouseResponse> => {
    const userWarehouse =
      await UserWarehouseRepository.findUniqueUserAndWarehouse(
        db,
        userId,
        warehouseId,
      );

    return this.checkNotNull(userWarehouse, this.baseModel);
  };

  static create = async (
    db: DBClient,
    request: CreateUserWarehouseRequest,
  ): Promise<CreateUserWarehouseResponse> => {
    const userWarehouse = await UserWarehouseRepository.insert(db, request);

    return userWarehouse;
  };

  static delete = async (
    db: DBClient,
    userId: string,
    warehouseId: string,
    request: DeleteUserWarehouseRequest,
  ): Promise<DeleteUserWarehouseResponse> => {
    const isUserWarehouseByIdExists =
      await UserWarehouseRepository.countUniqueId(
        db,
        userId,
        warehouseId,
        request.id,
      );

    await this.checkExists(isUserWarehouseByIdExists === 0, this.baseModel);

    const userWarehouse = await UserWarehouseRepository.destroy(
      db,
      userId,
      warehouseId,
      request,
    );

    return userWarehouse;
  };
}
