import { createTRPCRouter } from "./trpc";
import { appsRouter } from "./routers/apps";
import { docksRouter } from "./routers/docks";
import { usersRouter } from "./routers/users";

export const appRouter = createTRPCRouter({
  apps: appsRouter,
  docks: docksRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
