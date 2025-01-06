import { AccessibleTaskMap } from './TaskTypes';

export type PublicBoardOperations = {
  getBoardTasksByKey: (key: keyof DefaultKanbanBoards) => AccessibleTaskMap;
  getAllBoards: () => DefaultKanbanBoards;
  getBoardConfigByKey: (key: keyof DefaultKanbanBoards) => Config;
};

export interface DefaultKanbanBoards {
  Backlog: AccessibleTaskMap;
  Done: AccessibleTaskMap;
  [boardName: string]: AccessibleTaskMap;
}

export type Config = {
  theme?: string;
};

export type BoardConfig = {
  [x: keyof DefaultKanbanBoards]: Config;
};
