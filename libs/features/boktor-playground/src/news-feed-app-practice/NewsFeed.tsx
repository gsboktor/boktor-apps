import { useState } from 'react';
import styled from 'styled-components';
import { NewsList, NewsSearchBar } from './components';

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

let count = 0;

export const NewsFeed = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const myCallback = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        count += 1;
        resolve(`Data + ${count}`);
      }, 1500);
    });
  };

  return (
    <>
      <input
        type="submit"
        onClick={async () => {
          if (!loading) {
            setLoading(true);
            let data = await myCallback();
            console.log(data);
            setLoading(false);
          } else {
            return;
          }
        }}
      />
      <NewsContainer>
        <NewsSearchBar />
        <NewsList />
      </NewsContainer>
    </>
  );
};
