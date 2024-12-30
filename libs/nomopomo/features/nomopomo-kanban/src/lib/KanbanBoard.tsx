import { boardOperations } from '@boktor-apps/nomopomo/data-access/store';
import { useAtomValue } from 'jotai';

import styled from 'styled-components';

export type KanbanBoardProps = {
  boardId: string;
  theme?: string;
};

const KanbanContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  gap: 8px;
  overflow-y: scroll;
  scrollbar-width: none;
`;

const MockCard = styled.div`
  width: 100%;
  min-height: 100px;
  border-radius: 20px;
  background-color: #41bc9b;
`;

const BoardHeader = styled.div<{ $theme: string }>`
  position: sticky;
  top: 0px;
  width: calc(100% - 48px);
  display: flex;
  flex: 1;
  height: fit-content;
  padding: 6px 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  background-color: ${({ $theme }) => $theme + `99`};
`;

const Label = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 16px;
  color: #2b2b2be6;
  letter-spacing: -1px;
`;

const BoardCountHint = styled.div<{ $theme: string }>`
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: ${({ $theme }) => $theme};
  width: 24px;
  height: 24px;
  border-radius: 6px;
`;

export const KanbanBoard = ({ boardId, theme }: KanbanBoardProps) => {
  const { getBoardTasksByKey } = useAtomValue(boardOperations);
  const boardTheme = theme;

  return (
    <KanbanContainer>
      <BoardHeader $theme={boardTheme ?? 'white'}>
        <Label>{boardId}</Label>
        <BoardCountHint $theme={boardTheme ?? 'white'}>
          <Label style={{ fontSize: 12 }}>{Object.entries(getBoardTasksByKey(boardId)).length}</Label>
        </BoardCountHint>
      </BoardHeader>
      <MockCard />
      <MockCard />
      <MockCard />
      <MockCard />
      <MockCard />
      <MockCard />
      <MockCard />
      <MockCard />
      <MockCard />
      <MockCard />
      <MockCard />
      <MockCard />
    </KanbanContainer>
  );
};
