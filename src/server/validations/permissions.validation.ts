import z from "zod";

export const createPermissionsRequest = z.object({});

export const updatePermissionsRequest = createPermissionsRequest.partial();

export const deletePermissionsRequest = z.object({
  id: z.string().min(1).uuid(),
});
