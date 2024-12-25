import { timerSelectorAtom } from '@boktor-apps/nomopomo/data-access/store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import styled from 'styled-components';
import { TimerControls } from './TimerControls';

const TimerLayoutContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2px;
  @media screen and (width < 368px) {
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
  background: #ffffff;
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
  const [timeLeft, setTimeLeft] = useAtom(timerSelectorAtom); // 30 minutes in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      timeLeft.active && setTimeLeft({ newTime: timeLeft.time - 1 });
    }, 1000);

    if (!timeLeft.active || timeLeft.time <= 0) {
      clearInterval(intervalId);
      return;
    }

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft.time / 60);
  const seconds = timeLeft.time % 60;
  const displayHour = `${minutes.toString().padStart(2, '0')}`;
  const displayMinute = `${seconds.toString().padStart(2, '0')}`;

  document.title = `${displayHour}:${displayMinute}`;

  return (
    <TimerLayoutContainer>
      <TimerContainer>
        <TimerHour>{displayHour}</TimerHour>
        <TimerColon>:</TimerColon>
        <TimerMinute>{displayMinute}</TimerMinute>
      </TimerContainer>
      <TimerControls />
    </TimerLayoutContainer>
  );
};
