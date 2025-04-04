import { Task } from '@boktor-apps/nomopomo/data-access/store';
import { ClockComponent } from '@boktor-apps/shared/ui/assets/svgs';
import styled from 'styled-components';

export const DetailsBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  row-gap: 4px;
  column-gap: 4px;
  height: fit-content;
`;

export const QueuedTaskDetailPill = styled.div<{ $theme: string }>`
  border: none;
  outline: none;
  width: fit-content;
  cursor: pointer;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  background-color: ${({ $theme }) => $theme + `88`};
  transition: background-color ease-in-out 200ms;
  &:hover {
    background-color: ${({ $theme }) => $theme};
  }
  align-items: center;
  justify-content: center;
  border-radius: 24px;
`;

export const QueuedTaskDetailsBar = ({ task, theme }: { task: Task; theme: string }) => {
  return (
    <DetailsBarContainer>
      <QueuedTaskDetailPill $theme={theme}>
        <ClockComponent width={24} height={24}></ClockComponent>
      </QueuedTaskDetailPill>
      <QueuedTaskDetailPill $theme={theme}>02h, 43m</QueuedTaskDetailPill>
      <QueuedTaskDetailPill $theme={theme}>00h, 13m</QueuedTaskDetailPill>
    </DetailsBarContainer>
  );
};
