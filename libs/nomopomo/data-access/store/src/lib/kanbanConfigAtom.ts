import { atomWithStorage } from 'jotai/utils';
import { BoardConfig } from './types';
import { storage } from './utils';

export const kanbanConfigAtom = atomWithStorage<BoardConfig>(
  'nomo-board-configs',
  {
    Backlog: {
      theme: '#a6d6c9',
      taskCount: 0,
    },
    Done: {
      theme: '#e0c7bf',
      taskCount: 0,
    },
    Active: {
      taskCount: 0,
    },
  },
  storage<BoardConfig>(),
  { getOnInit: true },
);
