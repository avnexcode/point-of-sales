import serverI18n from "@/lib/i18n/server";
import type { DBClient } from "@/server/db";
import type {
  CreateSettingsRequest,
  CreateSettingsResponse,
  DeleteSettingsRequest,
  DeleteSettingsResponse,
  SettingsResponse,
  UpdateSettingsRequest,
  UpdateSettingsResponse,
} from "@/server/models";
import { BaseService } from "../common";
import { SettingsRepository } from "./settings.repository";

export class SettingsService extends BaseService {
  protected static baseModel = serverI18n.t("models.settings.title");

  static getByUser = async (
    db: DBClient,
    userId: string,
  ): Promise<SettingsResponse> => {
    const settings = await SettingsRepository.findUniqueUser(db, userId);

    return this.checkNotNullOrThrow(settings, "NOT_FOUND", this.baseModel);
  };

  static create = async (
    db: DBClient,
    userId: string,
    request: CreateSettingsRequest,
  ): Promise<CreateSettingsResponse> => {
    const settings = await SettingsRepository.insert(db, userId, request);

    return settings;
  };

  static update = async (
    db: DBClient,
    userId: string,
    id: string,
    request: UpdateSettingsRequest,
  ): Promise<UpdateSettingsResponse> => {
    const isSettingsByIdExists = await SettingsRepository.countUniqueId(
      db,
      userId,
      id,
    );

    await this.checkExistsOrThrow(
      "NULL",
      isSettingsByIdExists > 0,
      "NOT_FOUND",
      this.baseModel,
    );

    const settings = await SettingsRepository.update(db, userId, id, request);

    return settings;
  };

  static delete = async (
    db: DBClient,
    userId: string,
    request: DeleteSettingsRequest,
  ): Promise<DeleteSettingsResponse> => {
    const isSettingsByIdExists = await SettingsRepository.countUniqueId(
      db,
      userId,
      request.id,
    );

    await this.checkExistsOrThrow(
      "NULL",
      isSettingsByIdExists > 0,
      "NOT_FOUND",
      this.baseModel,
    );

    const settings = await SettingsRepository.destroy(db, userId, request);

    return settings;
  };
}
