import {
  activeDragBoardId,
  activeDragTaskAtom,
  boardOperations,
  handleBoardsDragOver,
  handleDragEndAtom,
  handleDragStartAtom,
} from '@boktor-apps/nomopomo/data-access/store';
import { KanbanBoard, KanbanBoardStatic } from '@boktor-apps/nomopomo/features/nomopomo-kanban';

import { TaskCardStatic } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { boardEnumAtom } from 'libs/nomopomo/data-access/store/src/lib/boardEnumAtom';
import { useRef } from 'react';
import { useMedia } from 'react-use';
import styled from 'styled-components';
import { MainTimer, NomopomoBlurLogo } from './components';
import { ControlBar } from './components/ControlBar';

const DashboardRootContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const NomopomoDashHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
  overflow: visible;
  align-items: center;
  justify-content: space-between;
`;

const NomopomoMainDashboard = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: calc(100% - 64px);
  /* margin-bottom: 52px; */
  gap: 8px;
  padding: 16px 0px;
  overflow-x: scroll;
  -webkit-mask-image: linear-gradient(to top, transparent, black 15%);
  mask-image: linear-gradient(to top, transparent, black 15%);
`;

const BoardContainer = styled.div`
  display: flex;
  height: 100%;
  min-width: 324px;
  @media screen and (width < 378px) {
    width: 100%;
    min-width: 100%;
  }
`;

export const NomopomoDashboard = () => {
  const isMobile = useMedia('(max-width: 374px)');
  const overlayRef = useRef<HTMLDivElement>(null);

  const [activeTask, setActiveTask] = useAtom(activeDragTaskAtom);
  const activeBoard = useAtomValue(activeDragBoardId);
  const { getBoardConfigByKey } = useAtomValue(boardOperations);
  const boards = useAtomValue(boardEnumAtom);

  const handleDragStart = useSetAtom(handleDragStartAtom);
  const handleDragEnd = useSetAtom(handleDragEndAtom);
  const handleDragOver = useSetAtom(handleBoardsDragOver);

  return (
    <DashboardRootContainer>
      {!isMobile && <NomopomoBlurLogo />}
      <NomopomoDashHeader>
        <MainTimer />
      </NomopomoDashHeader>
      <NomopomoMainDashboard>
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={(e) => {
            handleDragEnd({ ...e, overlayRef: overlayRef });
          }}
        >
          <SortableContext items={boards} strategy={horizontalListSortingStrategy}>
            {boards.map((id) => {
              return (
                <BoardContainer key={id}>
                  <KanbanBoard overlayRef={overlayRef} boardId={id} theme={getBoardConfigByKey(id)?.theme} />
                </BoardContainer>
              );
            })}
          </SortableContext>
          <DragOverlay
            modifiers={[restrictToWindowEdges]}
            style={{ zIndex: Number.MAX_SAFE_INTEGER }}
            dropAnimation={{
              duration: 250,
              sideEffects: () => {
                setActiveTask(RESET);
              },
            }}
          >
            {activeTask?.id && !activeBoard && <TaskCardStatic ref={overlayRef} task={activeTask} />}
            {activeBoard && !activeTask?.id && (
              <div style={{ display: 'flex', height: `100%` }}>
                <KanbanBoardStatic boardId={activeBoard} theme={getBoardConfigByKey(activeBoard).theme} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </NomopomoMainDashboard>
      <ControlBar />
    </DashboardRootContainer>
  );
};
