import { activeDragTaskAtom, boardOperations, deleteBoardTaskAtom } from '@boktor-apps/nomopomo/data-access/store';
import { useScrollDirection } from '@boktor-apps/shared/ui/hooks';

import { useAtomValue, useSetAtom } from 'jotai';
import { AnimatePresence, motion, useAnimate } from 'motion/react';
import { useMemo, useRef, useState } from 'react';

import { Turbulence } from '@boktor-apps/shared/ui/assets';

import { TaskCard } from '@boktor-apps/nomopomo/features/nomopomo-task-card';
import { DropCardComponent } from '@boktor-apps/shared/ui/assets';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import styled from 'styled-components';
import { VacantBoard } from './components';

export type KanbanBoardStaticProps = {
  boardId: string;
  theme?: string;
};

const KanbanContainer = styled(motion.div)`
  position: relative;
  opacity: 0.6;
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

const MockCard = styled.div`
  width: 100%;
  min-height: 225px;
  border-radius: 20px;
  background-color: #ffdfbb;
  background: linear-gradient(#ffc27c62, #ffc27c62), url(${Turbulence});

  box-shadow: 0px 0px 0px 1px inset #4f4f4f2c;
`;

const BoardHeader = styled(motion.div)<{ $theme: string }>`
  position: sticky;
  top: 0px;
  width: calc(100% - 48px);
  height: fit-content;
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

const PlaceholderCard = styled(motion.div)<{ $theme: string }>`
  position: sticky;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $theme }) => $theme};
  opacity: 0.8;
  border-radius: 20px;
`;

export const KanbanBoardStatic = ({ boardId, theme = '#d3d3d3' }: KanbanBoardStaticProps) => {
  const activeTask = useAtomValue(activeDragTaskAtom);

  const containeRef = useRef<HTMLDivElement | undefined>();
  const { getBoardTasksAsArray } = useAtomValue(boardOperations);
  const deletTask = useSetAtom(deleteBoardTaskAtom);

  const boardTasks = useMemo(() => getBoardTasksAsArray(boardId), [getBoardTasksAsArray]);

  const { scrollDirection, withinTop } = useScrollDirection({ threshold: 30, topThreshold: 50 }, containeRef);
  const [ref, animate] = useAnimate();
  const [placeholderPosition, setPlaceholderPosition] = useState<{
    taskId: string;
    position: 'above' | 'below';
  } | null>(() => null);

  const boardTheme = theme;

  useMemo(() => {
    if (!activeTask) {
      setPlaceholderPosition(null);
    }
  }, [activeTask]);

  return (
    <KanbanContainer
      initial={{ height: '100%' }}
      animate={{ height: 'auto' }}
      ref={(ref) => {
        containeRef.current = ref ?? undefined;
      }}
    >
      <BoardHeader $theme={boardTheme} ref={ref}>
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
          {boardTasks.length === 0 && <VacantBoard expand={false} theme={theme} boardId={boardId} />}
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
                        transition={{ duration: 0.2 }}
                      >
                        <DropCardComponent width={48} height={48} />
                      </PlaceholderCard>
                    )}
                </AnimatePresence>
                <TaskCard id={task.id} task={task} key={task.id} />
                {/* <AnimatePresence>
                  {activeTask &&
                    placeholderPosition?.taskId === task.id &&
                    placeholderPosition.position === 'below' && (
                      <PlaceholderCard
                        $theme={theme + `88`}
                        initial={{ height: 0, opacity: 0 }}
                        // exit={{ height: 0, display: 'none', opacity: 0 }}
                        animate={{ height: overlayRef.current?.getBoundingClientRect().height, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <DropCardComponent width={48} height={48} />
                      </PlaceholderCard>
                    )}
                </AnimatePresence> */}
              </div>
            );
          })}
        </AnimatePresence>
      </SortableContext>
    </KanbanContainer>
  );
};
