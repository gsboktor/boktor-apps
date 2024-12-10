import { useContext } from 'react';
import styled from 'styled-components';
import { TodosContext } from '../context/TodosContext';
import { TodoItem } from './TodoItem';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 24px;
`;

export const TodosList = () => {
  const { todos, maxPages, setCurrPage, currPage } = useContext(TodosContext);
  console.log('TODOS RERENDER!');

  return (
    <>
      <h1>Page {currPage + 1}</h1>
      <ListContainer>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ListContainer>
      {Array.from({ length: maxPages }).map((_, idx) => {
        return (
          <button key={idx} disabled={currPage === idx} onClick={() => setCurrPage(idx)}>
            {idx + 1}
          </button>
        );
      })}
    </>
  );
};
