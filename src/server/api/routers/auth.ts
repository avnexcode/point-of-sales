import { AuthService } from "@/server/features/auth";
import { UserService } from "@/server/features/user";
import { errorFilter } from "@/server/filters";
import type { UserResponse } from "@/server/models";
import { registerRequest } from "@/server/validations";
import z from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        request: registerRequest,
      }),
    )
    .mutation(async ({ ctx, input }): Promise<void> => {
      const { db } = ctx;
      const { request } = input;
      try {
        await db.$transaction(async (tx) => {
          await AuthService.register(tx, request);
        });
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getProfile: protectedProcedure.query(
    async ({ ctx }): Promise<UserResponse> => {
      const { db, auth } = ctx;
      try {
        const user = await UserService.getById(db, auth.id);
        return user;
      } catch (error) {
        return errorFilter(error);
      }
    },
  ),
});
