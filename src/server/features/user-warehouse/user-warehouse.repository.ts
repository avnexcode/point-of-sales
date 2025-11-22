import type { DBClient } from "@/server/db";
import type {
  CreateUserWarehouseRequest,
  CreateUserWarehouseResponse,
  DeleteUserWarehouseRequest,
  DeleteUserWarehouseResponse,
  UserWarehouseResponse,
} from "@/server/models";

export class UserWarehouseRepository {
  static findUniqueUserAndWarehouse = async (
    db: DBClient,
    userId: string,
    warehouseId: string,
  ): Promise<UserWarehouseResponse | null> => {
    const userWarehouse = await db.userWarehouse.findFirst({
      where: { userId, warehouseId },
      select: {
        id: true,
        userId: true,
        warehouseId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return userWarehouse;
  };

  static countUniqueId = async (
    db: DBClient,
    userId: string,
    warehouseId: string,
    userWarehouseId: string,
  ): Promise<number> => {
    const userWarehousesCount = await db.userWarehouse.count({
      where: { userId, warehouseId, id: userWarehouseId },
    });

    return userWarehousesCount;
  };

  static insert = async (
    db: DBClient,
    request: CreateUserWarehouseRequest,
  ): Promise<CreateUserWarehouseResponse> => {
    const { userId, warehouseId } = request;

    const userWarehouse = await db.userWarehouse.create({
      data: { userId, warehouseId },
      select: {
        id: true,
        userId: true,
        warehouseId: true,
        createdAt: true,
      },
    });

    return userWarehouse;
  };

  static destroy = async (
    db: DBClient,
    userId: string,
    warehouseId: string,
    request: DeleteUserWarehouseRequest,
  ): Promise<DeleteUserWarehouseResponse> => {
    const userWarehouse = await db.userWarehouse.delete({
      where: { userId, warehouseId, id: request.id },
    });

    return userWarehouse;
  };
}
