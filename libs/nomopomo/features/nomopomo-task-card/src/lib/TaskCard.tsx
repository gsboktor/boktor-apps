import { activeDragTaskAtom, boardOperations, Task } from '@boktor-apps/nomopomo/data-access/store';
import { DragAndDropComponent } from '@boktor-apps/shared/ui/assets';
import { ChipCard } from '@boktor-apps/shared/ui/cards';
import { useSortable } from '@dnd-kit/sortable';
import { useAtomValue } from 'jotai';
import { easeOut, motion } from 'motion/react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { EmojiTag } from './components';

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
  top: 4px;
  align-self: center;
  justify-content: center;
  display: flex;
  width: 90%;
  margin: auto;
  z-index: 100;
  cursor: move;
`;

const TaskTagContainer = styled.div`
  width: 100%;
  padding: 4px 2px;
  position: sticky;
  top: 0;
  flex: 1;
  user-select: none;
  flex-wrap: wrap;

  box-sizing: border-box;
  scrollbar-width: none;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const TaskPreviewBody = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
  max-height: 300px;
  scrollbar-width: none;
  margin-bottom: 36px;
  gap: 2px;
`;

const ShimmerBackdrop = styled(motion.div)<{ $theme: string }>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  border-radius: 20px;
  opacity: 0.8;
  background: linear-gradient(
    45deg,
    ${({ $theme }) => `${$theme}20`} 0%,
    ${({ $theme }) => `${$theme}30`} 10%,
    ${({ $theme }) => `${$theme}40`} 20%,
    ${({ $theme }) => `${$theme}50`} 30%,
    ${({ $theme }) => `${$theme}60`} 40%,
    ${({ $theme }) => `${$theme}90`} 50%,
    ${({ $theme }) => `${$theme}60`} 60%,
    ${({ $theme }) => `${$theme}50`} 70%,
    ${({ $theme }) => `${$theme}40`} 80%,
    ${({ $theme }) => `${$theme}30`} 90%,
    ${({ $theme }) => `${$theme}20`} 100%
  );
  background-size: 1000px 100%;
`;

const NodeRoot = styled(motion.div)``;

export const TaskCard = ({ task, id }: { task: Task; id: string }) => {
  const { getBoardConfigByKey } = useAtomValue(boardOperations);
  const activeTask = useAtomValue(activeDragTaskAtom);

  const { attributes, listeners, setNodeRef, transition } = useSortable({
    id: task.id,
    data: { prevBoardKey: task.parentBoardKey, insertPosition: task.index },
  });

  const isActive = activeTask?.id === task.id;

  const dragStyle = useMemo(() => {
    return {
      transition: `${transition}, box-shadow ease-in-out 200ms`,
      filter: isActive ? 'blur(4px) brightness(1.01)' : 'none',
    };
  }, [transition, isActive]);

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
        {isActive && (
          <ShimmerBackdrop
            $theme={theme ?? 'black'}
            animate={{
              backgroundPosition: ['-1000px 0', '1000px 0'],
            }}
            transition={{
              duration: 1.85,
              ease: 'anticipate',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        )}
        <TaskPreviewBody>
          <TaskTagContainer>
            {task.tags &&
              task.tags.map((tag) => (
                <ChipCard
                  labelAttr={{ style: { fontSize: 12 } }}
                  key={tag.id}
                  label={tag.label}
                  mainColor={theme}
                  onActionClick={() => {}}
                />
              ))}
          </TaskTagContainer>
          <p
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 400,
              color: '#242424',
              display: '-webkit-box',
              lineClamp: 3,
              WebkitLineClamp: 3,
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
            }}
          >
            {task.name}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 300,
              color: '#3a3a3a',
              display: '-webkit-box',
              lineClamp: 3,
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {task.desc}
          </p>
        </TaskPreviewBody>
        <DragWrapper {...listeners} {...attributes}>
          <DragAndDropComponent width={24} height={24} />
        </DragWrapper>
        <EmojiTag theme={theme ?? '#d3d3d3'} emoji={task.tags[0].icon ?? 'X'} />
      </CardContainer>
    </NodeRoot>
  );
};
