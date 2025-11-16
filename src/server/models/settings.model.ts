import type { Prisma, Settings } from "@prisma/client";
import type z from "zod";
import type {
  createSettingsRequest,
  deleteSettingsRequest,
  updateSettingsRequest,
} from "../validations";

export type CreateSettingsRequest = z.infer<typeof createSettingsRequest>;

export type UpdateSettingsRequest = z.infer<typeof updateSettingsRequest>;

export type DeleteSettingsRequest = z.infer<typeof deleteSettingsRequest>;

export type SettingsResponse = Prisma.SettingsGetPayload<{
  select: {
    id: true;
    theme: true;
    language: true;
    currency: true;
    notification: true;
  };
}>;

export type CreateSettingsResponse = Omit<Settings, "updatedAt" | "userId">;

export type UpdateSettingsResponse = Omit<Settings, "createdAt" | "userId">;

export type DeleteSettingsResponse = Pick<Settings, "id">;
