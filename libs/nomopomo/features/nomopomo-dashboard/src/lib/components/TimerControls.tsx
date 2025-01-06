import { PomoTimerMode, timerSelectorAtom } from '@boktor-apps/nomopomo/data-access/store';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import styled from 'styled-components';

import {
  Noise,
  PauseTimerComponent,
  RestartTimerComponent,
  SkipTimerComponent,
  StartTimerComponent,
} from '@boktor-apps/shared/ui/assets';

const TimerControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
`;

const StyledTimerStart = styled(StartTimerComponent)`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const StyledTimerRestart = styled(RestartTimerComponent)`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const StyledTimerSkip = styled(SkipTimerComponent)`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const StyledPauseTimer = styled(PauseTimerComponent)`
  width: 42px;
  height: 42px;
  cursor: pointer;
`;

const MainPlayButtonContainer = styled.div`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: linear-gradient(#ffcd62a8, #ffcd62a8), url(${Noise});
  &:hover {
    transform: scale(1.075);
    box-shadow: 0px 0px 16px 8px #ffc039a9;
  }
  transition: transform ease-in-out 200ms, box-shadow ease-in-out 200ms;
`;

const ComplementaryButtonsContainer = styled.div`
  border-radius: 24px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: linear-gradient(#ffcd62a8, #ffcd62a8), url(${Noise});
  &:hover {
    transform: scale(1.075);
    box-shadow: 0px 0px 16px 8px #ffc039a9;
  }
  transition: transform ease-in-out 200ms, box-shadow ease-in-out 200ms;
`;

export const TimerControls = () => {
  const [timerSelector, setTimerSelector] = useAtom(timerSelectorAtom);
  return (
    <TimerControlsContainer>
      <MainPlayButtonContainer>
        {timerSelector.active ? (
          <StyledPauseTimer onClick={() => setTimerSelector({ active: !timerSelector.active })} />
        ) : (
          <StyledTimerStart onClick={() => setTimerSelector({ active: !timerSelector.active })} />
        )}
      </MainPlayButtonContainer>
      <ComplementaryButtonsContainer>
        <StyledTimerRestart onClick={() => setTimerSelector({ newTime: RESET, active: false })} />
        <StyledTimerSkip
          onClick={() =>
            setTimerSelector({
              newMode: timerSelector.mode === PomoTimerMode.WORK ? PomoTimerMode.BREAK : PomoTimerMode.WORK,
            })
          }
        />
      </ComplementaryButtonsContainer>
    </TimerControlsContainer>
  );
};
