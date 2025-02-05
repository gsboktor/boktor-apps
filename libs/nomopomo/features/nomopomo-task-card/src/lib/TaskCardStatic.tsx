import { boardOperations, Task } from '@boktor-apps/nomopomo/data-access/store';
import { DragAndDropComponent } from '@boktor-apps/shared/ui/assets';
import { ChipCard } from '@boktor-apps/shared/ui/cards';
import { useAtomValue } from 'jotai';
import { forwardRef, useMemo } from 'react';
import styled from 'styled-components';
import { DeleteTaskButton, EmojiTag, TaskPreviewDetails } from './components';

const CardContainer = styled.div<{ $theme?: string }>`
  max-width: 300px;
  position: relative;
  opacity: 0.85;
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
  margin-bottom: 42px;
  gap: 10px;
`;

export const TaskCardStatic = forwardRef<HTMLDivElement, { task: Task }>(({ task }: { task: Task }, ref) => {
  const { getBoardConfigByKey } = useAtomValue(boardOperations);

  const theme = useMemo(() => getBoardConfigByKey(task.parentBoardKey).theme, [getBoardConfigByKey, task]);

  return (
    <CardContainer $theme={theme} ref={ref}>
      <DeleteTaskButton boardKey={task.parentBoardKey} taskId={task.id} />
      <TaskPreviewBody>
        {task.tags.length > 0 && (
          <TaskTagContainer>
            {task.tags.map((tag) => (
              <ChipCard
                labelAttr={{ style: { fontSize: 12 } }}
                key={tag.id}
                label={tag.label}
                mainColor={theme}
                onActionClick={() => {}}
              />
            ))}
          </TaskTagContainer>
        )}
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
            lineClamp: 4,
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {task.desc}
        </p>
      </TaskPreviewBody>
      <DragWrapper>
        <DragAndDropComponent width={24} height={20} />
      </DragWrapper>
      <EmojiTag theme={theme ?? '#d3d3d3'} emoji={task.tags.length > 0 ? task.tags[0].icon : '🕛'} />
      <TaskPreviewDetails task={task} theme={theme} />
    </CardContainer>
  );
});
