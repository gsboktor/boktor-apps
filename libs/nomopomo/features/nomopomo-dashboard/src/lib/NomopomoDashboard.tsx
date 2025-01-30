import {
  activeDragTaskAtom,
  activeModalAtom,
  boardOperations,
  handleDragEndAtom,
  handleDragStartAtom,
} from '@boktor-apps/nomopomo/data-access/store';
import { KanbanBoard } from '@boktor-apps/nomopomo/features/nomopomo-kanban';
import { NomopomoSideModal } from '@boktor-apps/nomopomo/features/nomopomo-side-modal';

import { TaskCardStatic } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { useRef } from 'react';
import { useMedia } from 'react-use';
import styled from 'styled-components';
import { MainTimer, NomopomoBlurLogo } from './components';

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

  gap: 8px;
  padding: 16px 0px;
  overflow-x: scroll;
  -webkit-mask-image: linear-gradient(to top, transparent, black 5%);
  mask-image: linear-gradient(to top, transparent, black 5%);
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
  const { getAllBoards, getBoardConfigByKey } = useAtomValue(boardOperations);

  const setModalState = useSetAtom(activeModalAtom);
  const handleDragStart = useSetAtom(handleDragStartAtom);
  const handleDragEnd = useSetAtom(handleDragEndAtom);

  return (
    <DashboardRootContainer>
      {!isMobile && <NomopomoBlurLogo />}
      <NomopomoDashHeader>
        <MainTimer />
        <button
          style={{ position: 'absolute', right: 0 }}
          onClick={() =>
            setModalState({
              Component: NomopomoSideModal,
              show: true,
            })
          }
        >
          show
        </button>
      </NomopomoDashHeader>
      <NomopomoMainDashboard>
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={(e) => {
            handleDragEnd({ ...e, overlayRef: overlayRef });
          }}
        >
          {Object.keys(getAllBoards()).map((id) => {
            return (
              <BoardContainer key={id}>
                <KanbanBoard overlayRef={overlayRef} boardId={id} theme={getBoardConfigByKey(id)?.theme} />
              </BoardContainer>
            );
          })}
          <DragOverlay
            dropAnimation={{
              duration: 250,
              sideEffects: () => {
                setActiveTask(RESET);
              },
            }}
          >
            {activeTask?.id && <TaskCardStatic ref={overlayRef} task={activeTask} />}
          </DragOverlay>
        </DndContext>
      </NomopomoMainDashboard>
    </DashboardRootContainer>
  );
};
