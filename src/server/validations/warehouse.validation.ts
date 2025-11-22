import z from "zod";

export const createWarehouseRequest = z.object({
  name: z.string().min(1).max(100).trim().toLowerCase(),
  address: z.string().min(1).max(255),
  image: z.string().nullable().optional(),
  storeId: z.string().min(1).uuid(),
});

export const updateWarehouseRequest = createWarehouseRequest.partial();

export const deleteWarehouseRequest = z.object({
  id: z.string().min(1).uuid(),
});
