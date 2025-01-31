import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { atom } from 'jotai';
import { RESET } from 'jotai/utils';
import { RefObject } from 'react';
import { activeDragBoardId } from './activeDragBoard';
import { activeDragTaskAtom } from './activeDragTask';
import { boardEnumAtom } from './boardEnumAtom';
import { boardOperations, kanbanBoardsAtom, moveBoardTaskAtom, setBoardTasksByKey } from './kanbanAtom';

type HandleDragEndEvent<T> = DragEndEvent & {
  overlayRef: RefObject<T>;
};

export const handleDragStartAtom = atom<null, [DragStartEvent], void>(null, (get, set, e) => {
  const activeItemId = String(e.active.id);
  if (get(boardEnumAtom).includes(activeItemId)) {
    set(activeDragBoardId, activeItemId);
    return;
  }

  const activeItemBoard = String(e.active.data.current?.prevBoardKey);

  const { getBoardTasksAsArray } = get(boardOperations);

  set(
    activeDragTaskAtom,
    getBoardTasksAsArray(activeItemBoard).find((t) => t.id === activeItemId),
  );
});

export const handleDragEndAtom = atom<null, [HandleDragEndEvent<HTMLDivElement>], void>(null, (get, set, e) => {
  const boards = get(boardEnumAtom);
  if (boards.includes(String(e.active?.id)) && e.over?.id) {
    let startIdx = boards.indexOf(String(e.active.id));
    let endIdx = boards.includes(String(e.over.id))
      ? boards.indexOf(String(e.over?.id))
      : boards.indexOf(String(e.over.data.current?.prevBoardKey));
    set(boardEnumAtom, [...arrayMove(boards, startIdx, endIdx)]);
    set(activeDragBoardId, RESET);

    return;
  }

  const overItemId = String(e.over?.id);
  const overItemBoard = String(e.over?.data.current?.prevBoardKey);

  const activeItemId = String(e.active.id);
  const activeItemBoard = String(e.active.data.current?.prevBoardKey);

  set(activeDragTaskAtom, RESET);
  set(activeDragBoardId, RESET);

  if (!overItemId || overItemId === activeItemId || !e.over) return;

  const currentBoards = get(boardEnumAtom);
  const { getBoardTasksAsArray } = get(boardOperations);

  if (currentBoards.includes(overItemId)) {
    if (overItemId === activeItemBoard) {
      const newBoardTasks = [...getBoardTasksAsArray(overItemId)];

      const taskIndex = newBoardTasks.findIndex((t) => t.id === e.active.id);
      const taskToAdd = newBoardTasks[taskIndex];

      newBoardTasks.splice(taskIndex, 1);
      newBoardTasks.push(taskToAdd);

      set(setBoardTasksByKey, { boardKey: overItemId, tasks: newBoardTasks });
    } else {
      set(moveBoardTaskAtom, { oldBoardKey: activeItemBoard, newBoardKey: overItemId, taskId: activeItemId });
    }

    return;
  }

  const newTasks = getBoardTasksAsArray(overItemBoard);
  const oldTasks = getBoardTasksAsArray(activeItemBoard);

  const newIdx = newTasks.findIndex((t) => t.id === overItemId);
  const oldIdx = oldTasks.findIndex((t) => t.id === activeItemId);

  const isBelowItem = e.overlayRef?.current?.getBoundingClientRect().top! > e.over.rect.top;
  let insertIdx = newIdx >= 0 ? (isBelowItem ? newIdx + 1 : newIdx) : newTasks.length + 1;

  if (activeItemBoard === overItemBoard) {
    const taskToMove = newTasks[oldIdx];
    const newArr = [...newTasks];

    newArr.splice(oldIdx, 1);
    newArr.splice(oldIdx < insertIdx ? insertIdx - 1 : insertIdx, 0, taskToMove);

    set(setBoardTasksByKey, { boardKey: overItemBoard, tasks: newArr });
  } else {
    const removeOldIdxArr = oldTasks.filter((t) => t.id !== oldTasks[oldIdx].id);
    const newInsertedArr = [
      ...newTasks.slice(0, insertIdx),
      { ...oldTasks[oldIdx], parentBoardKey: overItemBoard },
      ...newTasks.slice(insertIdx),
    ];

    set(kanbanBoardsAtom, {
      ...get(kanbanBoardsAtom),
      [activeItemBoard]: removeOldIdxArr.reduce((acc, curr) => {
        return { ...acc, [curr.id]: curr };
      }, {}),
      [overItemBoard]: newInsertedArr.reduce((acc, curr) => {
        return { ...acc, [curr.id]: curr };
      }, {}),
    });
  }
});
