import styled from 'styled-components';
import not_found from '../../assets/not_found.jpg';
import { useAsyncAtom } from '../hooks/useAsyncAtom';
import { NewsArticle } from '../service';
import { newsFeedAtom } from '../store/newsFeedAtom';

const NewsListGrid = styled.div`
  display: grid;
  @media screen and (width < 768px) {
    grid-template-columns: 1fr;
  }
  @media screen and (min-width: 768px) and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
  }
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 12px;
  row-gap: 12px;
  width: 100%;
`;

const NewsListItem = styled.div`
  border-radius: 12px;
  box-shadow: 0px 10px 12px lightgray;
  display: flex;
  flex-direction: column;
  padding: 8px;
  &:hover {
    transform: scale(1.05);
  }
  transition: transform ease-in-out 300ms;
`;

const NewsListItemImage = styled.img`
  border-radius: 8px;
  width: 100%;
  max-height: 200px;
`;

const NewsListContent = styled.p`
  margin: 0px;
  display: inline;
`;

export const NewsList = () => {
  const { loading, error, data } = useAsyncAtom<Promise<NewsArticle[] | undefined>>(newsFeedAtom);
  //   const [, updateCache] = useAtom(cacheAtom);

  //   useMemo(async () => {
  //     await updateCache();
  //   }, [data]);

  if (loading) return <h1>LOADING!...</h1>;

  return (
    <NewsListGrid>
      {data?.map((newsArticle, idx) => (
        <>
          {newsArticle && (
            <NewsListItem key={idx}>
              <NewsListItemImage src={newsArticle.urlToImage ?? not_found} loading="lazy" />
              <NewsListContent>{newsArticle.description}</NewsListContent>
            </NewsListItem>
          )}
        </>
      ))}
    </NewsListGrid>
  );
};
