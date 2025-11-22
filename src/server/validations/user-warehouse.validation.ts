import z from "zod";

export const createUserWarehouseRequest = z.object({
  userId: z.string().min(1).max(56).uuid(),
  warehouseId: z.string().min(1).max(56).uuid(),
});

export const updateUserWarehouseRequest = createUserWarehouseRequest.partial();

export const deleteUserWarehouseRequest = z.object({
  id: z.string().min(1).uuid(),
});
