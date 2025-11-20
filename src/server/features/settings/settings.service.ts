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

    return this.checkNotNull(settings, this.baseModel);
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
    settingsId: string,
    request: UpdateSettingsRequest,
  ): Promise<UpdateSettingsResponse> => {
    const isSettingsByIdExists = await SettingsRepository.countUniqueId(
      db,
      userId,
      settingsId,
    );

    await this.checkExists(isSettingsByIdExists === 0, this.baseModel);

    const settings = await SettingsRepository.update(
      db,
      userId,
      settingsId,
      request,
    );

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

    await this.checkExists(isSettingsByIdExists === 0, this.baseModel);

    const settings = await SettingsRepository.destroy(db, userId, request);

    return settings;
  };
}
