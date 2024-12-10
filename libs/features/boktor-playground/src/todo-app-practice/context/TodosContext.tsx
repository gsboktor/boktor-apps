import { compareAsc, format } from 'date-fns';
import { createContext, useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchTodos } from './fetchTodos';

export enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type Todo = {
  id: string;
  content: string;
  status: Status;
  created_at: string;
  updated_at: string;
};

export type CreateTodoPayload = Pick<Todo, 'content'>;

export type UpdateTodoPayload = Omit<Todo, 'created_at' | 'updated_at'>;

export type DeleteTodoPayload = Pick<Todo, 'id'>;

export type TodosContextType = {
  addTodo: (todo: CreateTodoPayload) => void;
  deleteTodo: (deleteTodo: DeleteTodoPayload) => void;
  updateTodo: (updatedTodo: UpdateTodoPayload) => void;
  todos: Todo[];
  maxPages: number;
  currPage: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
};

export const TodosContext = createContext<TodosContextType>({} as TodosContextType);

const OFF_SET = 5;

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => fetchTodos());
  const [currPage, setCurrPage] = useState<number>(0);

  const addTodo = useCallback(
    (todo: CreateTodoPayload) => {
      let created_at = format(Date.now(), 'PPpp');
      let payload = {
        id: uuidv4(),
        created_at: created_at,
        updated_at: created_at,
        content: todo.content,
        status: Status.IN_PROGRESS,
      } as Todo;

      if (!sessionStorage.getItem('todos')) {
        sessionStorage.setItem('todos', JSON.stringify([payload]));
      } else {
        const currTodos = JSON.parse(sessionStorage.getItem('todos')!) as Todo[];
        currTodos.push(payload);
        sessionStorage.setItem('todos', JSON.stringify(currTodos));
      }

      setTodos((prev) => [...prev, payload]);
    },
    [setTodos],
  );

  const updateTodo = useCallback(
    (updatedTodo: UpdateTodoPayload) => {
      let updated_at = format(Date.now(), 'PPpp');
      let idx = todos.findIndex((todo) => todo.id === updatedTodo.id);

      todos[idx] = { ...todos[idx], ...updatedTodo, updated_at: updated_at };

      let currTodos = JSON.parse(sessionStorage.getItem('todos')!) as Todo[];
      let sessionIdx = currTodos.findIndex((todo) => todo.id === updatedTodo.id);

      currTodos[sessionIdx] = { ...todos[idx], ...updatedTodo, updated_at: updated_at };

      sessionStorage.setItem('todos', JSON.stringify(currTodos));
      setTodos([...todos]);
    },
    [setTodos, todos],
  );

  const deleteTodo = useCallback(
    (deleteTodo: DeleteTodoPayload) => {
      let cachedTodos = JSON.parse(sessionStorage.getItem('todos')!) as Todo[];
      let removeIdx = cachedTodos.findIndex((todo) => todo.id === deleteTodo.id);

      cachedTodos.splice(removeIdx, 1);
      sessionStorage.setItem('todos', JSON.stringify(cachedTodos));

      let newTodos = [...todos];
      let newTodosRemoveIdx = newTodos.findIndex((todo) => todo.id === deleteTodo.id);
      newTodos.splice(newTodosRemoveIdx, 1);

      setTodos([...newTodos]);
    },
    [todos, setTodos],
  );

  const value = useMemo(
    () =>
      ({
        maxPages: Math.ceil(todos.length / OFF_SET),
        currPage: currPage,
        setCurrPage,
        addTodo: addTodo,
        updateTodo: updateTodo,
        deleteTodo: deleteTodo,
        todos: todos
          .sort((t1, t2) => compareAsc(t2.updated_at, t1.updated_at))
          .slice(currPage * OFF_SET, currPage * OFF_SET + OFF_SET),
      } as TodosContextType),

    [addTodo, updateTodo, deleteTodo, todos, currPage, setCurrPage],
  );

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
};
