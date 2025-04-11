import { AnimatedBlurBox, Ball } from '@boktor-apps/boktor-portfolio/ui/components';
import { motion } from 'motion/react';
import styled from 'styled-components';

const DetailsContainer = styled(AnimatedBlurBox)`
  display: flex;
  flex-direction: column;
  justify-content: left;
  position: relative;
  padding-left: 24px;
  max-width: 525px;
  width: fit-content;
`;

const DetailsDivider = styled(motion.div)`
  position: absolute;
  display: flex;
  height: 100%;
  left: 0;
  flex: 1;
  min-height: 100%; /* Add this to enforce minimum height */
`;

export const ProjectDetailsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <DetailsContainer style={{ alignItems: 'start', maxWidth: 575 }}>
      <Ball
        layoutId="b1"
        initial={{ borderRadius: '50%', right: -24, top: 12 }}
        animate={{ right: 16, transition: { duration: 0.5, type: 'spring' } }}
        exit={{ right: -24 }}
      />
      <DetailsDivider
        initial={{
          width: 8,
          backgroundColor: 'white',
          y: -100,
          filter: 'blur(16px)',
          opacity: 0,
          borderRadius: 2,
          height: '100%' /* Add explicit height to initial state */,
        }}
        animate={{ y: 0, filter: 'blur(0px)', opacity: 1, height: '100%', minHeight: '100%' /* Add to animate state as well */ }}
        exit={{ y: -100, filter: 'blur(16px)', opacity: 0 }}
      />
      {children}
    </DetailsContainer>
  );
};
