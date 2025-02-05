import { activeDragTaskAtom, boardOperations, Task } from '@boktor-apps/nomopomo/data-access/store';
import { DragAndDropComponent } from '@boktor-apps/shared/ui/assets';
import { useSortable } from '@dnd-kit/sortable';
import { useAtomValue } from 'jotai';
import { easeOut, motion } from 'motion/react';
import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { DeleteTaskButton, TaskCardMainContent } from './components';

const CardContainer = styled(motion.div)<{ $theme?: string }>`
  max-width: 300px;
  position: relative;

  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #ffe7cc;
  box-shadow: 0px 0px 0px 1px inset #4f4f4f2c;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0px 0px 0px 3px inset ${({ $theme }) => $theme ?? `lightgray`};
  }
  padding: 12px;
  padding-top: 24px;
  position: relative;
`;

const DragWrapper = styled.div`
  position: absolute;
  top: 6px;
  align-self: center;
  justify-content: center;
  display: flex;
  width: 80%;
  margin: auto;
  z-index: 100;
  border-radius: 12px;
  transition: background-color ease-in-out 200ms;
  cursor: move !important;

  &:hover {
    background-color: #3d3d3d11;
  }
`;

const NodeRoot = styled(motion.div)``;

export const TaskCard = memo(({ task }: { task: Task; id: string }) => {
  const { getBoardConfigByKey } = useAtomValue(boardOperations);
  const activeTask = useAtomValue(activeDragTaskAtom);
  console.log('card', task);

  const { attributes, listeners, setNodeRef } = useSortable({
    id: task.id,
    data: { prevBoardKey: task.parentBoardKey, insertPosition: task.index },
  });

  const isActive = activeTask?.id === task.id;

  const dragStyle = useMemo(() => {
    return {
      transition: `box-shadow ease-in-out 200ms`,
      filter: isActive ? 'blur(4px) brightness(1.01)' : 'none',
    };
  }, [isActive]);

  const theme = useMemo(() => getBoardConfigByKey(task.parentBoardKey).theme, [getBoardConfigByKey, task]);

  return (
    <NodeRoot exit={{ height: `0px`, transition: { duration: 0.2, ease: easeOut } }}>
      <CardContainer
        $theme={theme}
        ref={setNodeRef}
        id={task.id}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0, transition: { duration: 0.2 } }}
        style={dragStyle}
      >
        <DeleteTaskButton boardKey={task.parentBoardKey} taskId={task.id} />
        <DragWrapper {...listeners} {...attributes}>
          <DragAndDropComponent width={24} height={20} />
        </DragWrapper>
        <TaskCardMainContent theme={theme} task={task} isActive={isActive} />
      </CardContainer>
    </NodeRoot>
  );
});
