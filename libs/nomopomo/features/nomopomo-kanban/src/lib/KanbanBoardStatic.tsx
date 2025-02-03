import { boardOperations } from '@boktor-apps/nomopomo/data-access/store';

import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import { useMemo, useRef } from 'react';

import { TaskCardStatic } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import styled from 'styled-components';
import { VacantBoard } from './components';

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
  margin-top: 4px;
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
  );
};
