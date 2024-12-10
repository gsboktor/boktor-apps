import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { NewsArticle } from '../service';
import { newsFeedAtom } from './newsFeedAtom';
import { queryStringAtom } from './queryStringAtom';

export const storage = <T>() => createJSONStorage<T>(() => sessionStorage);

export const searchCacheAtom = atomWithStorage(
  'boktor-cache',
  {} as Record<string, NewsArticle[]>,
  storage<Record<string, NewsArticle[]>>(),
  { getOnInit: true },
);

export const cacheAtom = atom(null, async (get, set, _: void) => {
  console.log('IN WRITABLE CACHE ATOM');
  const q = get(queryStringAtom);
  const newsItems = await get(newsFeedAtom);
  const currCache = get(searchCacheAtom);

  if (q && newsItems) set(searchCacheAtom, { ...currCache, [q]: newsItems });
});
