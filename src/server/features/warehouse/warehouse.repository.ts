import type { DBClient } from "@/server/db";
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

export class WarehouseRepository {
  protected static orQuery = ["name", "slug", "address"];

  static findManyUniqueUser = async (
    db: DBClient,
    userId: string,
    params: QueryParams,
  ): Promise<WarehouseResponse[]> => {
    const { page, limit, search, sort, order } = params;

    const skip = (page - 1) * limit;

    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const userWarehouses = await db.userWarehouse.findMany({
      where: { userId, ...(search && { warehouse: { OR: orQuery } }) },
      select: {
        warehouse: {
          select: {
            id: true,
            slug: true,
            name: true,
            address: true,
            image: true,
            shelves: true,
            storeId: true,
            store: {
              select: {
                name: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      take: limit,
      skip,
      orderBy: { warehouse: { [sort]: order } },
    });

    const warehouses = userWarehouses.map(
      (userWarehouse) => userWarehouse.warehouse,
    );

    return warehouses;
  };

  static findUniqueId = async (
    db: DBClient,
    userId: string,
    warehouseId: string,
  ): Promise<WarehouseResponse | null> => {
    const userWarehouse = await db.userWarehouse.findFirst({
      where: { userId, warehouseId },
      select: {
        warehouse: {
          select: {
            id: true,
            slug: true,
            name: true,
            address: true,
            image: true,
            shelves: true,
            storeId: true,
            store: {
              select: {
                name: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return userWarehouse ? userWarehouse.warehouse : null;
  };

  static countAllSearchByUser = async (
    db: DBClient,
    userId: string,
    search?: string,
  ): Promise<number> => {
    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const userWarehousesCount = await db.userWarehouse.count({
      where: { userId, ...(search && { warehouse: { OR: orQuery } }) },
    });

    return userWarehousesCount;
  };

  static countUniqueId = async (
    db: DBClient,
    userId: string,
    warehouseId: string,
  ): Promise<number> => {
    const userWarehousesCount = await db.userWarehouse.count({
      where: { userId, warehouseId },
    });

    return userWarehousesCount;
  };

  static countUniqueName = async (
    db: DBClient,
    userId: string,
    name: string,
  ): Promise<number> => {
    const userWarehousesCount = await db.userWarehouse.count({
      where: { userId, warehouse: { name } },
    });

    return userWarehousesCount;
  };

  static insert = async (
    db: DBClient,
    warehouseId: string,
    slug: string,
    request: CreateWarehouseRequest,
  ): Promise<CreateWarehouseResponse> => {
    const warehouse = await db.warehouse.create({
      data: { ...request, id: warehouseId, slug },
      select: {
        id: true,
        slug: true,
        name: true,
        address: true,
        image: true,
        storeId: true,
        createdAt: true,
      },
    });

    return warehouse;
  };

  static update = async (
    db: DBClient,
    warehouseId: string,
    slug: string,
    request: UpdateWarehouseRequest,
  ): Promise<UpdateWarehouseResponse> => {
    const warehouse = await db.warehouse.update({
      where: { id: warehouseId },
      data: { ...request, slug },
      select: {
        id: true,
        slug: true,
        name: true,
        address: true,
        image: true,
        storeId: true,
        updatedAt: true,
      },
    });

    return warehouse;
  };

  static destroy = async (
    db: DBClient,
    request: DeleteWarehouseRequest,
  ): Promise<DeleteWarehouseResponse> => {
    const warehouse = await db.warehouse.delete({
      where: { id: request.id },
      select: { id: true, image: true },
    });

    return warehouse;
  };
}
