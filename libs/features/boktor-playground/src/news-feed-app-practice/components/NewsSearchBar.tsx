import { useSetAtom } from 'jotai';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { queryStringAtom } from '../store';

const SearchBarContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: fit-content;
`;

const SearchBar = styled.input`
  border: 1px solid black;
  outline: none;
  padding: 8px;
  border-radius: 12px;
  width: 100%;
`;

export const NewsSearchBar = () => {
  const setQuery = useSetAtom(queryStringAtom);


  return (
    <SearchBarContainer>
      <SearchBar placeholder="Enter a query" onChange={debounce((e) => setQuery(`?q=${e.target.value}`), 750)} />
    </SearchBarContainer>
  );
};
