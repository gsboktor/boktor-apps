import { Task, updateBoardTaskAtom } from '@boktor-apps/nomopomo/data-access/store';
import { AddBoardComponent } from '@boktor-apps/shared/ui/assets';
import { Popover } from '@boktor-apps/shared/ui/pop-over';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import styled from 'styled-components';
import { QueueIndicator, TaskIconAndLabel } from '../TaskCard.styles';

export const TrackTaskButton = styled.button<{ $theme: string }>`
  border: none;
  outline: none;
  width: 175px;
  min-width: 125px;
  cursor: pointer;
  display: flex;
  padding: 10.25px 14px;
  box-sizing: border-box;
  background-color: ${({ $theme }) => $theme + `88`};
  transition: background-color ease-in-out 200ms;
  &:hover {
    background-color: ${({ $theme }) => $theme};
  }
  align-items: center;
  justify-content: center;
  border-radius: 24px;
`;

export const QueuedTaskActions = ({ task, theme }: { task: Task; theme: string }) => {
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 'calc(100% - 58px)',
        justifyContent: 'space-between',
      }}
    >
      <TrackTaskButton $theme={theme}>Start Tracking</TrackTaskButton>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 4, justifyContent: 'center', alignItems: 'center' }}>
        <QueueIndicator
          initial={{ backgroundColor: '#d6d6d6d6' }}
          animate={{ backgroundColor: task.queued ? theme : '#a4a4a446' }}
        >
          <p style={{ margin: 0, fontSize: 12 }}>Queued</p>
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
                Remove from Task Queue
              </p>
            }
          ></Popover>
        </TaskIconAndLabel>
      </div>
    </div>
  );
};
