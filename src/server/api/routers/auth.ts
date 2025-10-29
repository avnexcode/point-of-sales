import { errorFilter } from "@/server/filters";
import { createTRPCRouter, publicProcedure } from "../trpc";
import type { User } from "@prisma/client";

export const authRouter = createTRPCRouter({
  getProfile: publicProcedure.query(async () => {
    try {
      const user: User = {
        id: "8c73f5f2-8e6d-47a1-bd54-3af7e25cb8d9",
        name: "Muhammad Fauzi Nur Aziz",
        username: "axnvee",
        email: "axnvee18@gmail.com",
        phone: null,
        avatar: null,
        image: null,
        providers: ["EMAIL"],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return user;
    } catch (error) {
      return errorFilter(error);
    }
  }),
});
