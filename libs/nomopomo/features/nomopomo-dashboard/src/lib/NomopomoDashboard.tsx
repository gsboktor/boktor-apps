import {
  activeDragTaskAtom,
  activeModalAtom,
  boardOperations,
  kanbanBoardsAtom,
  moveBoardTaskAtom,
  setBoardTasksByKey,
} from '@boktor-apps/nomopomo/data-access/store';
import { KanbanBoard } from '@boktor-apps/nomopomo/features/nomopomo-kanban';
import { NomopomoSideModal } from '@boktor-apps/nomopomo/features/nomopomo-side-modal';

import { TaskCardStatic } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { boardEnumAtom } from 'libs/nomopomo/data-access/store/src/lib/boardEnumAtom';
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

  const setModalState = useSetAtom(activeModalAtom);
  const { getAllBoards, getBoardConfigByKey, getBoardTasksAsArray } = useAtomValue(boardOperations);
  const setBoardTasks = useSetAtom(setBoardTasksByKey);
  const moveBoardTask = useSetAtom(moveBoardTaskAtom);
  const boardEnum = useAtomValue(boardEnumAtom);
  const [activeTask, setActiveTask] = useAtom(activeDragTaskAtom);
  const [allBoards, setAllBoards] = useAtom(kanbanBoardsAtom);

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
          collisionDetection={closestCorners}
          onDragStart={(e) => {
            setActiveTask(getBoardTasksAsArray(e.active.data.current?.prevBoardKey).find((t) => t.id === e.active.id));
          }}
          onDragEnd={(e) => {
            if (!e.over?.id) return;

            if (boardEnum.includes(String(e.over?.id))) {
              moveBoardTask({
                oldBoardKey: e.active.data.current?.prevBoardKey,
                newBoardKey: String(e.over?.id),
                taskId: String(e.active.id),
                insertPosition: Number(e.over?.data.current?.insertPosition),
              });
              setActiveTask(RESET);
              return;
            }

            const newBoardKey = String(e.over?.data.current?.prevBoardKey);
            const oldBoardKey = String(e.active.data.current?.prevBoardKey);

            const newTasks = getBoardTasksAsArray(newBoardKey);
            const oldTasks = getBoardTasksAsArray(oldBoardKey);

            if (e.active.id !== e.over?.id) {
              const newIdx = newTasks.findIndex((t) => t.id === e.over?.id);
              const oldIdx = oldTasks.findIndex((t) => t.id === e.active.id);
              console.log('in dashboard overlay?', overlayRef?.current);

              const isBelowItem = overlayRef?.current?.getBoundingClientRect().top! > e.over.rect.top;

              let insertIdx = newIdx >= 0 ? (isBelowItem ? newIdx + 1 : newIdx) : newTasks.length + 1;

              if (oldBoardKey === newBoardKey) {
                let newArr = arrayMove(newTasks, oldIdx, newIdx);

                setBoardTasks({
                  boardKey: newBoardKey,
                  tasks: newArr,
                });
              } else {
                let removeOldIdxArr = oldTasks.filter((t) => t.id !== oldTasks[oldIdx].id);
                let newInsertedArr = [
                  ...newTasks.slice(0, insertIdx),
                  { ...oldTasks[oldIdx], parentBoardKey: newBoardKey },
                  ...newTasks.slice(insertIdx),
                ];

                setAllBoards({
                  ...allBoards,
                  [oldBoardKey]: removeOldIdxArr.reduce((acc, curr) => {
                    return { ...acc, [curr.id]: curr };
                  }, {}),
                  [newBoardKey]: newInsertedArr.reduce((acc, curr) => {
                    return { ...acc, [curr.id]: curr };
                  }, {}),
                });
              }
            }
            setActiveTask(RESET);
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
            }}
          >
            {activeTask?.id && <TaskCardStatic ref={overlayRef} task={activeTask} />}
          </DragOverlay>
        </DndContext>
      </NomopomoMainDashboard>
    </DashboardRootContainer>
  );
};
