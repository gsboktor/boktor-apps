import { Getter } from 'jotai/vanilla';
import { kanbanBoardsAtom } from '../kanbanAtom';
import { DefaultKanbanBoards } from '../types';

export const getBoardTasksByKey = (key: keyof DefaultKanbanBoards, get: Getter) => get(kanbanBoardsAtom)[key] ?? {};
