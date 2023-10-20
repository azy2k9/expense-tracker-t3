import { trpc } from '../utils/trpc';
import useAppState from './useAppState';

export const useExpenses = () => {
  const { appState } = useAppState();
  const queryClient = trpc.useContext();

  return trpc.proxy.expenses.fetchExpenses.useQuery(
    { listId: appState.selectedListId },
    {
      enabled: !!appState.selectedListId,
      onSuccess() {
        queryClient.invalidateQueries(['expenses.calculateStats']);
      },
    }
  );
};
