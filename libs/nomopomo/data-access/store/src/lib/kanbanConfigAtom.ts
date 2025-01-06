import { atom } from 'jotai';
import { BoardConfig } from './types';

export const kanbanConfigAtom = atom<BoardConfig>({
  Backlog: {
    theme: '#a6d6c9',
  },
  Done: {
    theme: '#e0c7bf',
  },
});
