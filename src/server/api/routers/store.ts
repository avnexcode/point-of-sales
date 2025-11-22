import { StoreService } from "@/server/features/store";
import { errorFilter } from "@/server/filters";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateStoreResponse,
  DeleteStoreResponse,
  StoreResponse,
  UpdateStoreResponse,
} from "@/server/models";
import {
  createStoreRequest,
  deleteUserStoreRequest,
  queryParams,
  updateStoreRequest,
} from "@/server/validations";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const idValidation = z.string().min(1).uuid();

export const storeRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ params: queryParams }))
    .query(async ({ ctx, input }): Promise<QueryResponse<StoreResponse>> => {
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
    .input(z.object({ id: idValidation }))
    .query(async ({ ctx, input }): Promise<StoreResponse> => {
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
    .input(z.object({ id: idValidation, request: createStoreRequest }))
    .mutation(async ({ ctx, input }): Promise<CreateStoreResponse> => {
      const { db, auth } = ctx;
      const { id, request } = input;
      try {
        const store = await db.$transaction(async (tx) => {
          return StoreService.create(tx, auth.id, id, request);
        });
        return store;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: protectedProcedure
    .input(z.object({ id: idValidation, request: updateStoreRequest }))
    .mutation(async ({ ctx, input }): Promise<UpdateStoreResponse> => {
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
    .mutation(async ({ ctx, input }): Promise<DeleteStoreResponse> => {
      const { db, auth } = ctx;
      const { request } = input;
      try {
        const store = await db.$transaction(async (tx) => {
          return StoreService.delete(tx, auth.id, request);
        });
        return store;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
