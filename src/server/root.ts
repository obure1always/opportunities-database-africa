import { router } from './trpc'
import { opportunityRouter } from './routers/opportunity'
import { tagRouter } from './routers/tag'

export const appRouter = router({
  opportunity: opportunityRouter,
  tag: tagRouter,
})

export type AppRouter = typeof appRouter 