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
    });

    const createExpense = trpc.proxy.expenses.createExpense.useMutation({
        onSuccess: () => {
            router.push('/');
        },
    });

    const onSubmit: SubmitHandler<ExpenseForm> = (data) => {
        createExpense.mutate({
            ...data,
        });
    };

    return (
        <Layout title="Create Expense">
            <form
                className="flex flex-col w-full max-w-md"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    name="name"
                    placeholder="Name..."
                    isInvalid={Boolean(errors.name?.message)}
                    isSubmitting={isSubmitting}
                    control={control}
                />
                <FormField
                    name="price"
                    placeholder="Price..."
                    isInvalid={Boolean(errors.price?.message)}
                    isSubmitting={isSubmitting}
                    control={control}
                    leftAdornment="£"
                />
                <div className="flex justify-center py-8">
                    <FormField
                        name="type"
                        placeholder="Expense"
                        isInvalid={Boolean(errors.type?.message)}
                        isSubmitting={isSubmitting}
                        control={control}
                        type="radio"
                        value="EXPENSE"
                    />
                    <FormField
                        name="type"
                        placeholder="Income"
                        isInvalid={Boolean(errors.type?.message)}
                        isSubmitting={isSubmitting}
                        control={control}
                        type="radio"
                        value="INCOME"
                    />
                </div>
                <FormField
                    name="date"
                    placeholder="Date..."
                    isInvalid={Boolean(errors.date?.message)}
                    isSubmitting={isSubmitting}
                    control={control}
                    type="date"
                />
                <button
                    type="submit"
                    className="bg-purple-400 hover:bg-purple-500 text-lg text-white py-2 my-2 rounded-full"
                >
                    Submit
                </button>
            </form>
        </Layout>
    );
};

export default CreateExpense;
