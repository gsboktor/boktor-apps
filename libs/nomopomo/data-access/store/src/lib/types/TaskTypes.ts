export type TaskCheckList = {
  id: string;
  estCycleCount: number;
  name: string;
  isCompleted: boolean;
};

export type TaskTag = {
  id: number;
  label: string;
  mainColor: string;
  icon: string;
};

export type Task = {
  id: string;
  icon?: string;
  name: string;
  createdAt: number;
  desc: string;
  completedCycles: number;
  estimatedCycles?: number;
  tags: TaskTag[];
  checklist?: TaskCheckList[];
  queued?: boolean;
  index: number;
  parentBoardKey: string;
};

export type AccessibleTaskMap = { [id: string]: Task };
