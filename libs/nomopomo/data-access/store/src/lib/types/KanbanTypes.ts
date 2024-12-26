import { AccessibleTaskMap } from './TaskTypes';

export type PublicBoardOperations = {
  getBoardTasksByKey: (key: keyof DefaultKanbanBoards) => AccessibleTaskMap;
  getAllBoards: () => DefaultKanbanBoards;
};

export interface DefaultKanbanBoards {
  backlog: AccessibleTaskMap;
  done: AccessibleTaskMap;
  [boardName: string]: AccessibleTaskMap;
}
