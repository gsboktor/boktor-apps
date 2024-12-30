import { atom } from 'jotai';
import { BoardConfig } from './types';

export const kanbanConfigAtom = atom<BoardConfig>({
  backlog: {
    theme: '#a6d6c9',
  },
  done: {
    theme: '#e0c7bf',
  },
});
