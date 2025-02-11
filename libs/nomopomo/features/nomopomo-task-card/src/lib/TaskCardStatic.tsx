import { boardOperations, Task } from '@boktor-apps/nomopomo/data-access/store';
import { DragAndDropComponent } from '@boktor-apps/shared/ui/assets';
import { ChipCard } from '@boktor-apps/shared/ui/cards';
import { useAtomValue } from 'jotai';
import { forwardRef, useMemo } from 'react';
import { DeleteTaskButton, EmojiTag, TaskPreviewDetails } from './components';
import {
  CardContainer,
  DragWrapper,
  TaskCardDesc,
  TaskCardName,
  TaskPreviewBody,
  TaskTagContainer,
} from './TaskCard.styles';

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
        <TaskCardName>{task.name}</TaskCardName>
        <TaskCardDesc>{task.desc}</TaskCardDesc>
      </TaskPreviewBody>
      <DragWrapper>
        <DragAndDropComponent width={24} height={20} />
      </DragWrapper>
      <EmojiTag theme={theme ?? '#d3d3d3'} emoji={task.tags.length > 0 ? task.tags[0].icon : '🕛'} />
      <TaskPreviewDetails task={task} theme={theme} />
    </CardContainer>
  );
});
