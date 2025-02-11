import { timeTrackedTaskAtom } from '@boktor-apps/nomopomo/data-access/store';
import { TaskCard } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import { useAtomValue } from 'jotai';
import { TimeTrackedTaskSkeleton } from './TimeTrackedTaskSkeleton';

export const TimeTrackedTask = () => {
  const timeTrackedTask = useAtomValue(timeTrackedTaskAtom);

  if (!timeTrackedTask) return <TimeTrackedTaskSkeleton />;

  return <TaskCard id={timeTrackedTask.id} task={timeTrackedTask} />;
};
