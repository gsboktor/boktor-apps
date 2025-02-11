import { PomoTimerMode, timerSelectorAtom } from '@boktor-apps/nomopomo/data-access/store';
import { useAtomValue } from 'jotai';
import { motion, useAnimate } from 'motion/react';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

const TimerLayoutContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-left: 112px;
  gap: 2px;
  transform-origin: left center;

  @media screen and (width < 768px) {
    align-items: center;
    margin-left: 0px;
    transform: scale(0.75);
    transform-origin: top center;
  }
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
  const timeSelector = useAtomValue(timerSelectorAtom);
  const [scope, animate] = useAnimate();

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

  useEffect(() => {
    if (timeSelector.active) {
      animate(scope.current, { scale: 1, filter: 'none' });
    } else {
      animate(scope.current, { scale: 0.85, filter: 'blur(4px)' });
    }
  }, [timeSelector]);

  return (
    <TimerLayoutContainer
      ref={scope}
      style={{ willChange: 'transform, filter' }}
      transition={{ duration: 0.2, type: 'tween' }}
    >
      <TimerContainer>
        <TimerHour>{displayHour}</TimerHour>
        <TimerColon>:</TimerColon>
        <TimerMinute>{displayMinute}</TimerMinute>
      </TimerContainer>
    </TimerLayoutContainer>
  );
};
