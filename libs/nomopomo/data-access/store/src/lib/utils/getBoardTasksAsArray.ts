import { Getter } from 'jotai/vanilla';
import { kanbanBoardsAtom } from '../kanbanAtom';
import { DefaultKanbanBoards } from '../types';

export const getBoardTasksAsArray = (key: keyof DefaultKanbanBoards, get: Getter) =>
  Array.from(Object.values(get(kanbanBoardsAtom)[key])) ?? [];
