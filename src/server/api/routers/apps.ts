import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const appsRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const app = await ctx.prisma.app.findUnique({
        where: { name: input.name },
      });
      const docks = await ctx.prisma.dock.findMany({
        where: { dockItems: { some: { app: { name: input.name } } } },
        include: {
          user: true,
          dockItems: {
            include: {
              app: true,
            },
            orderBy: { position: "asc" },
          },
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: 20,
      });
      const dockCount = await ctx.prisma.dock.count({
        where: { dockItems: { some: { app: { name: input.name } } } },
      });

      return { app, docks, dockCount };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const apps = await ctx.prisma.app.findMany();
    return apps;
  }),
  getTop: publicProcedure.query(async ({ ctx }) => {
    const apps = await ctx.prisma.app.findMany({
      include: {
        _count: {
          select: { dockItems: true },
        },
      },
      orderBy: {
        dockItems: {
          _count: "desc",
        },
      },
      take: 100,
    });
    return apps;
  }),
  getManyFromNames: publicProcedure
    .input(z.object({ names: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      const names = input.names;
      const app = await ctx.prisma.app.findMany({
        where: {
          name: {
            in: names,
          },
        },
      });
      return app;
    }),
});
