import { Getter } from 'jotai/vanilla';
import { kanbanBoardsAtom } from '../kanbanAtom';

export const getBoardTasksAsArray = (key: string, get: Getter) => Object.values(get(kanbanBoardsAtom)[key] ?? {}) ?? [];
