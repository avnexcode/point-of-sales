import type { DBClient } from "@/server/db";
import type {
  CreateSettingsRequest,
  CreateSettingsResponse,
  DeleteSettingsRequest,
  DeleteSettingsResponse,
  SettingsResponse,
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
