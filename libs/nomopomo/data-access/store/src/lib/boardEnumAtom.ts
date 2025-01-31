import { atomWithStorage } from 'jotai/utils';
import { generateKey, storage } from './utils';

export const boardEnumAtom = atomWithStorage<string[]>(
  generateKey('board-order'),
  ['Backlog', 'Done', 'Active'],
  storage<string[]>(),
  { getOnInit: true },
);
