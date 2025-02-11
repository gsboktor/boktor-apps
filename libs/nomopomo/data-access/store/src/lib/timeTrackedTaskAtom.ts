import { atomWithStorage } from 'jotai/utils';
import { Task } from './types';
import { generateKey, storage } from './utils';

export const timeTrackedTaskAtom = atomWithStorage<Task | undefined>(
  generateKey('tracking-task'),
  {
    id: '123123',
    name: 'Welcome to Nomopomo!',
    desc: 'Open this task to learn the ropes of Nomopomo!',
    createdAt: Date.now(),
    parentBoardKey: 'Backlog',
    completedCycles: 0,
    estimatedCycles: 0,
    index: 0,
    tags: [],
  },
  storage<Task | undefined>(),
  {
    getOnInit: true,
  },
);
