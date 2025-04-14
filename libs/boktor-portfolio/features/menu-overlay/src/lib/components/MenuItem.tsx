import { Size, StyledText } from '@boktor-apps/boktor-portfolio/ui/components';
import { HTMLMotionProps, motion, useAnimationControls } from 'motion/react';
import { useEffect } from 'react';
import styled from 'styled-components';

const MenuIndicator = styled(motion.div)`
  position: absolute;
  left: -64px;
  top: 0px;
  margin: auto;
  bottom: 0px;
  width: 36px;
  height: 36px;
  background-color: var(--color-accent);
  border-radius: 50%;
`;

const MenuItemContainer = styled(motion.button)`
  background-color: transparent;
  outline: none;
  border: none;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const MenuItem = ({
  label,
  animationDelay,
  ...rest
}: { label: string; animationDelay: number } & Omit<HTMLMotionProps<'button'>, 'ref'>) => {
  const containerControls = useAnimationControls();
  const indicatorControls = useAnimationControls();

  useEffect(() => {
    containerControls.start({
      x: 0,
    });
  }, [containerControls]);

  const animateIn = () => {
    containerControls.start({
      x: 64,
      scale: 1.15,
      transition: { duration: 0.3, type: 'spring' },
    });
    indicatorControls.start({ x: 0, transition: { duration: 0.2 } });
  };

  const animateOut = () => {
    indicatorControls.start({ x: -64, transition: { type: 'spring', duration: 0.25 } });
    containerControls.start({ x: 0, scale: 1, transition: { type: 'spring', duration: 0.25 } });
  };

  return (
    <MenuItemContainer
      role="button"
      layout
      initial={{ x: -400, cursor: 'pointer', width: 'fit-content' }}
      animate={containerControls}
      transition={{ delay: animationDelay, type: 'spring' }}
      {...rest}
    >
      <MenuIndicator initial={{ x: -100 }} animate={indicatorControls} />
      <StyledText size={Size.LG} onMouseOver={animateIn} onMouseLeave={animateOut}>
        {label}
      </StyledText>
    </MenuItemContainer>
  );
};
