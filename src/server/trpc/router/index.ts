// src/server/trpc/router/index.ts
import { t } from '../utils';
import { exampleRouter } from './example';
import { authRouter } from './auth';
import { expensesRouter } from './expenses';

export const appRouter = t.router({
    example: exampleRouter,
    auth: authRouter,
    expenses: expensesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
