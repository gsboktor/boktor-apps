import { AccessibleTaskMap, Task } from './TaskTypes';

export type PublicBoardOperations = {
  getBoardTasksByKey: (key: keyof DefaultKanbanBoards) => AccessibleTaskMap;
  getAllBoards: () => DefaultKanbanBoards;
  getBoardConfigByKey: (key: keyof DefaultKanbanBoards) => Config;
  getBoardTasksAsArray: (key: keyof DefaultKanbanBoards) => Task[];
};

export interface DefaultKanbanBoards {
  Backlog: AccessibleTaskMap;
  Done: AccessibleTaskMap;
  Active: AccessibleTaskMap;
  [boardName: string]: AccessibleTaskMap;
}

export type Config = {
  theme?: string;
  taskCount: number;
};

export type BoardConfig = {
  [x: keyof DefaultKanbanBoards]: Config;
};
