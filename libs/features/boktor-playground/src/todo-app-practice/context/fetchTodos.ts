import { Todo } from './TodosContext';

export const fetchTodos = () => {
  if (sessionStorage.getItem('todos')) {
    return JSON.parse(sessionStorage.getItem('todos')!) as Todo[];
  }

  return [] as Todo[];
};
