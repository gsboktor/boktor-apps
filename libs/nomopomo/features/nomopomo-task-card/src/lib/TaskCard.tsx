import { activeDragTaskAtom, boardOperations, Task } from '@boktor-apps/nomopomo/data-access/store';
import { DragAndDropComponent } from '@boktor-apps/shared/ui/assets';
import { ChipCard } from '@boktor-apps/shared/ui/cards';
import { useSortable } from '@dnd-kit/sortable';
import { useAtom, useAtomValue } from 'jotai';
import { easeOut, motion } from 'motion/react';
import { useMemo } from 'react';
import styled from 'styled-components';

const CardContainer = styled(motion.div)<{ $theme?: string }>`
  max-width: 300px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #ffe7cc;
  box-shadow: 0px 0px 0px 1px inset #4f4f4f2c;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0px 0px 0px 3px inset ${({ $theme }) => $theme ?? `black`};
  }
  padding: 16px;
  position: relative;
`;

const DragWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 16px;
  z-index: 100;
  cursor: move;
`;

const TaskTagContainer = styled.div`
  width: 90%;
  padding: 4px;
  padding-right: 16px;
  border-radius: 20px;
  overflow: hidden;
  box-sizing: border-box;
  overflow: scroll;
  scrollbar-width: none;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const NodeRoot = styled(motion.div)``;

export const TaskCard = ({ task }: { task: Task }) => {
  const { getBoardConfigByKey } = useAtomValue(boardOperations);
  const [activeTask, setActiveTask] = useAtom(activeDragTaskAtom);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    data: { prevBoardKey: task.parentBoardKey, insertPosition: task.index },
  });

  const isActive = activeTask?.id === task.id;

  const dragStyle = useMemo(() => {
    return {
      transition: `${transition}, box-shadow ease-in-out 200ms`,
      filter: isActive ? 'blur(2px) brightness(0.9)' : 'none',
    };
  }, [transition, isActive]);

  const theme = useMemo(() => getBoardConfigByKey(task.parentBoardKey).theme, [getBoardConfigByKey, task]);

  return (
    <NodeRoot exit={{ height: `0px`, transition: { duration: 0.2, ease: easeOut } }}>
      <CardContainer
        $theme={theme}
        ref={setNodeRef}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0, transition: { duration: 0.2 } }}
        style={dragStyle}
        {...listeners}
        {...attributes}
        // onMouseDown={() => setActiveTask(task)}
      >
        <TaskTagContainer>
          <ChipCard label="Urgent" onActionClick={() => {}} mainColor={theme} />
          <ChipCard label="Done" onActionClick={() => {}} />
          <ChipCard label="Out-of-date" onActionClick={() => {}} />
          <ChipCard label="Overflow" onActionClick={() => {}} />
        </TaskTagContainer>
        <p>{task.name}</p>
        <p>{task.desc}</p>
        <p>{task.id}</p>
        <p>{task.parentBoardKey}</p>
        <DragWrapper>
          <DragAndDropComponent width={24} height={24} />
        </DragWrapper>
      </CardContainer>
    </NodeRoot>
  );
};
