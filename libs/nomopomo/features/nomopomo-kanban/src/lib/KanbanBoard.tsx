import { activeDragBoardId, activeDragTaskAtom, boardOperations } from '@boktor-apps/nomopomo/data-access/store';

import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';
import { memo, RefObject, useEffect, useMemo, useRef } from 'react';

import { TaskCard } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import { AddIconComponent, ClearBoardComponent, DropCardComponent } from '@boktor-apps/shared/ui/assets';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { boardEnumAtom } from 'libs/nomopomo/data-access/store/src/lib/boardEnumAtom';
import styled from 'styled-components';
import { VacantBoard } from './components';
import { useHeaderAnimation, useTaskPlaceholderPosition } from './hooks';

export type KanbanBoardProps = {
  boardId: string;
  theme?: string;
  overlayRef: RefObject<HTMLDivElement>;
};

const KanbanContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
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
  padding-bottom: 275px;
`;

const BoardHeaderControlsContainer = styled(motion.div)`
  position: sticky;
  top: 0px;
  width: calc(100% - 24px);
  /* width: 100%; */
  height: fit-content;
  gap: 8px;
  cursor: move !important;

  display: flex;
  z-index: 1000;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;

const BoardHeader = styled(motion.div)<{ $theme: string }>`
  position: sticky;
  top: 0px;
  width: 100%;
  height: fit-content;
  display: flex;

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 6px 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  background-color: ${({ $theme }) => $theme + `99`};
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

export const PlaceholderCard = styled(motion.div)<{ $theme: string }>`
  position: sticky;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $theme }) => $theme};
  opacity: 0.8;
  border-radius: 20px;
`;

export const AddTaskToBoardContainer = styled(motion.div)`
  border-radius: 12px;
  background-color: #75757519;
  backdrop-filter: blur(6px);
  cursor: pointer;
  position: absolute;
  bottom: 10.5%;
  width: 80%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  gap: 4px;
  z-index: ${Number.MAX_SAFE_INTEGER};
  box-sizing: border-box;
  user-select: none;
`;

export const KanbanBoard = memo(({ overlayRef, boardId, theme = '#d3d3d3' }: KanbanBoardProps) => {
  const containerRef = useRef<HTMLDivElement | undefined>();

  const { over, active, setNodeRef, attributes, listeners } = useSortable({
    id: boardId,
  });

  const activeTask = useAtomValue(activeDragTaskAtom);
  const activeBoard = useAtomValue(activeDragBoardId);
  const boards = useAtomValue(boardEnumAtom);

  const { getBoardTasksAsArray } = useAtomValue(boardOperations);

  const boardTasks = useMemo(() => getBoardTasksAsArray(boardId) ?? [], [getBoardTasksAsArray, boardId]);
  const { headerAnimationRef, showActions } = useHeaderAnimation({ containerRef });
  const { placeholderPosition } = useTaskPlaceholderPosition({
    overlayRef,
    over,
  });

  const boardTheme = theme;
  const isActive = activeBoard === boardId;

  const appliedFilterStyle = useMemo(() => {
    return {
      filter: isActive ? 'blur(4px) brightness(.95)' : 'none',
    };
  }, [isActive]);

  useEffect(() => {
    isActive && containerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [isActive]);

  return (
    <>
      <AnimatePresence>
        {!(boardTasks.length === 0) && !isActive && (
          <AddTaskToBoardContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05, backgroundColor: theme + `99` }}
          >
            <AddIconComponent width={24} height={24}></AddIconComponent>
            <p style={{ margin: 0, display: 'flex', flex: 1, textAlign: 'center', color: '#3d3d3d' }}>Add Task</p>
          </AddTaskToBoardContainer>
        )}
      </AnimatePresence>
      <KanbanContainer
        layout
        style={{ willChange: 'height', ...appliedFilterStyle }}
        initial={{ height: '100%' }}
        animate={{ height: 'auto' }}
        ref={(ref) => {
          setNodeRef(ref);
          containerRef.current = ref ?? undefined;
        }}
      >
        <BoardHeaderControlsContainer style={{ willChange: 'width, transform' }} ref={headerAnimationRef}>
          <AnimatePresence>
            {showActions && (
              <motion.div
                style={{
                  willChange: 'opacity',
                  width: 'fit-content',
                  display: 'flex',
                  height: 'fit-content',
                  position: 'absolute',
                  left: -32,
                }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ClearBoardComponent width={28} height={28} />
              </motion.div>
            )}
          </AnimatePresence>
          <BoardHeader $theme={boardTheme} {...attributes} {...listeners}>
            <Label style={{ flex: 1 }}>{boardId}</Label>
            <BoardCountHint $theme={boardTheme}>
              <Label style={{ fontSize: 16, overflow: 'visible' }}>{boardTasks.length}</Label>
            </BoardCountHint>
          </BoardHeader>
          <AnimatePresence>
            {showActions && (
              <motion.div
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  willChange: 'opacity',
                  display: 'flex',
                  width: 'fit-content',
                  height: 'fit-content',
                  position: 'absolute',
                  right: -32,
                }}
              >
                <AddIconComponent width={30} height={30} />
              </motion.div>
            )}
          </AnimatePresence>
        </BoardHeaderControlsContainer>
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={boardTasks.reduce((acc, curr) => [...acc, curr.id], [] as string[])}
        >
          <AnimatePresence>
            {boardTasks.length === 0 && (
              <VacantBoard
                expand={over?.id === boardId && !boards.includes(String(active?.id))}
                theme={theme}
                overlayRef={overlayRef}
                boardId={boardId}
              />
            )}
            {boardTasks.map((task) => {
              return (
                <div
                  key={task.id}
                  style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', position: 'relative' }}
                >
                  <AnimatePresence>
                    {activeTask &&
                      placeholderPosition?.taskId === task.id &&
                      placeholderPosition.position === 'above' && (
                        <PlaceholderCard
                          $theme={theme + `88`}
                          initial={{ height: 0, opacity: 0 }}
                          exit={{ height: 0, display: 'none', opacity: 0 }}
                          animate={{ height: overlayRef.current?.getBoundingClientRect().height, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <DropCardComponent width={48} height={48} />
                        </PlaceholderCard>
                      )}
                  </AnimatePresence>
                  <TaskCard id={task.id} task={task} key={task.id} />
                </div>
              );
            })}
          </AnimatePresence>
        </SortableContext>
      </KanbanContainer>
    </>
  );
});
