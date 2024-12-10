import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

export const TodosActionBar = () => {
  const { addTodo } = useContext(TodosContext);
  return (
    <div>
      <button onClick={() => addTodo({ content: 'New Todo!' })}>Todo</button>
    </div>
  );
};
