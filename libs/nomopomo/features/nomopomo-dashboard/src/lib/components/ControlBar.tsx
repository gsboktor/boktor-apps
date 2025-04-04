import { boardEnumAtom, boardOperations } from '@boktor-apps/nomopomo/data-access/store';
import { Turbulence } from '@boktor-apps/shared/ui/assets/svgs';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import { TimerControls } from './TimerControls';

const MainControllersContainer = styled(motion.div)<{ $gradient: string }>`
  position: absolute;
  bottom: 0px;
  padding: 12px;
  box-sizing: border-box;
  flex: 1;
  display: flex;

  width: fit-content;
  min-width: 100px;
  height: fit-content;
  left: 0px;
  right: 0px;
  margin: auto;
  border-radius: 36px;
  backdrop-filter: blur(8px);
  /* background: ${({ $gradient }) => $gradient}; */
  background: linear-gradient(#ffcd62a8, #ffcd62a8), url(${Turbulence});
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
  z-index: 10000;
`;

export const ControlBar = () => {
  const { getBoardConfigByKey } = useAtomValue(boardOperations);
  const boardConfigs = useAtomValue(boardEnumAtom).map((key) => getBoardConfigByKey(key));

  const gradientString = `linear-gradient(
    135deg,
    ${boardConfigs
      .map((config, index) => {
        const color = config.theme ?? '#d3d3d3';
        const position = (index / (boardConfigs.length - 1)) * 100;
        return `${color} ${position}%`;
      })
      .join(',\n    ')}
  )`;

  return (
    <MainControllersContainer
      $gradient={gradientString}
      // animate={{
      //   background: gradientString,
      // }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <TimerControls />
    </MainControllersContainer>
  );
};
