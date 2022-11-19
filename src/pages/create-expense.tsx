import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../components/FormField';
import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';
import { ExpenseForm, ExpenseFormSchema } from '../utils/validationSchema';

const CreateExpense = () => {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ExpenseForm>({
        resolver: zodResolver(ExpenseFormSchema),
        mode: 'onBlur',
        defaultValues: {
            // Must provide date in format YYYY-MM-DD
            date: new Date().toISOString().split('T')[0],
        },
    });

    const createExpense = trpc.proxy.expenses.createExpense.useMutation({
        onSuccess: () => {
            router.push('/expenses');
        },
    });

    const onSubmit: SubmitHandler<ExpenseForm> = (data) => {
        createExpense.mutate({
            ...data,
        });
    };

    return (
        <Layout
            className="flex-col justify-center items-center"
            loading={createExpense.isLoading}
        >
            <h1 className="text-green-300 text-2xl sm:text-[1.75rem] md:text-[2.5rem] font-bold text-center p-4">
                Create Expense
            </h1>
            <form
                className="flex flex-col w-full max-w-md"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    name="name"
                    placeholder="Name..."
                    isSubmitting={isSubmitting}
                    control={control}
                />
                <FormField
                    name="price"
                    placeholder="Price..."
                    isSubmitting={isSubmitting}
                    control={control}
                    leftAdornment="£"
                />
                <div className="flex justify-center py-8">
                    <FormField
                        name="type"
                        placeholder="Expense"
                        isSubmitting={isSubmitting}
                        control={control}
                        type="radio"
                        value="EXPENSE"
                    />
                    <FormField
                        name="type"
                        placeholder="Income"
                        isSubmitting={isSubmitting}
                        control={control}
                        type="radio"
                        value="INCOME"
                    />
                </div>
                <FormField
                    name="date"
                    placeholder="Date..."
                    isSubmitting={isSubmitting}
                    control={control}
                    type="date"
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </Layout>
    );
};

export default CreateExpense;
