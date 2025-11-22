import {
  createCallerFactory,
  createTRPCContext,
  createTRPCRouter,
} from "@/server/api/trpc";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { GetServerSidePropsContext } from "next";
import {
  authRouter,
  settingsRouter,
  storeRouter,
  warehouseRouter,
} from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  settings: settingsRouter,
  store: storeRouter,
  warehouse: warehouseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

export const createSSRCaller = async (
  context: CreateNextContextOptions | GetServerSidePropsContext,
) => {
  const ctx = await createTRPCContext(context);
  return appRouter.createCaller(ctx);
};
