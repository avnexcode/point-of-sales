import z from "zod";

export const createUserStoreRequest = z.object({
  userId: z.string().min(1).max(56).uuid(),
  storeId: z.string().min(1).max(56).uuid(),
});

export const updateUserStoreRequest = createUserStoreRequest.partial();

export const deleteUserStoreRequest = z.object({
  id: z.string().min(1).uuid(),
});
