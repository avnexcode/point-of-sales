import serverI18n from "@/lib/i18n/server";
import { SUPABASE_BUCKET } from "@/lib/supabase/bucket";
import type { DBClient } from "@/server/db";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateWarehouseRequest,
  CreateWarehouseResponse,
  DeleteWarehouseRequest,
  DeleteWarehouseResponse,
  QueryParams,
  UpdateWarehouseRequest,
  UpdateWarehouseResponse,
  WarehouseResponse,
} from "@/server/models";
import { FileService } from "@/server/services";
import { generateSlug } from "@/utils";
import { BaseService } from "../common";
import { UserWarehouseService } from "../user-warehouse";
import { WarehouseRepository } from "./warehouse.repository";

export class WarehouseService extends BaseService {
  protected static baseModel = serverI18n.t("models.warehouse.title");

  static getAllByUser = async (
    db: DBClient,
    userId: string,
    params: QueryParams,
  ): Promise<QueryResponse<WarehouseResponse>> => {
    const { page, limit, search } = params;

    const totalCount = await WarehouseRepository.countAllSearchByUser(
      db,
      userId,
      search,
    );

    const warehouses = await WarehouseRepository.findManyUniqueUser(
      db,
      userId,
      params,
    );

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: warehouses,
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
    warehouseId: string,
  ): Promise<WarehouseResponse> => {
    const warehouse = await WarehouseRepository.findUniqueId(
      db,
      userId,
      warehouseId,
    );

    return this.checkNotNull(warehouse, this.baseModel);
  };

  static create = async (
    db: DBClient,
    userId: string,
    warehouseId: string,
    request: CreateWarehouseRequest,
  ): Promise<CreateWarehouseResponse> => {
    const isWarehouseByNameExists = await WarehouseRepository.countUniqueName(
      db,
      userId,
      request.name,
    );

    await this.checkExists(
      isWarehouseByNameExists !== 0,
      this.baseModel,
      "CONFLICT",
    );

    const slug = generateSlug({
      text: request.name,
      withId: true,
      uuid: warehouseId,
    });

    const warehouse = await WarehouseRepository.insert(
      db,
      warehouseId,
      slug,
      request,
    );

    await UserWarehouseService.create(db, { userId, warehouseId });

    return warehouse;
  };

  static update = async (
    db: DBClient,
    userId: string,
    warehouseId: string,
    request: UpdateWarehouseRequest,
  ): Promise<UpdateWarehouseResponse> => {
    const existingWarehouse = await this.getById(db, userId, warehouseId);

    const isWarehouseByNameExists = await WarehouseRepository.countUniqueName(
      db,
      userId,
      request.name ?? "",
    );

    await this.checkExists(
      isWarehouseByNameExists !== 0 && request.name !== existingWarehouse.name,
      this.baseModel,
      "CONFLICT",
    );

    let slug = existingWarehouse.slug;

    if (existingWarehouse.name !== request.name) {
      slug = generateSlug({
        text: request.name,
        withId: true,
        uuid: warehouseId,
      });
    }

    const warehouse = await WarehouseRepository.update(
      db,
      warehouseId,
      slug,
      request,
    );

    return warehouse;
  };

  static delete = async (
    db: DBClient,
    userId: string,
    request: DeleteWarehouseRequest,
  ): Promise<DeleteWarehouseResponse> => {
    const isWarehouseExists = await WarehouseRepository.countUniqueId(
      db,
      userId,
      request.id,
    );

    await this.checkExists(isWarehouseExists === 0, this.baseModel);

    try {
      const userWarehouse = await UserWarehouseService.getByUserAndWarehouse(
        db,
        userId,
        request.id,
      );

      await UserWarehouseService.delete(db, userId, request.id, {
        id: userWarehouse.id,
      });

      const warehouse = await WarehouseRepository.destroy(db, request);

      if (warehouse.image) {
        await FileService.deleteImageByUrl(
          SUPABASE_BUCKET.Warehouse,
          warehouse.image,
        );
      }

      return warehouse;
    } catch (error) {
      throw error;
    }
  };
}
