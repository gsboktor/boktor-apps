import { SpotifySearchResponse } from '../types';

interface SpotifySearchClient {
  searchWithQuery: (token: string, q: string, page: number) => Promise<SpotifySearchResponse>;
}

export const createSpotifySearchClient = (): SpotifySearchClient => {
  const searchWithQuery = async (token: string, q: string, page: number): Promise<SpotifySearchResponse> => {
    const res = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=30&offset=${page}`, {
      method: 'GET',
      headers: {
        ['Authorization']: `Bearer ${token}`,
      },
    });

    return (await res.json()) as SpotifySearchResponse;
  };

  return { searchWithQuery };
};

export const spotifySearchClient = createSpotifySearchClient();
