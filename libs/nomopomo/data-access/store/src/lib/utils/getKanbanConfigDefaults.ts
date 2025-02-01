import { boardEnumAtom } from '../boardEnumAtom';
import { store } from '../defaultStore';
import { BoardConfig, Config } from '../types';

const CONFIG: Record<string, Config> = {
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
};

export const getKanbanConfigDefaults = () => {
  return store
    .get(boardEnumAtom)
    .reduce((acc, curr) => ({ ...acc, [curr]: CONFIG[curr] ?? { taskCount: 0 } }), {} as BoardConfig);
};
