import { SettingsService } from "@/server/features/settings";
import { errorFilter } from "@/server/filters";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { SettingsResponse } from "@/server/models";

export const settingsRouter = createTRPCRouter({
  getByUser: protectedProcedure.query(
    async ({ ctx }): Promise<SettingsResponse> => {
      const { db, auth } = ctx;
      try {
        const settings = await SettingsService.getByUser(db, auth.id);
        return settings;
      } catch (error) {
        return errorFilter(error);
      }
    },
  ),
});
