import { motion } from 'motion/react';
import styled from 'styled-components';

const ToggleBoundary = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
`;

export const AnimatedToggle = ({ toggled, fill }: { fill: string; toggled: boolean }) => {
  return (
    <ToggleBoundary
      role="checkbox"
      aria-checked={toggled}
      animate={{
        boxShadow: toggled ? `0px 0px 0px 8px inset ${fill}` : `0px 0px 0px 0px inset ${fill}`,
      }}
      transition={
        !toggled
          ? {
              duration: 0.2,
            }
          : {
              duration: 0.2,
              type: 'spring',
              stiffness: 200,
              damping: 10,
            }
      }
    />
  );
};
