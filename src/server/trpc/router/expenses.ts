import { authedProcedure, t } from '../utils';

export const expensesRouter = t.router({
    fetchExpenses: authedProcedure.query(async ({ ctx }) => {
        const expenses = await ctx.prisma.expense.findMany({
            where: {
                userId: ctx.session.user.id,
            },
        });

        return expenses;
    }),
});
