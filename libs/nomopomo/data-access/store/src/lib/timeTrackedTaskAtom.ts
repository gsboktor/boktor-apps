import { atomWithStorage } from 'jotai/utils';
import { Task } from './types';
import { generateKey, storage } from './utils';

export const timeTrackedTaskAtom = atomWithStorage<Task | undefined>(
  generateKey('tracking-task'),
  undefined,
  storage<Task | undefined>(),
  {
    getOnInit: true,
  },
);
