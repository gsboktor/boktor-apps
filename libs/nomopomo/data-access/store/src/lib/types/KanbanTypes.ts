import { AccessibleTaskMap, Task } from './TaskTypes';

export type PublicBoardOperations = {
  getBoardTasksByKey: (key: keyof DefaultKanbanBoards) => AccessibleTaskMap;
  getAllBoards: () => DefaultKanbanBoards;
  getBoardConfigByKey: (key: keyof DefaultKanbanBoards) => Config;
  getBoardTasksAsArray: (key: string) => Task[];
};

export interface DefaultKanbanBoards {
  [boardName: string]: AccessibleTaskMap;
}

export type Config = {
  theme?: string;
  taskCount: number;
};

export type BoardConfig = {
  [x: keyof DefaultKanbanBoards]: Config;
};
