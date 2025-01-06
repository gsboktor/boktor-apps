import { boardOperations } from '@boktor-apps/nomopomo/data-access/store';
import { Direction, useScrollDirection } from '@boktor-apps/shared/ui/hooks';

import { useAtomValue } from 'jotai';
import { motion, useAnimate } from 'motion/react';
import { useMemo, useRef } from 'react';

import { Turbulence } from '@boktor-apps/shared/ui/assets';

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
  margin-top: 4px;
  display: flex;
  flex: 1;
  height: fit-content;
  padding: 6px 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $theme }) => $theme + `99`};
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

export const KanbanBoard = ({ boardId, theme = '#d3d3d3' }: KanbanBoardProps) => {
  const containeRef = useRef<HTMLDivElement>(null);
  const { getBoardTasksByKey } = useAtomValue(boardOperations);

  const { scrollDirection, withinTop } = useScrollDirection(containeRef, { threshold: 30, topThreshold: 50 });
  const [ref, animate] = useAnimate();

  const boardTheme = theme;

  useMemo(() => {
    if (!ref.current) return;
    if (scrollDirection === Direction.UP && withinTop) {
      animate(ref.current, {
        y: 0,
        width: `calc(100% - 48px)`,
      });
    } else if (scrollDirection === Direction.DOWN) {
      animate(
        ref.current,
        {
          y: 24,
          width: `50%`,
        },
        {
          type: 'spring',
          damping: 10,
        },
      );
    }
  }, [scrollDirection, withinTop]);

  return (
    <KanbanContainer ref={containeRef}>
      <BoardHeader $theme={boardTheme} ref={ref}>
        <Label style={{ flex: 1 }}>{boardId}</Label>
        <BoardCountHint $theme={boardTheme}>
          <Label style={{ fontSize: 16, overflow: 'visible' }}>
            {Object.entries(getBoardTasksByKey(boardId)).length}
          </Label>
        </BoardCountHint>
      </BoardHeader>
      <MockCard>Lorem Empsom</MockCard>
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
