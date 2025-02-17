import { Task, updateBoardTaskAtom } from '@boktor-apps/nomopomo/data-access/store';
import { AddBoardComponent, ClockComponent, CompletedCyclesComponent } from '@boktor-apps/shared/ui/assets';
import { Popover } from '@boktor-apps/shared/ui/pop-over';
import { useSetAtom } from 'jotai';
import { motion } from 'motion/react';
import { useCallback } from 'react';
import styled from 'styled-components';
const TaskPreviewDetailsContainer = styled.div`
  position: absolute;
  width: calc(100% - 58px);
  bottom: 10px;
  right: 8px;
  /* height: 36px; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TaskIconAndLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  gap: 2;
`;

const QueueIndicator = styled(motion.div)`
  width: fit-content;
  height: fit-content;
  padding: 4px 8px;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TaskPreviewDetails = ({ task, theme }: { task: Task; theme?: string }) => {
  const updateTask = useSetAtom(updateBoardTaskAtom);

  const handleToggleTaskToQueue = useCallback(
    (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e?.preventDefault();
      if (task.queued) {
        updateTask({ boardKey: task.parentBoardKey, updateTask: { ...task, queued: false } as Partial<Task> });
      } else {
        updateTask({ boardKey: task.parentBoardKey, updateTask: { ...task, queued: true } as Partial<Task> });
      }
    },
    [updateTask, task],
  );
  return (
    <TaskPreviewDetailsContainer>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
        <TaskIconAndLabel>
          <Popover
            Icon={<ClockComponent width={24} height={24} />}
            renderHorizontal="right"
            Content={
              <p
                style={{
                  margin: 0,
                  fontSize: 9,
                  letterSpacing: 1,
                  color: 'white',
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: 90,
                }}
              >
                Estimated cycles
              </p>
            }
          ></Popover>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: 1,
              display: 'flex',
              flexWrap: 'wrap',
              textWrap: 'wrap',
            }}
          >
            {task.estimatedCycles}
          </p>
        </TaskIconAndLabel>
        <TaskIconAndLabel>
          <Popover
            Icon={<CompletedCyclesComponent width={24} height={24} />}
            renderHorizontal="right"
            Content={
              <p
                style={{
                  margin: 0,
                  fontSize: 9,
                  letterSpacing: 1,
                  color: 'white',
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: 90,
                }}
              >
                Complete cycles
              </p>
            }
          ></Popover>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: 1 }}>{task.completedCycles}</p>
        </TaskIconAndLabel>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
        <QueueIndicator
          initial={{ backgroundColor: task.queued ? theme : '#a4a4a446' }}
          animate={{ backgroundColor: task.queued ? theme : '#a4a4a446' }}
        >
          <p style={{ margin: 0, fontSize: 12 }}>{!task.queued ? 'Not queued' : 'Queued'}</p>
        </QueueIndicator>
        <TaskIconAndLabel style={{ cursor: 'pointer' }}>
          <Popover
            Icon={<AddBoardComponent width={30} height={30} />}
            iconAttr={{ style: { height: 30 } }}
            onClick={handleToggleTaskToQueue}
            renderHorizontal="left"
            Content={
              <p
                style={{
                  margin: 0,
                  fontSize: 9,
                  letterSpacing: 1,
                  color: 'white',
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: 98,
                }}
              >
                Add to Task Queue
              </p>
            }
          ></Popover>
        </TaskIconAndLabel>
      </div>
    </TaskPreviewDetailsContainer>
  );
};
