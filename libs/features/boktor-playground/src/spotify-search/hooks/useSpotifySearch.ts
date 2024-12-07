import { useAsyncFn } from 'react-use';
import { spotifySearchClient } from '../service/SpotifySearchClient';

export const useSpotifySearch = (token: string, page: number) =>
  useAsyncFn(
    async (q: string) => {
      return await spotifySearchClient.searchWithQuery(token, q, page);
    },
    [page],
  );
