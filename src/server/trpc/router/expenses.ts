import { authedProcedure, t } from '../utils';
import { ExpenseFormSchema } from '../../../utils/validationSchema';

export const expensesRouter = t.router({
    calculateStats: authedProcedure.query(async ({ ctx }) => {
        const expenses = await ctx.prisma.expense.findMany({
            where: {
                userId: ctx.session.user.id,
            },
        });

        const expenseStats = expenses.reduce(
            (sum, current) => {
                if (current.type === 'EXPENSE') {
                    sum.expense += Number(current.price);
                } else {
                    sum.income += Number(current.price);
                }
                return sum;
            },
            { income: 0, expense: 0 }
        );

        const balance = expenseStats.income - expenseStats.expense;

        return {
            totalExpenses: expenseStats.expense,
            totalIncome: expenseStats.income,
            balance,
        };
    }),
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
