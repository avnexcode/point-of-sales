import { errorFilter } from "@/server/filters";
import { createTRPCRouter, publicProcedure } from "../trpc";
import type { Settings } from "@prisma/client";

export const settingsRouter = createTRPCRouter({
  getByUser: publicProcedure.query(async () => {
    try {
      const settings: Settings = {
        id: "c2b1a0d6-0c5f-4d4f-a2ee-69a3ed01d64a",
        theme: "SYSTEM",
        language: "ID",
        currency: "IDR",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "8c73f5f2-8e6d-47a1-bd54-3af7e25cb8d9",
      };
      return settings;
    } catch (error) {
      return errorFilter(error);
    }
  }),
});
