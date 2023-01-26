import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const appsRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.app.findUnique({ where: { name: input.name } });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.app.findMany();
  }),
});
