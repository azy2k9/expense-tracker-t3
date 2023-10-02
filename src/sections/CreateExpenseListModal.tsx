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
import useAppState from '../hooks/useAppState';
interface IProps {
  handleClose: () => void;
  isCreatingListExpense: boolean;
}

const CreateExpenseListModal = ({
  handleClose,
  isCreatingListExpense,
}: IProps) => {
  const { setAppState } = useAppState();
  const queryClient = trpc.useContext();
  const { data: session } = useSession();

  const expenseLists = queryClient.getQueryData(['expenses.fetchExpenseLists']);
  console.log({ expenseLists });

  const createExpenseList = trpc.proxy.expenses.createExpenseList.useMutation({
    async onSuccess() {
      const newExpenseList = await queryClient.fetchQuery([
        'expenses.fetchExpenseLists',
      ]);
      setAppState({ lists: newExpenseList });
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    setValue,
    getValues,
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
      onPrimaryClick={() => {
        const data = getValues();
        onSubmit(data);
      }}
    >
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="name"
          placeholder="List Name..."
          isSubmitting={isSubmitting}
          control={control}
          onChange={(fieldName, fieldValue) => {
            // @ts-expect-error need to fix these typings
            setValue(fieldName, fieldValue);
          }}
        />
      </form>
    </Modal>
  );
};

export default CreateExpenseListModal;
