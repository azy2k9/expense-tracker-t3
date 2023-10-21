import { trpc } from '../utils/trpc';
import useAppState from './useAppState';

export const useExpenseLists = () => {
  const { setAppState } = useAppState();

  const expenseLists = trpc.proxy.expenses.fetchExpenseLists.useQuery(
    undefined,
    {
      onSuccess(data) {
        const selectedList = data[0]?.id || '';
        setAppState({ selectedListId: selectedList, lists: data });
      },
    }
  );

  return {
    hasExpenseLists: expenseLists.data?.length === 0,
    ...expenseLists,
  };
};
