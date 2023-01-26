import { createTRPCRouter } from "./trpc";
import { appsRouter } from "./routers/apps";
import { docksRouter } from "./routers/docks";

export const appRouter = createTRPCRouter({
  apps: appsRouter,
  docks: docksRouter,
});

export type AppRouter = typeof appRouter;
