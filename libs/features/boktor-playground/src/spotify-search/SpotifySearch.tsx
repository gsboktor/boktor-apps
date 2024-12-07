import { useEffect, useState } from 'react';
import { createSpotifyAuthClient } from './service/SpotifyAuthClient';
import { Typeahead } from './Typeahead';

export const SpotifySearch = () => {
  const { getToken } = createSpotifyAuthClient();

  const [bearer, setBearer] = useState<string | undefined>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const res = await getToken();
      setBearer(res?.access_token);
      setLoading(false);
    };

    get();
  }, []);

  if (loading || !bearer) return <>Loading...</>;
  return <Typeahead token={bearer} />;
};
