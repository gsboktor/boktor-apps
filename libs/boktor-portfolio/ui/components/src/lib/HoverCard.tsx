import { AnimatePresence, HTMLMotionProps, motion, useAnimationControls } from 'motion/react';
import { forwardRef, useCallback, useState } from 'react';
import styled from 'styled-components';
import { AnimatedBlurBox } from './AnimatedBlurBox';
import { Ball } from './Bullet';
import { Size, StyledText } from './StyledText';

const HoverButtonContainer = styled(motion.button)`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 16px;
  border-radius: 12px;
  flex-direction: row;
  background-color: transparent;
  outline: none;
  border: none;
  gap: 8px;
  cursor: pointer;
`;

const HoverButtonIconContainer = styled(motion.div)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HoverButtonTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
  align-items: start;
  justify-content: center;
`;

const HoverCardHighlighter = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: #42424281;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: auto;
  z-index: -1;
`;

const HoverP = styled(motion.p)`
  font-family: 'Merriweather';
  font-size: 20px;
`;

type HoverCardProps = {
  labelHeader: string;
  labelSubheader: string;
  iconLabel: string;
  addItem?: (id: string) => void;
} & HTMLMotionProps<'button'>;

export const HoverCard = forwardRef<HTMLButtonElement, HoverCardProps>(({ ...props }: HoverCardProps, buttonRef) => {
  const hoverIconControls = useAnimationControls();
  const iconTextControls = useAnimationControls();
  const ballControls = useAnimationControls();

  const [showHighlighter, setShowHighlighter] = useState<boolean>(false);

  const handleSetHighlighter = useCallback(() => {
    props.addItem?.(props.id ?? '');

    setShowHighlighter(true);
    hoverIconControls.start({ backgroundColor: '#008578' });
    iconTextControls.start({ color: '#ffffff', scale: 1.2, transition: { bounce: 0.6 } });
    ballControls.start({ backgroundColor: '#ffffff', boxShadow: `0px 0px 24px 2px #2c2c2c` });
  }, [ballControls, hoverIconControls, iconTextControls, props]);

  const handleRemoveHighlighter = useCallback(() => {
    setShowHighlighter(false);
    hoverIconControls.start({ backgroundColor: '#ffffff' });
    iconTextControls.start({ color: '#000000', scale: 1 });
    ballControls.start({ backgroundColor: '#008578', boxShadow: `0px 0px 0px 0px #2c2c2c` });
  }, [ballControls, hoverIconControls, iconTextControls]);

  return (
    <AnimatedBlurBox style={{ width: 'fit-content' }}>
      <AnimatePresence>
        <HoverButtonContainer
          {...props}
          ref={buttonRef}
          onMouseEnter={() => handleSetHighlighter()}
          onMouseLeave={() => handleRemoveHighlighter()}
        >
          <Ball style={{ borderRadius: 50 }} animate={ballControls} initial={{ boxShadow: `0px 0px 0px 0px #2c2c2c` }} />
          <HoverButtonIconContainer
            initial={{ backgroundColor: '#ffffff' }}
            animate={hoverIconControls}
            transition={{ duration: 0.25 }}
          >
            <HoverP initial={{ color: '#000000' }} animate={iconTextControls}>
              {props.iconLabel}
            </HoverP>
          </HoverButtonIconContainer>
          <HoverButtonTextBlock>
            <StyledText>{props.labelHeader}</StyledText>
            <StyledText size={Size.SM} color="#aaaaaa">
              {props.labelSubheader}
            </StyledText>
          </HoverButtonTextBlock>
          {showHighlighter && (
            <HoverCardHighlighter
              key={props.id}
              id={'highlighter'}
              layout
              layoutId="__hover_button_highlighter"
              transition={{ layout: { type: 'spring', duration: 0.75 } }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </HoverButtonContainer>
      </AnimatePresence>
    </AnimatedBlurBox>
  );
});
