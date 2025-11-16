import { StoreService } from "@/server/features/store";
import { errorFilter } from "@/server/filters";
import {
  createStoreRequest,
  deleteUserStoreRequest,
  queryParams,
  updateStoreRequest,
} from "@/server/validations";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const storeRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ params: queryParams }))
    .query(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { params } = input;
      try {
        const stores = await StoreService.getAllByUser(db, auth.id, params);
        return stores;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().min(1).uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { id } = input;
      try {
        const store = await StoreService.getById(db, auth.id, id);
        return store;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: protectedProcedure
    .input(
      z.object({ id: z.string().min(1).uuid(), request: createStoreRequest }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { id, request } = input;
      try {
        await db.$transaction(async (tx) => {
          const store = await StoreService.create(tx, auth.id, id, request);
          return store;
        });
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: protectedProcedure
    .input(
      z.object({ id: z.string().min(1).uuid(), request: updateStoreRequest }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { id, request } = input;
      try {
        const store = await StoreService.update(db, auth.id, id, request);
        return store;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: protectedProcedure
    .input(z.object({ request: deleteUserStoreRequest }))
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { request } = input;
      try {
        await db.$transaction(async (tx) => {
          const store = await StoreService.delete(tx, auth.id, request.id);
          return store;
        });
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
