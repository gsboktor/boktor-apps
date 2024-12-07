import { Buffer } from 'buffer';
import { z, ZodError } from 'zod';
interface SpotifyAuthClient {
  getToken: () => Promise<TokenResponse | undefined>;
}

const TokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export const createSpotifyAuthClient = (): SpotifyAuthClient => {
  const getToken = async (): Promise<TokenResponse | undefined> => {
    try {
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          ['Content-Type']: 'application/x-www-form-urlencoded',
          ['Authorization']: `Basic ${Buffer.from(
            process.env.NX_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NX_PUBLIC_SPOTIFY_CLIENT_SECRET!,
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }).toString(),
      });
      const data = await res.json();
      TokenResponseSchema.parse(data);

      return data as TokenResponse;
    } catch (e) {
      if (e instanceof ZodError) {
        console.log('ZOD ERROR', e);
      } else {
        console.log('NORMAL ERROR');
        throw e;
      }
    }
  };

  return { getToken };
};
