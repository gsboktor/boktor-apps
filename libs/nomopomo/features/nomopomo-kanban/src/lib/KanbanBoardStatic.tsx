import { boardOperations } from '@boktor-apps/nomopomo/data-access/store';

import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useRef } from 'react';

import { TaskCardStatic } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import { AddIconComponent } from '@boktor-apps/shared/ui/assets/svgs';
import styled from 'styled-components';
import { VacantBoard } from './components';
import { AddTaskToBoardContainer } from './KanbanBoard';

export type KanbanBoardStaticProps = {
  boardId: string;
  theme?: string;
};

const KanbanContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  gap: 8px;
  padding-left: 12px;
  padding-right: 12px;
  overflow-y: scroll;
  scrollbar-width: none;
  padding-bottom: 100px;
  z-index: 10000;
`;

const BoardHeader = styled(motion.div)<{ $theme: string }>`
  position: sticky;
  top: 0px;
  width: calc(100% - 48px);
  height: fit-content;
  cursor: move;
  display: flex;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  height: fit-content;
  padding: 6px 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $theme }) => $theme + `99`};
  z-index: 10000;
`;

const Label = styled.p`
  margin: 0;
  font-family: Inter;
  width: fit-content;
  font-weight: 500;
  font-size: 16px;
  color: #2b2b2be6;
  letter-spacing: -1px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const BoardCountHint = styled.div<{ $theme: string }>`
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: ${({ $theme }) => $theme};
  width: fit-content;
  height: 24px;
  min-width: 24px;
  border-radius: 6px;
  padding: 2px;
`;

export const KanbanBoardStatic = ({ boardId, theme = '#d3d3d3' }: KanbanBoardStaticProps) => {
  const containeRef = useRef<HTMLDivElement | undefined>();
  const { getBoardTasksAsArray } = useAtomValue(boardOperations);

  const boardTasks = useMemo(() => getBoardTasksAsArray(boardId), [getBoardTasksAsArray]);

  const boardTheme = theme;

  return (
    <>
      <AnimatePresence>
        {!(boardTasks.length === 0) && (
          <AddTaskToBoardContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AddIconComponent width={24} height={24}></AddIconComponent>
            <p style={{ margin: 0, display: 'flex', flex: 1, textAlign: 'center', color: '#3d3d3d' }}>Add Task</p>
          </AddTaskToBoardContainer>
        )}
      </AnimatePresence>
      <KanbanContainer
        ref={(ref) => {
          containeRef.current = ref ?? undefined;
        }}
      >
        <BoardHeader $theme={boardTheme}>
          <Label style={{ flex: 1 }}>{boardId}</Label>
          <BoardCountHint $theme={boardTheme}>
            <Label style={{ fontSize: 16, overflow: 'visible' }}>{boardTasks.length}</Label>
          </BoardCountHint>
        </BoardHeader>
        {boardTasks.length === 0 && <VacantBoard reduceMotion expand={false} theme={theme} boardId={boardId} />}
        {boardTasks.map((task) => {
          return (
            <div style={{ width: '100%' }} key={task.id}>
              <TaskCardStatic task={task} key={task.id} />
            </div>
          );
        })}
      </KanbanContainer>
    </>
  );
};
