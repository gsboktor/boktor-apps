import { activeDragBoardId, activeDragTaskAtom, boardOperations } from '@boktor-apps/nomopomo/data-access/store';

import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';
import { RefObject, useMemo, useRef } from 'react';

import { TaskCard } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import { DropCardComponent } from '@boktor-apps/shared/ui/assets';
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

const BoardHeader = styled(motion.div)<{ $theme: string }>`
  position: sticky;
  top: 0px;
  width: calc(100% - 48px);
  height: fit-content;
  cursor: move;
  margin-top: 4px;
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
  z-index: 1000;
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

export const KanbanBoard = ({ overlayRef, boardId, theme = '#d3d3d3' }: KanbanBoardProps) => {
  const containerRef = useRef<HTMLDivElement | undefined>();

  const { over, active, setNodeRef, attributes, listeners } = useSortable({
    id: boardId,
  });

  const activeTask = useAtomValue(activeDragTaskAtom);
  const activeBoard = useAtomValue(activeDragBoardId);
  const boards = useAtomValue(boardEnumAtom);

  const { getBoardTasksAsArray } = useAtomValue(boardOperations);

  const boardTasks = useMemo(() => getBoardTasksAsArray(boardId) ?? [], [getBoardTasksAsArray, boardId]);
  const { headerAnimationRef } = useHeaderAnimation({ containerRef });
  const { placeholderPosition } = useTaskPlaceholderPosition({
    activeTask,
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

  useMemo(() => {
    if (isActive) {
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isActive]);

  return (
    <KanbanContainer
      layout
      initial={{ height: '100%' }}
      animate={{ height: 'auto' }}
      style={appliedFilterStyle}
      ref={(ref) => {
        setNodeRef(ref);
        containerRef.current = ref ?? undefined;
      }}
    >
      <BoardHeader $theme={boardTheme} ref={headerAnimationRef} {...attributes} {...listeners}>
        <Label style={{ flex: 1 }}>{boardId}</Label>
        <BoardCountHint $theme={boardTheme}>
          <Label style={{ fontSize: 16, overflow: 'visible' }}>{boardTasks.length}</Label>
        </BoardCountHint>
      </BoardHeader>
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
  );
};
