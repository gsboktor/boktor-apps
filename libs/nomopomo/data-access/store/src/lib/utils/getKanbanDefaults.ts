import { boardEnumAtom } from '../boardEnumAtom';
import { store } from '../defaultStore';
import { AccessibleTaskMap, DefaultKanbanBoards, Task } from '../types';

const default_id = crypto.randomUUID();

const DEFAULT: Record<keyof DefaultKanbanBoards, AccessibleTaskMap> = {
  Backlog: {
    [default_id]: {
      id: default_id,
      name: 'Welcome to Nomopomo!',
      desc: 'Open this task to learn the ropes of Nomopomo!',
      createdAt: Date.now(),
      parentBoardKey: 'Backlog',
      completedCycles: 0,
      index: 0,
      tags: [],
    } as Task,
  },
  Active: {},
  Done: {},
};

export const getKanbanDefaults = () => {
  return store.get(boardEnumAtom).reduce((acc, curr, idx) => {
    return { ...acc, [curr]: DEFAULT[curr] ?? {} };
  }, {} as DefaultKanbanBoards);
};
