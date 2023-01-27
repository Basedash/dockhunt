import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const docksRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.dock.findUnique({ where: { id: input.id } });
    }),
  getFeatured: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.dock.findMany({
      where: { featured: true },
      include: {
        user: true,
        dockItems: {
          include: {
            app: true,
          },
          orderBy: { position: "asc" },
        },
      },
    });
  }),
});
