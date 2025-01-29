import { boardOperations, Task } from '@boktor-apps/nomopomo/data-access/store';
import { DragAndDropComponent } from '@boktor-apps/shared/ui/assets';
import { ChipCard } from '@boktor-apps/shared/ui/cards';
import { useAtomValue } from 'jotai';
import { forwardRef, useMemo } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div<{ $theme?: string }>`
  max-width: 300px;
  height: fit-content;
  position: fixed;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #ffe7cc;
  box-shadow: 0px 0px 0px 3px inset ${({ $theme }) => $theme ?? `black`};
  box-sizing: border-box;
  transition: box-shadow ease-in-out 200ms;
  padding: 16px;
  position: relative;
  z-index: Infinity;
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

export const TaskCardStatic = forwardRef<HTMLDivElement, { task: Task }>(({ task }: { task: Task }, ref) => {
  const { getBoardConfigByKey } = useAtomValue(boardOperations);

  const theme = useMemo(() => getBoardConfigByKey(task.parentBoardKey).theme, [getBoardConfigByKey, task]);

  return (
    <CardContainer $theme={theme} ref={ref}>
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
  );
});
