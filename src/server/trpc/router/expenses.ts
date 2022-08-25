import { authedProcedure, t } from '../utils';
import { ExpenseFormSchema } from '../../../utils/validationSchema';

export const expensesRouter = t.router({
    fetchExpenses: authedProcedure.query(async ({ ctx }) => {
        const expenses = await ctx.prisma.expense.findMany({
            where: {
                userId: ctx.session.user.id,
            },
        });

        return expenses;
    }),
    createExpense: authedProcedure
        .input(ExpenseFormSchema)
        .mutation(async ({ ctx, input }) => {
            const createdExpense = await ctx.prisma.expense.create({
                data: {
                    name: input.name,
                    price: input.price,
                    date: new Date(input.date),
                    type: input.type,
                    userId: ctx.session.user.id,
                },
            });

            return createdExpense;
        }),
});
