import { activeDragTaskAtom, boardOperations, Task } from '@boktor-apps/nomopomo/data-access/store';
import { DragAndDropComponent } from '@boktor-apps/shared/ui/assets';
import { useSortable } from '@dnd-kit/sortable';
import { useAtomValue } from 'jotai';
import { easeOut } from 'motion/react';
import { memo, useMemo } from 'react';
import { QueuedTaskCardMainContent, QueuedTaskDetailsBar } from './components';
import { CardContainer, DragWrapper, NodeRoot } from './TaskCard.styles';

export const QueuedTaskCard = memo(({ task }: { task: Task; id: string }) => {
  const { getBoardConfigByKey } = useAtomValue(boardOperations);
  const activeTask = useAtomValue(activeDragTaskAtom);

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
        <DragWrapper {...listeners} {...attributes}>
          <DragAndDropComponent width={24} height={20} />
        </DragWrapper>
        <QueuedTaskCardMainContent theme={theme} task={task} isActive={isActive} />
      </CardContainer>
      <QueuedTaskDetailsBar task={task} theme={theme ?? '#D6D6D6'} />
    </NodeRoot>
  );
});
