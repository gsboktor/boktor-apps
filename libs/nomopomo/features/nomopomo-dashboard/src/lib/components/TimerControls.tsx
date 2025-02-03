import { activeModalAtom, PomoTimerMode, timerSelectorAtom } from '@boktor-apps/nomopomo/data-access/store';
import { useAtom, useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import styled from 'styled-components';

import {
  AddBoardComponent,
  HelpIconComponent,
  PauseTimerComponent,
  RestartTimerComponent,
  SkipTimerComponent,
  StartTimerComponent,
} from '@boktor-apps/shared/ui/assets';
import { Popover } from '@boktor-apps/shared/ui/pop-over';
import { motion } from 'motion/react';
import React from 'react';

const BoardModal = React.lazy(() =>
  import('@boktor-apps/nomopomo/features/nomopomo-board-modal').then((module) => ({ default: module.BoardModal })),
);
const NomopomoSideModal = React.lazy(() =>
  import('@boktor-apps/nomopomo/features/nomopomo-side-modal').then((module) => ({
    default: module.NomopomoSideModal,
  })),
);

const TimerControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding: 0px 12px;
`;

const StyledTimerStart = styled(StartTimerComponent)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const StyledTimerRestart = styled(RestartTimerComponent)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const StyledTimerSkip = styled(SkipTimerComponent)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const StyledPauseTimer = styled(PauseTimerComponent)`
  width: 64px;
  height: 64px;
  cursor: pointer;
`;

const StyledAddBoard = styled(AddBoardComponent)`
  width: 34px;
  height: 34px;
`;

const StyledHelper = styled(HelpIconComponent)`
  width: 34px;
  height: 34px;
`;

const AddBoardButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: fit-content;
`;

const MainPlayButtonContainer = styled(motion.div)`
  /* border-radius: 50%; */
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 6px; */
  /* background: #aeaeae; */
  cursor: pointer;
`;

export const TimerControls = () => {
  const [timerSelector, setTimerSelector] = useAtom(timerSelectorAtom);
  const setModalState = useSetAtom(activeModalAtom);

  return (
    <TimerControlsContainer>
      <AddBoardButtonContainer>
        <Popover
          Icon={
            <StyledAddBoard
              onClick={() =>
                setModalState({
                  Component: BoardModal,
                  show: true,
                })
              }
            />
          }
          Content={
            <p style={{ margin: 0, display: 'flex', flexWrap: 'wrap', color: 'white', fontSize: 10, width: '50px' }}>
              Add board
            </p>
          }
        />
      </AddBoardButtonContainer>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        <MainPlayButtonContainer
          initial={{ scale: 0.9 }}
          whileHover={{
            scale: 1.15,
            y: -8,
            // boxShadow: `0px 4px 16px 2px #66666643`,
            transition: { delay: 0, duration: 0.1 },
          }}
        >
          <StyledTimerRestart onClick={() => setTimerSelector({ newTime: RESET, active: false })} />
        </MainPlayButtonContainer>
        <MainPlayButtonContainer
          initial={{ scale: 1.2 }}
          whileTap={{
            y: -14,
          }}
          whileHover={{
            scale: 1.3,

            y: -8,
            // boxShadow: `0px 4px 16px 2px #66666643`,
            transition: { delay: 0, duration: 0.1 },
          }}
        >
          {timerSelector.active ? (
            <StyledPauseTimer onClick={() => setTimerSelector({ active: !timerSelector.active })} />
          ) : (
            <StyledTimerStart onClick={() => setTimerSelector({ active: !timerSelector.active })} />
          )}
        </MainPlayButtonContainer>
        <MainPlayButtonContainer
          initial={{ scale: 0.9 }}
          whileHover={{
            scale: 1.15,
            y: -8,
            // boxShadow: `0px 4px 16px 2px #66666643`,
            transition: { delay: 0, duration: 0.1 },
          }}
        >
          <StyledTimerSkip
            onClick={() =>
              setTimerSelector({
                newMode: timerSelector.mode === PomoTimerMode.WORK ? PomoTimerMode.BREAK : PomoTimerMode.WORK,
              })
            }
          />
        </MainPlayButtonContainer>
      </div>

      <StyledHelper
        onClick={() =>
          setModalState({
            Component: NomopomoSideModal,
            show: true,
          })
        }
      />
    </TimerControlsContainer>
  );
};
