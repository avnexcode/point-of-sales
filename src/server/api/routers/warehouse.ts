import { WarehouseService } from "@/server/features/warehouse";
import { errorFilter } from "@/server/filters";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateWarehouseResponse,
  DeleteWarehouseResponse,
  UpdateWarehouseResponse,
  WarehouseResponse,
} from "@/server/models";
import {
  createWarehouseRequest,
  deleteUserWarehouseRequest,
  queryParams,
  updateWarehouseRequest,
} from "@/server/validations";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const idValidation = z.string().min(1).uuid();

export const warehouseRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ params: queryParams }))
    .query(
      async ({ ctx, input }): Promise<QueryResponse<WarehouseResponse>> => {
        const { db, auth } = ctx;
        const { params } = input;
        try {
          const warehouses = await WarehouseService.getAllByUser(
            db,
            auth.id,
            params,
          );
          return warehouses;
        } catch (error) {
          return errorFilter(error);
        }
      },
    ),

  getById: protectedProcedure
    .input(z.object({ id: idValidation }))
    .query(async ({ ctx, input }): Promise<WarehouseResponse> => {
      const { db, auth } = ctx;
      const { id } = input;
      try {
        const warehouse = await WarehouseService.getById(db, auth.id, id);
        return warehouse;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: protectedProcedure
    .input(z.object({ id: idValidation, request: createWarehouseRequest }))
    .mutation(async ({ ctx, input }): Promise<CreateWarehouseResponse> => {
      const { db, auth } = ctx;
      const { id, request } = input;
      try {
        const warehouse = await db.$transaction(async (tx) => {
          return WarehouseService.create(tx, auth.id, id, request);
        });
        return warehouse;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: protectedProcedure
    .input(z.object({ id: idValidation, request: updateWarehouseRequest }))
    .mutation(async ({ ctx, input }): Promise<UpdateWarehouseResponse> => {
      const { db, auth } = ctx;
      const { id, request } = input;
      try {
        const warehouse = await WarehouseService.update(
          db,
          auth.id,
          id,
          request,
        );
        return warehouse;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: protectedProcedure
    .input(z.object({ request: deleteUserWarehouseRequest }))
    .mutation(async ({ ctx, input }): Promise<DeleteWarehouseResponse> => {
      const { db, auth } = ctx;
      const { request } = input;
      try {
        const warehouse = await db.$transaction(async (tx) => {
          return WarehouseService.delete(tx, auth.id, request);
        });
        return warehouse;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
