import {
  AccessibleTaskMap,
  kanbanBoardsAtom,
  Task,
  timeTrackedTaskAtom,
} from '@boktor-apps/nomopomo/data-access/store';
import { QueuedTaskCard } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import { MainTimer } from '@boktor-apps/nomopomo/features/nomopomo-timer';
import { useAtomValue } from 'jotai';
import { AnimatePresence } from 'motion/react';
import { forwardRef, useMemo } from 'react';
import styled from 'styled-components';
import { TimeTrackedTask } from './components/TimeTrackedTask';

export const TaskQueueContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: fit-content;
  display: flex;
  height: 100%;
  margin: auto;
  align-items: center;
`;

export const TaskQueueMainContent = styled.div`
  display: flex;
  background-color: #3d3d3d22;
  backdrop-filter: blur(2px);
  border-radius: 32px;
  padding: 16px;
  box-sizing: border-box;
  flex-direction: column;
  gap: 24px;
  overflow-y: scroll;
  width: 425px;
  height: 100%;
  align-items: center;
  @media screen and (width < 378px) {
    width: 100%;
  }
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TaskQueueMainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  place-items: center;
  height: 95%;
`;

const StyledTimer = styled.div`
  transform: scale(0.6);
  margin-left: -156px;
`;

type NomopomoTaskQueueProps = {
  closeModal: (show: boolean) => void;
};

export const NomopomoTaskQueue = forwardRef<HTMLDivElement, NomopomoTaskQueueProps>(
  ({ ...props }: NomopomoTaskQueueProps, ref) => {
    const allBoards = useAtomValue(kanbanBoardsAtom);
    const trackingTask = useAtomValue(timeTrackedTaskAtom);
    const queuedTasks = useMemo(
      () =>
        Object.values(allBoards)
          .reduce((acc: Task[], curr: AccessibleTaskMap) => {
            return [
              ...acc,
              ...Object.values(curr).filter((t) => t.queued && trackingTask && t.id !== trackingTask?.id),
            ] as Task[];
          }, [] as Task[])
          .sort((a, b) => a.createdAt - b.createdAt),
      [allBoards, trackingTask],
    );

    return (
      <>
        <div
          style={{
            position: 'absolute',
            left: 16,
            bottom: 16,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: -2,
              color: 'white',
              lineHeight: '52px',
            }}
          >
            Task
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: -2,
              color: 'black',
              lineHeight: '52px',
            }}
          >
            Queue
          </p>
          <StyledTimer>
            <MainTimer />
          </StyledTimer>
        </div>
        <TaskQueueContainer ref={ref}>
          <TaskQueueMainContentWrapper>
            <TimeTrackedTask />

            <TaskQueueMainContent>
              <div style={{ width: `100%`, gap: 8, display: 'flex', flexDirection: 'column' }}>
                <AnimatePresence>
                  {queuedTasks.length > 0 ? (
                    queuedTasks.map((task) => {
                      return <QueuedTaskCard key={task.id} id={task.id} task={task} />;
                    })
                  ) : (
                    <>
                      <p style={{ color: 'white', fontWeight: 700, fontSize: 64, margin: 0, lineHeight: '46px' }}>
                        Nothing
                      </p>
                      <p style={{ color: 'black', fontWeight: 700, fontSize: 64, margin: 0, lineHeight: '46px' }}>
                        Here
                      </p>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </TaskQueueMainContent>
          </TaskQueueMainContentWrapper>
        </TaskQueueContainer>
      </>
    );
  },
);
