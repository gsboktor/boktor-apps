import { TodosActionBar, TodosList } from './components';
import { TodosProvider } from './context/TodosContext';

export const TodoApp = () => {
  return (
    <TodosProvider>
      <TodosActionBar />
      <TodosList />
    </TodosProvider>
  );
};
