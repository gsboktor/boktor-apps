import { Atom, useAtom } from 'jotai';
import { loadable } from 'jotai/utils';

export const useAsyncAtom = <T>(atom: Atom<T>) => {
  const loaded = loadable(atom);
  const [loadableState] = useAtom(loaded);

  return {
    loading: loadableState.state === 'loading',
    error: loadableState.state === 'hasError',
    data: loadableState.state === 'hasData' ? loadableState.data : undefined,
  };
};
