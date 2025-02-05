import { boardEnumAtom, boardOperations } from '@boktor-apps/nomopomo/data-access/store';
import { AddBoardComponent } from '@boktor-apps/shared/ui/assets';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import styled from 'styled-components';

const StyledAddBoard = styled(AddBoardComponent)`
  width: 28px;
  height: 28px;
`;

const AddBoardButtonContainer = styled(motion.div)`
  position: absolute;
  left: 12px;
  padding: 6px 12px;
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;
export const AddBoardButton = () => {
  const { getBoardConfigByKey } = useAtomValue(boardOperations);
  const boardConfigs = useAtomValue(boardEnumAtom).map((key) => getBoardConfigByKey(key));

  const gradientString = `linear-gradient(
      135deg,
      ${boardConfigs
        .map((config, index) => {
          const color = config.theme ?? '#d3d3d3';
          const position = (index / (boardConfigs.length - 1)) * 100;
          return `${color}95 ${position}%`;
        })
        .join(',\n    ')}
    )`;

  return (
    <AddBoardButtonContainer animate={{ background: gradientString }}>
      <StyledAddBoard />
      <p style={{ margin: 0, display: 'inline-flex', fontSize: 16, fontWeight: 300, color: 'black' }}>Add board</p>
    </AddBoardButtonContainer>
  );
};
