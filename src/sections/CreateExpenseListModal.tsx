import React from 'react';
import {
  ExpenseListForm,
  ExpenseListFormSchema,
} from '../utils/validationSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../utils/trpc';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import { useSession } from 'next-auth/react';

interface IProps {
  handleClose: () => void;
  isCreatingListExpense: boolean;
}

const CreateExpenseListModal = ({
  handleClose,
  isCreatingListExpense,
}: IProps) => {
  const queryClient = trpc.useContext();
  const { data: session } = useSession();

  const createExpenseList = trpc.proxy.expenses.createExpenseList.useMutation({
    onSuccess() {
      console.log('success creating list so invalidating');
      queryClient.invalidateQueries(['expenses.fetchExpenseLists']);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<ExpenseListForm>({
    resolver: zodResolver(ExpenseListFormSchema),
    mode: 'onBlur',
    defaultValues: {
      expenses: [],
      userId: session?.user?.id,
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit: SubmitHandler<ExpenseListForm> = (data) => {
    createExpenseList.mutate({
      name: data.name,
      created_at: data.created_at,
      updated_at: data.updated_at,
      expenses: data.expenses,
      userId: data.userId,
    });
    handleClose();
    reset();
  };

  return (
    <Modal
      title="Create Expense List"
      open={isCreatingListExpense}
      onClose={() => {
        handleClose();
        reset();
      }}
      primaryBtnText="Create List"
      onPrimaryClick={handleSubmit(onSubmit)}
    >
      <form className="flex flex-col w-full">
        <FormField
          name="name"
          placeholder="List Name..."
          isSubmitting={isSubmitting}
          control={control}
        />
      </form>
    </Modal>
  );
};

export default CreateExpenseListModal;
