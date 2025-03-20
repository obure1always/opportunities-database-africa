import { z } from 'zod'
import { router, protectedProcedure, publicProcedure } from '../trpc'

const opportunitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
  category: z.string().min(1),
  salary: z.string().optional(),
  requirements: z.string().optional(),
  deadline: z.date().optional(),
  url: z.string().url().optional(),
  published: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
})

export const opportunityRouter = router({
  create: protectedProcedure
    .input(opportunitySchema)
    .mutation(async ({ ctx, input }) => {
      const { tags, ...opportunityData } = input
      return ctx.prisma.opportunity.create({
        data: {
          ...opportunityData,
          userId: ctx.session.user.id,
          tags: {
            connectOrCreate: tags?.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })) ?? [],
          },
        },
        include: {
          tags: true,
        },
      })
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      ...opportunitySchema.shape,
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, tags, ...opportunityData } = input
      return ctx.prisma.opportunity.update({
        where: { id },
        data: {
          ...opportunityData,
          tags: {
            set: [],
            connectOrCreate: tags?.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })) ?? [],
          },
        },
        include: {
          tags: true,
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.opportunity.delete({
        where: { id: input.id },
      })
    }),

  getAll: publicProcedure
    .input(z.object({
      published: z.boolean().optional(),
      category: z.string().optional(),
      type: z.string().optional(),
      search: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const { published, category, type, search } = input
      return ctx.prisma.opportunity.findMany({
        where: {
          published,
          category,
          type,
          OR: search ? [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { company: { contains: search, mode: 'insensitive' } },
          ] : undefined,
        },
        include: {
          tags: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.opportunity.findUnique({
        where: { id: input.id },
        include: {
          tags: true,
        },
      })
    }),
}) 