import { AnimatePresence, motion, useAnimationControls } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Size, StyledText } from './StyledText';

const BulletPoint = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;
  overflow: hidden;
`;

export const Ball = styled(motion.div)`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: var(--color-accent);
  z-index: 100;
`;

export const Bullet = ({
  cta,
  direction = 'right',
  handleClick,
}: {
  cta: string;
  direction?: 'left' | 'right';
  handleClick?: React.HTMLAttributes<HTMLButtonElement>['onClick'];
}) => {
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);
  const [content, setShowContent] = useState(false);
  const suspendHover = useRef<boolean>(false);

  useEffect(() => {
    if (!isHovered) {
      setShowContent(false);
      suspendHover.current = true;
      controls
        .start({
          scale: 1,
          height: 16,
          transition: { duration: 0.25 },
        })
        .then(() => {
          controls
            .start({
              width: 16,
              height: 16,
              transition: { duration: 0.25 },
            })
            .then(() => {
              suspendHover.current = false;
              controls.start({
                scale: [1, 1.3, 1],
                width: 16,
                height: 16,
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              });
            });
        });
    } else {
      controls.stop();
      controls
        .start({
          scale: 1,
          width: 200,
          borderRadius: '18px',
          transition: { duration: 0.25 },
        })
        .then(() => {
          controls
            .start({
              height: 32,
              transition: { duration: 0.15 },
            })
            .then(() => {
              !content && setShowContent(true);
            });
        });
    }

    return () => {
      controls.stop();
    };
  }, [isHovered, controls, content]);

  return (
    <BulletPoint
      onClick={(e) => handleClick?.(e)}
      style={{ willChange: 'transform, height, width' }}
      initial={{
        borderRadius: '50%',
        width: 16,
        height: 16,
      }}
      animate={controls}
      onHoverStart={() => !suspendHover.current && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {content && !suspendHover.current && (
          <>
            <motion.div
              style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <StyledText color="black" size={Size.SM}>
                {cta}
              </StyledText>
            </motion.div>
            <Ball
              initial={{
                right: direction === 'right' ? 8 : undefined,
                left: direction === 'left' ? 8 : undefined,
                x: direction === 'right' ? 16 : -16,
                borderRadius: 50,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                borderRadius: 2,
                width: 100,
                height: 8,
                x: direction === 'right' ? -100 : 100,
                transition: {
                  delay: 0.1,
                  duration: 0.45,
                },
              }}
            />
          </>
        )}
      </AnimatePresence>
    </BulletPoint>
  );
};
