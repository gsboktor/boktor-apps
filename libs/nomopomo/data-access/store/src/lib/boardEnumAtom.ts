import { atomWithStorage } from 'jotai/utils';
import { generateKey, storage } from './utils';

export const boardEnumAtom = atomWithStorage<string[]>(
  generateKey('board-keys'),
  ['Backlog', 'Active', 'Done'],
  storage<string[]>(),
  { getOnInit: true },
);
