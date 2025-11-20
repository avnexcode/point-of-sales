import serverI18n from "@/lib/i18n/server";
import { supabaseAdminClient } from "@/lib/supabase/server";
import type { DBClient } from "@/server/db";
import type {
  CreateUserRequest,
  CreateUserResponse,
  UserResponse,
} from "@/server/models";
import { BaseService } from "../common";
import { UserRepository } from "./user.repository";

export class UserService extends BaseService {
  protected static baseModel = serverI18n.t("models.user.title");

  static getById = async (
    db: DBClient,
    userId: string,
  ): Promise<UserResponse> => {
    const user = await UserRepository.findUniqueId(db, userId);

    return this.checkNotNull(user, this.baseModel);
  };

  static create = async (
    db: DBClient,
    userId: string,
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> => {
    const username = "user-" + userId.split("-").pop();

    const user = await UserRepository.insert(db, userId, username, request);

    await supabaseAdminClient.auth.admin.updateUserById(userId, {
      user_metadata: {
        display_name: username,
      },
    });

    return user;
  };
}
