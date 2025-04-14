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
} from '@boktor-apps/shared/ui/assets/svgs';
import { motion } from 'motion/react';

const TimerControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */

  align-items: center;

  padding: 0px 12px;
`;

const StyledTimerStart = styled(StartTimerComponent)`
  width: 28px;
  height: 28px;
  fill: #000000;
`;

const StyledTimerRestart = styled(RestartTimerComponent)`
  width: 28px;
  height: 28px;
`;

const StyledTimerSkip = styled(SkipTimerComponent)`
  width: 28px;
  height: 28px;
`;

const StyledPauseTimer = styled(PauseTimerComponent)`
  width: 64px;
  height: 64px;
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
`;

export const TimerControls = () => {
  const [timerSelector, setTimerSelector] = useAtom(timerSelectorAtom);
  const setModalState = useSetAtom(activeModalAtom);

  return (
    <TimerControlsContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',

          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
            <StartTimerComponent
              style={{
                color: '#ff2121',
              }}
              width={28}
              height={28}
              onClick={() => setTimerSelector({ active: !timerSelector.active })}
            />
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
    </TimerControlsContainer>
  );
};
