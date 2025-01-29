import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai/vanilla';
import { kanbanConfigAtom } from './kanbanConfigAtom';
import { AccessibleTaskMap, DefaultKanbanBoards, PublicBoardOperations, Task } from './types';
import { generateKey, getBoardTasksByKey, storage } from './utils';
import { getBoardTasksAsArray } from './utils/getBoardTasksAsArray';

export const kanbanBoardsAtom = atomWithStorage<DefaultKanbanBoards>(
  generateKey('boards'),
  {
    Backlog: {},
    Done: {},
  } as DefaultKanbanBoards,
  storage<DefaultKanbanBoards>(),
  { getOnInit: true },
);

export const boardOperations = atom<PublicBoardOperations>((get) => ({
  getBoardTasksByKey: (key: keyof DefaultKanbanBoards) => getBoardTasksByKey(key, get),
  getBoardTasksAsArray: (key: keyof DefaultKanbanBoards) => getBoardTasksAsArray(key, get),
  getAllBoards: () => get(kanbanBoardsAtom),
  getBoardConfigByKey: (key: keyof DefaultKanbanBoards) => get(kanbanConfigAtom)[key],
}));

export const addBoardTaskAtom = atom<null, [{ boardKey: string; newTask: Task }], void>(null, (get, set, update) => {
  const boards = get(kanbanBoardsAtom);

  const updatedBoards = {
    ...boards,
    [update.boardKey]: {
      ...boards[update.boardKey],
      [update.newTask.id]: update.newTask,
    },
  };

  set(kanbanBoardsAtom, updatedBoards);
});

export const updateBoardTaskAtom = atom<null, [{ boardKey: string; updateTask: Partial<Task> }], void>(
  null,
  (get, set, update) => {
    if (!update.updateTask.id) throw new Error();

    const boards = get(kanbanBoardsAtom);
    const oldTask = boards[update.boardKey][update.updateTask.id];

    const updatedBoards = {
      ...boards,
      [update.boardKey]: {
        ...boards[update.boardKey],
        [update.updateTask.id]: { ...oldTask, ...update.updateTask },
      },
    };

    set(kanbanBoardsAtom, updatedBoards);
  },
);
export const moveBoardTaskAtom = atom<
  null,
  [{ oldBoardKey: string; newBoardKey: string; taskId: string; insertPosition?: number }],
  void
>(null, (get, set, update) => {
  const boards = get(kanbanBoardsAtom);

  const taskToMove = boards[update.oldBoardKey][update.taskId];

  const updatedBoards = {
    ...boards,
    [update.newBoardKey]: {
      ...boards[update.newBoardKey],
      [update.taskId]: { ...taskToMove, parentBoardKey: update.newBoardKey },
    },
  };

  update.oldBoardKey !== update.newBoardKey && delete updatedBoards[update.oldBoardKey][update.taskId];

  set(kanbanBoardsAtom, updatedBoards);
});

export const deleteBoardTaskAtom = atom<null, [{ boardKey: string; taskId: string }], void>(
  null,
  (get, set, update) => {
    const boards = get(kanbanBoardsAtom);

    const updatedBoards = {
      ...boards,
    };

    delete updatedBoards[update.boardKey][update.taskId];
    set(kanbanBoardsAtom, updatedBoards);
  },
);

export const setBoardTasksByKey = atom<null, [{ boardKey: string; tasks: Task[] }], void>(null, (get, set, update) => {
  const kanbanBoards = get(kanbanBoardsAtom);

  const updatedBoards = {
    ...kanbanBoards,
    [update.boardKey]: {
      ...update.tasks.reduce((acc, curr) => {
        return { ...acc, [curr.id]: curr } as AccessibleTaskMap;
      }, {}),
    },
  };

  set(kanbanBoardsAtom, updatedBoards);
});
