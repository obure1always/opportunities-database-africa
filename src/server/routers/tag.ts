import { z } from 'zod'
import { router, protectedProcedure, publicProcedure } from '../trpc'

export const tagRouter = router({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.tag.create({
        data: input,
      })
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.tag.findMany({
      orderBy: {
        name: 'asc',
      },
    })
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.tag.delete({
        where: { id: input.id },
      })
    }),
}) 