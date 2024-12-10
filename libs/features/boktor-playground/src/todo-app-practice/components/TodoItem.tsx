import { useContext, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Status, Todo, TodosContext } from '../context/TodosContext';

const TodoItemContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 3fr;
  column-gap: 8px;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0px 2px 12px 0px gray;
  &:hover {
    transform: scale(1.025);
    box-shadow: 0px 3px 16px 0px gray;
  }
  transition: transform ease-in-out 200ms, box-shadow ease-in-out 200ms;

  & > input.field__input {
    background-color: white;
    outline: none;
    border: 1px solid black;
    border-radius: 12px;
    text-align: start;
    height: fit-content;
    padding: 8px;
    :disabled {
      color: black;
      border: none;
    }
  }
`;

const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 12px;
`;

const MetaDataContainer = styled.div<{ $status: Status }>`
  display: grid;
  grid-template-rows: 1fr;
  justify-content: flex-end;
  text-align: end;
  > p {
    :first-of-type {
      font-size: 16px;
      ${({ $status }) => {
        if ($status === Status.DONE)
          return css`
            color: green;
          `;
        return css`
          color: red;
        `;
      }}
    }
    margin: 0px;
    font-size: 12px;
  }
`;

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const [editable, setEditable] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { updateTodo, deleteTodo } = useContext(TodosContext);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = todo.content;
  }, []);

  return (
    <TodoItemContainer>
      <ActionsContainer>
        <button onClick={() => deleteTodo({ id: todo.id })}>Delete</button>
        <button onClick={() => setEditable(!editable)}>Edit</button>
        <button
          onClick={() =>
            updateTodo({ ...todo, status: todo.status === Status.IN_PROGRESS ? Status.DONE : Status.IN_PROGRESS })
          }
        >
          {todo.status === Status.IN_PROGRESS ? 'Mark as Done' : 'Mark as In Progress'}
        </button>
        {editable && (
          <button
            onClick={() => {
              updateTodo({ ...todo, content: inputRef.current?.value ?? todo.content });
              setEditable(false);
            }}
          >
            Submit Changes!
          </button>
        )}
      </ActionsContainer>
      <input
        disabled={!editable}
        className="field__input"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            inputRef.current?.value !== todo.content &&
              updateTodo({ ...todo, content: inputRef.current?.value ?? todo.content });
            setEditable(false);
          }
        }}
      />
      <MetaDataContainer $status={todo.status}>
        <p>{`Status: ` + todo.status}</p>
        <p>{`ID: ` + todo.id}</p>
        <p>{`Created: ` + todo.created_at}</p>
        <p>{`Updated: ` + todo.updated_at}</p>
      </MetaDataContainer>
    </TodoItemContainer>
  );
};
