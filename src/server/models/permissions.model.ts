import type { Prisma } from "@prisma/client";

export type PermissionKey = keyof Prisma.PermissionsSelect;
