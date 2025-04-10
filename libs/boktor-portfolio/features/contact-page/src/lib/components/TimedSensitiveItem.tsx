import { pushToastsAtom } from '@boktor-apps/boktor-portfolio/data-access/store';
import { AnimatedBlurBox, Ball, Size, StyledText } from '@boktor-apps/boktor-portfolio/ui/components';
import { CopyComponent } from '@boktor-apps/shared/ui/assets/svgs';
import { useSetAtom } from 'jotai';
import { motion, useAnimationControls } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const LIMIT = 10;

const SensitiveItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: flex-end;
  align-items: center;
`;

const SensitiveItemMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TimerText = styled(StyledText)`
  font-family: 'Merriweather';
  width: 2ch;
  text-align: right;
`;

const CopySVG = motion(CopyComponent);

export const TimedSensitiveItem = ({
  removeItem,
  id,
  header,
  subHeader,
  toast,
  clipboard,
}: {
  removeItem: (id: string) => void;
  id: string;
  header: string;
  subHeader: string;
  toast: string;
  clipboard: string;
}) => {
  const [time, setTime] = useState<number>(() => LIMIT);
  const intervalRef = useRef<NodeJS.Timeout>();
  const addToast = useSetAtom(pushToastsAtom);

  const ballCtrl = useAnimationControls();
  const svgCtrl = useAnimationControls();

  if (time === 0) {
    removeItem(id);
  }

  useEffect(() => {
    const cleanup = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    cleanup(); // Clear any existing interval before setting up a new one

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        return prevTime - 1;
      });
    }, 1000);

    return cleanup;
  }, [id, removeItem]);

  return (
    <AnimatedBlurBox
      style={{ width: 'fit-content' }}
      onAnimationEnd={() => {
        if (time === 0) {
          removeItem(id);
        }
      }}
    >
      <SensitiveItemContainer>
        <Ball
          onMouseEnter={() => {
            ballCtrl.start({ backgroundColor: '#008578' });
            svgCtrl.start({ color: '#ffffff' });
          }}
          onMouseLeave={() => {
            ballCtrl.start({ backgroundColor: '#ffffff' });
            svgCtrl.start({ color: '#000000' });
          }}
          onClick={() => {
            addToast({ id: crypto.randomUUID(), message: toast, timestamp: Date.now() });
            navigator.clipboard.writeText(clipboard);
          }}
          animate={ballCtrl}
          style={{
            position: 'relative',
            width: `48px`,
            height: `48px`,
            borderRadius: `50%`,
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <CopySVG color="#000000" width={28} height={28} animate={svgCtrl} />
        </Ball>
        <SensitiveItemMainContent>
          <StyledText>{header}</StyledText>
          <StyledText size={Size.SM} style={{ color: '#008578' }}>
            {subHeader}
          </StyledText>
        </SensitiveItemMainContent>
        <TimerText size={Size.MD} style={{ color: '#008578' }}>
          {time}
          <StyledText size={Size.REG} style={{ color: '#008578' }}>
            s
          </StyledText>
        </TimerText>
      </SensitiveItemContainer>
    </AnimatedBlurBox>
  );
};
