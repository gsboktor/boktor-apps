import { createJSONStorage } from 'jotai/utils';

export const storage = <T>() => {
  return createJSONStorage<T>(() => localStorage);
};
