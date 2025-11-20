import { SettingsService } from "@/server/features/settings";
import { errorFilter } from "@/server/filters";
import type { SettingsResponse, UpdateSettingsResponse } from "@/server/models";
import { updateSettingsRequest } from "@/server/validations";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const idValidation = z.string().min(1).uuid();

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

  update: protectedProcedure
    .input(z.object({ id: idValidation, request: updateSettingsRequest }))
    .mutation(async ({ ctx, input }): Promise<UpdateSettingsResponse> => {
      const { db, auth } = ctx;
      const { id, request } = input;
      try {
        const settings = await SettingsService.update(db, auth.id, id, request);
        return settings;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
