import { authedProcedure, t } from '../utils';
import { ExpenseFormSchema } from '../../../utils/validationSchema';
import z from 'zod';

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
            totalExpenses: expenseStats.expense.toFixed(2),
            totalIncome: expenseStats.income.toFixed(2),
            balance: balance.toFixed(2),
        };
    }),
    fetchExpenses: authedProcedure.query(async ({ ctx }) => {
        const expenses = await ctx.prisma.expense.findMany({
            where: {
                userId: ctx.session.user.id,
            },
            orderBy: {
                // Income first
                type: 'desc',
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

    editExpense: authedProcedure
        .input(ExpenseFormSchema.merge(z.object({ id: z.string() })))
        .mutation(async ({ ctx, input }) => {
            const updatedExpense = ctx.prisma.expense.update({
                where: {
                    id: input.id,
                },
                data: {
                    ...input,
                    date: new Date(input.date),
                },
            });

            return updatedExpense;
        }),
    deleteExpense: authedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const expense = await ctx.prisma.expense.delete({
                where: {
                    id: input.id,
                },
            });

            if (expense.id === input.id) {
                return expense;
            }

            throw new Error('Failed to delete expense');
        }),
});
