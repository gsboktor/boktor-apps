import { AnimatePresence, motion, useAnimationControls } from 'motion/react';
import { useRef } from 'react';
import styled from 'styled-components';
import { Size, StyledText } from './StyledText';

const WithHoverText = styled(StyledText)`
  transition: all 500ms ease-in-out;
  &:hover {
    color: #00ddc7;
  }
`;

const TopBarContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 24px;
  gap: 16px;
  z-index: ${Number.MAX_SAFE_INTEGER - 1};

  @media screen and (width < 768px) {
    left: 0px;
    right: 0px;
    margin: auto;
    justify-content: center;
  }
`;

const Col = styled(motion.a)`
  text-decoration: none;
  position: relative;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TopBarItem = ({ label, href }: { label: string; href: string }) => {
  const controls = useAnimationControls();
  const reset = useRef<boolean>(false);

  const handleMouseEnter = () => {
    reset.current = true;
    controls
      .start({
        borderRadius: 24,
        width: 10,
        height: 10,
        transition: { duration: 0.15 },
      })
      .then(() => {
        controls
          .start({
            y: 2,
            transition: { duration: 0.15, type: 'tween' },
          })
          .then(() => {
            if (reset.current) {
              controls
                .start({ borderRadius: 2, width: '100%', height: 3, transition: { duration: 0.1, type: 'tween' } })
                .then(() => (reset.current = false));
            }
          });
      });
  };

  const handleMouseLeave = () => {
    reset.current = false;
    controls
      .start({
        width: 10,
        transition: { duration: 0.1 },
      })
      .then(() => controls.start({ height: 10, width: 10, borderRadius: 16, transition: { duration: 0.1 } }))
      .then(() => {
        if (!reset.current) controls.start({ y: 40 });
      })
      .then(() => {
        if (!reset.current) controls.start({ width: 0, height: 0 });
      });
  };

  return (
    <Col
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={href}
      target="_blank"
      download={label === 'get a resume' ? 'george-boktor-resume.pdf' : undefined}
    >
      <WithHoverText style={{ fontSize: 20 }}>{label}</WithHoverText>
      <AnimatePresence>
        (
        <motion.div
          initial={{
            position: 'absolute',
            bottom: -8,
            justifySelf: 'center',
            y: 40,
            right: 0,
            left: 0,
            margin: 'auto',
            backgroundColor: '#008578',
            width: 0,
            height: 0,
            borderRadius: '50%',
          }}
          animate={controls}
        />
        )
      </AnimatePresence>
    </Col>
  );
};
export const TopBar = () => {
  //
  return (
    <TopBarContainer>
      <TopBarItem label="github" href="https://github.com/gsboktor" />
      <StyledText size={Size.REG}>•</StyledText>
      <TopBarItem label="linkedin" href="https://www.linkedin.com/in/george-boktor/" />
      <StyledText size={Size.REG}>•</StyledText>
      <TopBarItem label="get a resume" href="/assets/george-boktor-resume.pdf" />
    </TopBarContainer>
  );
};
