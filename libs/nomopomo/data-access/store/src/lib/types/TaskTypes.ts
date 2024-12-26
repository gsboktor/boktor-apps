export type TaskCheckList = {
  id: string;
  estCycleCount: number;
  name: string;
  isCompleted: boolean;
};

export type Task = {
  id: string;
  icon?: string;
  name: string;
  createdAt: string;
  desc: string;
  completedCycles: number;
  tags: string[];
  checklist?: TaskCheckList[];
  parentBoardKey: string;
};

export type AccessibleTaskMap = { [id: string]: Omit<Task, 'id'> };
