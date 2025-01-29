import {
  activeDragTaskAtom,
  activeModalAtom,
  boardOperations,
  kanbanBoardsAtom,
  moveBoardTaskAtom,
  sortBoardTasksAtom,
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
  const { getAllBoards, getBoardConfigByKey, getBoardTasksByKey, getBoardTasksAsArray } = useAtomValue(boardOperations);
  const sortBoardTasks = useSetAtom(sortBoardTasksAtom);
  const moveBoardTask = useSetAtom(moveBoardTaskAtom);
  const boardEnum = useAtomValue(boardEnumAtom);
  const [activeTask, setActiveTask] = useAtom(activeDragTaskAtom);
  const [allBoards, setAllBoards] = useAtom(kanbanBoardsAtom);

  // console.log('activeTask!', activeTask);

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
            console.log('starting', e);
            setActiveTask(getBoardTasksAsArray(e.active.data.current?.prevBoardKey).find((t) => t.id === e.active.id));
          }}
          onDragOver={(e) => {
            // console.log('CURRENT EVENT', e);
            const { active, over } = e;
            const { id } = active;

            if (!over || !activeTask || active.id === over.id) return;

            const overId = over?.id;

            const activeContainer = active.data.current?.prevBoardKey;
            const overContainer = boardEnum.includes(String(overId)) ? overId : over?.data.current?.prevBoardKey;

            console.log('ACTIVE (prev), container,', activeContainer);
            console.log('OVER (target), container and/or ID,', overContainer, overId);

            if (!activeContainer || !overContainer) {
              return;
            }

            setAllBoards((prev) => {
              const activeItems = Object.values(prev[activeContainer]);
              let overItems = Object.values(prev[overContainer]);

              if (activeContainer === overContainer) {
                const activeIndex = activeItems.findIndex((t) => t.id === id);
                const overIndex = overItems.findIndex((t) => t.id === overId);
                const newArray = arrayMove(activeItems, activeIndex, overIndex);

                return {
                  ...prev,
                  [activeContainer]: newArray.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}),
                };
              }

              const activeIdx = activeItems.findIndex((t) => t.id === id);
              const overIdx = overItems.findIndex((t) => t.id === overId);

              let newIdx;

              if (boardEnum.includes(String(overId))) {
                newIdx = overItems.length;
              } else {
                const isBelowItem = overlayRef.current?.getBoundingClientRect().top! > e.over!.rect.top;
                console.log('below item', isBelowItem);
                newIdx = overIdx >= 0 ? (isBelowItem ? overIdx + 1 : overIdx) : overItems.length + 1;
                console.log('over item index,', overIdx);
                console.log('new idx splice,', newIdx);
              }

              let activeArray = activeItems.filter((item) => item.id !== active.id);

              if (overItems.find((t) => t.id === String(active.id))) {
                overItems = overItems.filter((t) => t.id !== active.id);
              }

              let overArray = [
                ...overItems.slice(0, newIdx),
                { ...activeItems[activeIdx], parentBoardKey: overContainer },
                ...overItems.slice(newIdx),
              ];

              console.log('ACTIVE ARR', activeArray);
              console.log('OVER ARR', overArray);

              return {
                ...prev,
                [activeContainer]: activeArray.reduce((acc, curr) => {
                  return { ...acc, [curr.id]: curr };
                }, {}),
                [overContainer]: overArray.reduce((acc, curr) => {
                  return { ...acc, [curr.id]: curr };
                }, {}),
              };
            });
          }}
          onDragEnd={(e) => {
            // debugger;
            // // console.log('END EVENT', e);
            // const { active, over } = e;
            // const { id } = active;
            // const overId = over?.id;

            // const activeContainer = active.data.current?.prevBoardKey;
            // const overContainer = boardEnum.includes(String(overId)) ? overId : over?.data.current?.prevBoardKey;
            // if (!activeContainer || !overContainer || activeContainer !== overContainer) {
            //   setActiveTask(RESET);
            //   return;
            // }

            // const activeIndex = Object.values(allBoards[activeContainer]).findIndex((t) => t.id === id);
            // const overIndex = Object.values(allBoards[overContainer]).findIndex((t) => t.id === overId);

            // const arrayToShuffle = Object.values(allBoards[overContainer]);
            // const shuffledArray = arrayMove(arrayToShuffle, activeIndex, overIndex);

            // setAllBoards((items) => ({
            //   ...items,
            //   [overContainer]: shuffledArray.reduce((acc, curr) => {
            //     return { ...acc, [curr.id]: curr };
            //   }, {}),
            // }));

            // console.log('EVENT', e);
            // if (!e.over?.id) return;

            // if (boardEnum.includes(String(e.over?.id))) {
            //   console.log('when do I do this move board task?');
            //   moveBoardTask({
            //     oldBoardKey: e.active.data.current?.prevBoardKey,
            //     newBoardKey: String(e.over?.id),
            //     taskId: String(e.active.id),
            //     insertPosition: Number(e.over?.data.current?.insertPosition),
            //   });
            //   setActiveTask(RESET);

            //   return;
            // }

            // const newBoardKey = String(e.over?.data.current?.prevBoardKey);
            // const oldBoardKey = String(e.active.data.current?.prevBoardKey);

            // const newTasks = getBoardTasksAsArray(newBoardKey);
            // const oldTasks = getBoardTasksAsArray(oldBoardKey);

            // if (e.active.id !== e.over?.id) {
            //   const newIdx = newTasks.findIndex((t) => t.id === e.over?.id);
            //   const oldIdx = oldTasks.findIndex((t) => t.id === e.active.id);

            //   const isBelowItem = overlayRef.current?.getBoundingClientRect().top! > e.over.rect.top;

            //   let insertIdx = newIdx >= 0 ? (isBelowItem ? newIdx + 1 : newIdx) : newTasks.length + 1;

            //   if (oldBoardKey === newBoardKey) {
            //     let newArr = arrayMove(newTasks, oldIdx, newIdx);

            //     sortBoardTasks({
            //       boardKey: newBoardKey,
            //       tasks: newArr,
            //     });
            //   } else {
            //     console.log('in diff boards');
            //     let removeOldIdxArr = oldTasks.filter((t) => t.id !== oldTasks[oldIdx].id);
            //     let newInsertedArr = [
            //       ...newTasks.slice(0, insertIdx),
            //       { ...oldTasks[oldIdx], parentBoardKey: newBoardKey },
            //       ...newTasks.slice(insertIdx),
            //     ];

            //     console.log('OLD BOARD AFTER REMOVe => ', removeOldIdxArr);
            //     console.log('NEW BOARD AFTER INSERT =>', newInsertedArr);

            //     setAllBoards({
            //       ...allBoards,
            //       [oldBoardKey]: removeOldIdxArr.reduce((acc, curr) => {
            //         return { ...acc, [curr.id]: curr };
            //       }, {}),
            //       [newBoardKey]: newInsertedArr.reduce((acc, curr) => {
            //         return { ...acc, [curr.id]: curr };
            //       }, {}),
            //     });
            //   }

            //   console.log('after sorted', newTasks);
            // }
            setActiveTask(RESET);
          }}
        >
          {Object.keys(getAllBoards()).map((id) => {
            return (
              <BoardContainer key={id}>
                <KanbanBoard boardId={id} theme={getBoardConfigByKey(id)?.theme} />
              </BoardContainer>
            );
          })}
          <DragOverlay>{activeTask?.id && <TaskCardStatic ref={overlayRef} task={activeTask} />}</DragOverlay>
        </DndContext>
      </NomopomoMainDashboard>
    </DashboardRootContainer>
  );
};
