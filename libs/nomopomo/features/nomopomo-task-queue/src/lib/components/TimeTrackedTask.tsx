import { timeTrackedTaskAtom } from '@boktor-apps/nomopomo/data-access/store';
import { TaskCard } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import { useAtomValue } from 'jotai';
import { TimeTrackedTaskSkeleton } from './TimeTrackedTaskSkeleton';

export const TimeTrackedTask = () => {
  const timeTrackedTask = useAtomValue(timeTrackedTaskAtom);

  if (!timeTrackedTask) return <TimeTrackedTaskSkeleton />;

  return (
    <div
      style={{
        maxWidth: 425,
        display: 'flex',
        width: '100%',
      }}
    >
      <div style={{ width: '100%' }}>
        <TaskCard id={timeTrackedTask.id} task={timeTrackedTask} />
      </div>
    </div>
  );
};
