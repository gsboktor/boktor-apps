import { useTimer } from '@boktor-apps/nomopomo/data-access/hooks';
import { PomoTimerMode, timerSelectorAtom } from '@boktor-apps/nomopomo/data-access/store';
import { useAtom } from 'jotai';
import { useCallback, useRef } from 'react';
import styled from 'styled-components';

const TimerLayoutContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-left: 112px;
  gap: 2px;
  @media screen and (width < 768px) {
    align-items: center;
    margin-left: 0px;
    transform: scale(0.75);
  }
  transition: transform ease-in-out 200ms;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 90px;
  cursor: default;
  & > p {
    user-select: none;
  }
`;

const TimerHour = styled.p`
  display: flex;
  font-size: 108px;
  margin: 0;
  width: 148px;
  font-family: 'Inter';
  font-weight: 700;
  align-items: center;
  text-transform: uppercase;
  justify-content: flex-end;
  background: black;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TimerMinute = styled.p`
  display: flex;
  font-size: 108px;
  width: 148px;
  margin: 0;
  font-family: 'Inter';
  font-weight: 700;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  background: white;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TimerColon = styled.p`
  display: inline;
  font-size: 108px;
  margin: 0;
  font-family: 'Inter';
  font-weight: 700;
  background: black;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 70px;
`;

export const MainTimer = () => {
  const [timeSelector, setTimeSelector] = useAtom(timerSelectorAtom);
  const elapsedRef = useRef<number>(0);

  useTimer((elapsed: number) => {
    if (!timeSelector.active || timeSelector.time < 0) return;
    elapsedRef.current += elapsed;
    if (elapsedRef.current >= 1000) {
      const secondsToDecrease = Math.floor(elapsedRef.current / 1000);
      setTimeSelector({ newTime: timeSelector.time - secondsToDecrease });
      elapsedRef.current = elapsedRef.current % 1000; // Keep remainder
    }
  });

  const getDocumentTitle = useCallback(() => {
    if (timeSelector.active && timeSelector.mode === PomoTimerMode.WORK)
      return `⏱️ ${displayHour}:${displayMinute} • Nomopomo.io`;

    if (timeSelector.active && timeSelector.mode === PomoTimerMode.BREAK)
      return `🏖️ ${displayHour}:${displayMinute} • Nomopomo.io`;

    return `⏸️ Paused • Nomopomo.io`;
  }, [timeSelector]);

  const minutes = Math.floor(timeSelector.time / 60);
  const seconds = timeSelector.time % 60;
  const displayHour = `${minutes.toString().padStart(2, '0')}`;
  const displayMinute = `${seconds.toString().padStart(2, '0')}`;

  document.title = getDocumentTitle();

  return (
    <TimerLayoutContainer>
      <TimerContainer>
        <TimerHour>{displayHour}</TimerHour>
        <TimerColon>:</TimerColon>
        <TimerMinute>{displayMinute}</TimerMinute>
      </TimerContainer>
      {/* <TimerControls /> */}
    </TimerLayoutContainer>
  );
};
