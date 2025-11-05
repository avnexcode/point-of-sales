import { env } from "@/configs/env";
import serverI18n from "@/lib/i18n/server";
import { supabaseAdminClient } from "@/lib/supabase/server";
import type { CreateUserResponse, RegisterRequest } from "@/server/models";
import { capitalizeSentence } from "@/utils";
import { TRPCError } from "@trpc/server";
import { BaseService } from "../common";
import { SettingsService } from "../settings";
import { UserRepository, UserService } from "../user";
import { type DBClient } from "./../../db/index";

export class AuthService extends BaseService {
  static register = async (
    db: DBClient,
    request: RegisterRequest,
  ): Promise<CreateUserResponse> => {
    const { name, email, password, confirmPassword } = request;

    if (password !== confirmPassword) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: capitalizeSentence(
          serverI18n.t(
            "schemas.validation.password.confirmPassword.doNotMatch",
          ),
        ),
      });
    }

    const isUserByEmailExists = await UserRepository.countUniqueEmail(
      db,
      email,
    );

    if (isUserByEmailExists !== 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: serverI18n.t("errors.messages.email.conflict"),
      });
    }

    let userId = "";

    try {
      const { data: registeredData, error: registeredError } =
        await supabaseAdminClient.auth.admin.createUser({
          email,
          password,
          app_metadata: {
            role: "admin",
          },
        });

      if (registeredData.user) userId = registeredData.user.id;

      if (registeredError) throw registeredError;

      const { error: sendEmailError } = await supabaseAdminClient.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${env.NEXT_PUBLIC_BASE_URL}/login`,
        },
      });

      if (sendEmailError) throw sendEmailError;

      const user = await UserService.create(db, userId, {
        name,
        email,
        provider: "EMAIL",
        role: "ADMIN",
      });

      await SettingsService.create(db, userId, {
        theme: "SYSTEM",
        language: "ID",
        currency: "IDR",
        notification: true,
      });

      return user;
    } catch (error) {
      if (userId) {
        await supabaseAdminClient.auth.admin.deleteUser(userId);
      }
      throw error;
    }
  };
}
