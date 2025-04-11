import { AnimatePresence, motion, useAnimationControls } from 'motion/react';
import { useRef } from 'react';
import styled from 'styled-components';
import { StyledText } from './StyledText';

const WithHoverText = styled(StyledText)`
  transition: all 500ms ease-in-out;
  &:hover {
    color: #00ddc7;
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

const AccentBall = styled(motion.div)`
  background-color: var(--color-accent);
`;

export const StyledHoverButton = ({
  label,
  href,
  fontSize,
  offset = 40,
}: {
  label: string;
  href: string;
  fontSize?: number;
  offset?: number;
}) => {
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
        if (!reset.current) controls.start({ y: offset });
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
      <WithHoverText style={{ fontSize: fontSize ?? 20 }}>{label}</WithHoverText>
      <AnimatePresence>
        (
        <AccentBall
          initial={{
            position: 'absolute',
            bottom: -8,
            justifySelf: 'center',
            y: offset,
            right: 0,
            left: 0,
            margin: 'auto',
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
