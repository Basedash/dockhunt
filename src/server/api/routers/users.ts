import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(
      // Take either an id or a username
      z.union([
        z.object({ id: z.string() }),
        z.object({ username: z.string() }),
      ])
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { ...input },
        select: {
          username: true,
          name: true,
          description: true,
          url: true,
          avatarUrl: true,
          dock: {
            include: {
              dockItems: {
                include: {
                  app: true,
                },
                orderBy: { position: "asc" },
              },
            },
          },
        },
      });
    }),
});
