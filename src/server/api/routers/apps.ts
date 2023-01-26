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
  getManyFromNames: publicProcedure.input(z.object({names: z.array(z.string())})).query(({ ctx, input }) => {
    const names = input.names;
    return ctx.prisma.app.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });
  })
});
