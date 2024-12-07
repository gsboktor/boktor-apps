import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { useSpotifySearch } from './hooks/useSpotifySearch';
import { Item } from './types';

const TypeheadAndResultsContainer = styled.div`
  position: relative;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TypeaheadInput = styled.input`
  max-width: 100%;
  box-shadow: 0px 0px 0px 2px inset black;
  border-radius: 12px;
  height: 32px;
  padding: 4px 16px;
  border: none;
  outline: none;
`;

const ResultsBox = styled.div`
  position: absolute;
  top: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  box-shadow: 0px 10px 24px 2px lightgray;
  border-radius: 16px;
  overflow: scroll;
  max-height: 400px;
`;

const ResultContent = styled.p`
  display: inline;
  margin: inherit;
  font-size: 18px;
  color: #5f5f5f;
  text-overflow: ellipsis;
`;

const ResultSubContent = styled.p`
  margin: inherit;
  font-size: 14px;
  color: lightgray;
`;

const TypeaheadResult = styled.div`
  max-width: 100%;
  max-height: 48px;
  padding: 16px;
  display: flex;
  gap: 2px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  &:hover {
    background-color: #e7e7e7b0;
    box-shadow: 0px 0px 0px 8px inset white;
    cursor: pointer;
    border-radius: 20px;
    > p:first-child {
      color: black;
    }
  }

  transition: transform ease-in 200ms, box-shadow ease-in 200ms;
`;

let lock = false;
const debounce = (fn: () => void | undefined, timer?: number) => {
  if (!lock) {
    lock = true;
    setTimeout(() => {
      fn();
      lock = false;
    }, timer);
  }
};

const useDebounce = (cf: () => void, timer: number) => {
  const functionRef = useRef<() => void>();

  useEffect(() => {
    functionRef.current = cf;
  }, [cf]);

  const debounceRequest = useCallback(() => {
    const fn = () => {
      functionRef.current?.();
    };
    debounce(fn, timer);
  }, [timer]);

  return { debounceRequest };
};

export const Typeahead = ({ token }: { token?: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const tRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState<number>(0);

  if (!token) throw new Error();

  const [searchState, searchFn] = useSpotifySearch(token, page);

  const [results, setResults] = useState([] as Item[]);
  const [dismiss, setDismiss] = useState<boolean>(true);

  const lastItemRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const matchResults = useCallback(() => {
    if (!inputRef.current) return;
    setDismiss(false);
    searchFn(inputRef.current?.value);
  }, [setDismiss, searchFn]);

  const { debounceRequest } = useDebounce(() => {
    console.log('inputRef at this increment', inputRef.current?.value);
    matchResults();
  }, 750);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (tRef) {
        if (!tRef.current?.contains(e.target as Node)) {
          setDismiss(true);
        }
      }
    };
    document.body.addEventListener('mousedown', handleMouseDown);
    return () => document.body.removeEventListener('mousedown', handleMouseDown);
  }, []);

  const getNextSuggestions = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        if (!inputRef.current) return;
        setPage(page + 1);
        searchFn(inputRef.current?.value);
      }
    },
    [page],
  );

  useEffect(() => {
    let observer = null;
    console.log(scrollContainerRef.current, lastItemRef.current);

    if (scrollContainerRef.current) {
      console.log(scrollContainerRef);
      observer = new IntersectionObserver(getNextSuggestions, {
        root: scrollContainerRef.current,
        threshold: 0.5,
      });

      if (lastItemRef.current) observer.observe(lastItemRef.current!);
    }

    return () => observer?.disconnect();
  }, [lastItemRef.current, scrollContainerRef.current]);

  useMemo(() => {
    if (searchState.value?.tracks?.items) {
      setResults((prev) => [...prev, ...(searchState.value?.tracks.items ?? [])]);
    } else {
      setResults([]);
    }
  }, [searchState, inputRef.current]);

  return (
    <TypeheadAndResultsContainer ref={tRef}>
      <TypeaheadInput
        ref={inputRef}
        placeholder="Enter text"
        // value={inputRef.current?.value}
        onChange={() => {
          debounceRequest();
        }}
      />
      {results.length > 0 && !dismiss && (
        <ResultsBox role="listbox" ref={scrollContainerRef}>
          {results.map((res, idx) => {
            return (
              <TypeaheadResult
                role="listitem"
                key={idx}
                ref={idx === results.length! - 1 ? lastItemRef : null}
                onClick={() => {
                  if (inputRef.current) inputRef.current.value = res.album.name.trim();
                  setDismiss(true);
                }}
              >
                <ResultContent>{res.artists[0].name}</ResultContent>
                <ResultSubContent>{res.album.name}</ResultSubContent>
              </TypeaheadResult>
            );
          })}
        </ResultsBox>
      )}
    </TypeheadAndResultsContainer>
  );
};
