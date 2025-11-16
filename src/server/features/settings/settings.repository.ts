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

export class SettingsRepository {
  static findUniqueUser = async (
    db: DBClient,
    userId: string,
  ): Promise<SettingsResponse | null> => {
    const settings = await db.settings.findUnique({
      where: { userId },
      select: {
        id: true,
        theme: true,
        language: true,
        currency: true,
        notification: true,
      },
    });

    return settings;
  };

  static findUniqueId = async (
    db: DBClient,
    userId: string,
    id: string,
  ): Promise<SettingsResponse | null> => {
    const settings = await db.settings.findUnique({
      where: { userId, id },
      select: {
        id: true,
        theme: true,
        language: true,
        currency: true,
        notification: true,
      },
    });

    return settings;
  };

  static countUniqueId = async (
    db: DBClient,
    userId: string,
    id: string,
  ): Promise<number> => {
    const settingsCount = await db.settings.count({
      where: { userId, id },
    });

    return settingsCount;
  };

  static insert = async (
    db: DBClient,
    userId: string,
    request: CreateSettingsRequest,
  ): Promise<CreateSettingsResponse> => {
    const settings = await db.settings.create({
      data: {
        userId,
        ...request,
      },
      select: {
        id: true,
        theme: true,
        language: true,
        currency: true,
        createdAt: true,
        notification: true,
      },
    });

    return settings;
  };

  static update = async (
    db: DBClient,
    userId: string,
    id: string,
    request: UpdateSettingsRequest,
  ): Promise<UpdateSettingsResponse> => {
    const settings = await db.settings.update({
      where: { userId, id },
      data: { ...request },
      select: {
        id: true,
        theme: true,
        language: true,
        currency: true,
        notification: true,
        updatedAt: true,
      },
    });

    return settings;
  };

  static destroy = async (
    db: DBClient,
    userId: string,
    request: DeleteSettingsRequest,
  ): Promise<DeleteSettingsResponse> => {
    const settings = await db.settings.delete({
      where: { userId, id: request.id },
      select: { id: true },
    });

    return settings;
  };
}
