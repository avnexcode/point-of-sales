import type { DBClient } from "@/server/db";
import type { PermissionKey } from "@/server/models";

export class PermissionsRepository {
  //   static checkPermission = async (
  //     db: DBClient,
  //     userId: string,
  //     permission: PermissionKey,
  //   ): Promise<boolean> => {
  //     const result = await db.permissions.findUnique({
  //       where: { userId },
  //       select: { [permission]: true },
  //     });
  //     return result ? result[permission] : false;
  //   };
}
