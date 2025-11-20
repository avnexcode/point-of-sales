import type { PermissionKey } from "../models";
import { type DBClient } from "./../db/index";

export class PermissionService {
  checkPermission = async (
    db: DBClient,
    userId: string,
    permission: PermissionKey,
  ): Promise<boolean> => {
    return false;
  };
}
