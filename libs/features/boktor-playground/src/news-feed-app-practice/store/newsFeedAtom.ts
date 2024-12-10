import { atom } from 'jotai';
import { NewsArticle, newsService } from '../service';
import { store } from './defaultStore';
import { queryStringAtom } from './queryStringAtom';
import { searchCacheAtom } from './searchCacheAtom';

export const newsFeedAtom = atom<Promise<NewsArticle[] | undefined>>(async (get) => {
  let q = get(queryStringAtom);
  let cache = get(searchCacheAtom);

  if (q && cache[q]) {
    console.log(q, cache[q]);
    return cache[q];
  }

  if (q) {
    let data = await newsService.getNews(q ?? '');
    store.set(searchCacheAtom, { ...cache, [q]: data });
  }
});
