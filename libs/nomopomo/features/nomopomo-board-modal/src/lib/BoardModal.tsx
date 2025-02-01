import { Noise } from '@boktor-apps/shared/ui/assets';
import { motion } from 'motion/react';
import React, { forwardRef, Suspense } from 'react';
import styled, { css, keyframes } from 'styled-components';

const BoardModalBody = React.lazy(() => import('./components').then((_) => ({ default: _.BoardModalBody })));

const animate = keyframes`
    0% {
		background-position: 0 0;
	}
	50% {
		background-position: 300% 0;
	}
	100% {
		background-position: 0 0;
	}
`;

const ModalDimensions = css`
  @media screen and (width < 748px) {
    width: 80%;
    height: fit-content;
  }
  width: 375px;
  height: fit-content;
`;

const ModalAnimatedWrapper = styled(motion.div)`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  ${ModalDimensions}
`;

const ModalGradient = styled.div`
  position: absolute;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  border-radius: 24px;
  filter: blur(64px);
  background: var(--gradient-shadow);
  background-size: 400%;
  animation: ${animate} 20s linear infinite;
  transition: filter ease-in-out 200ms;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 16px;
  gap: 8px;
  box-sizing: border-box;
  /* background: linear-gradient(#f5deb36a, #f5deb36a), url(${Noise}); */
  background-color: #ffead2;
  justify-content: center;
  box-shadow: 0px 0px 64px 12px #00000015;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  z-index: 1001;
`;

export const BoardModal = forwardRef<HTMLDivElement>((_, modalRef) => {
  return (
    <ModalAnimatedWrapper
      initial={{ y: -100, opacity: 0.75 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0, transition: { duration: 0.1 } }}
      transition={{ type: 'spring', bounce: 0.5 }}
      ref={modalRef}
    >
      <ModalGradient id="m-gradient" />
      <ModalContainer>
        <Suspense fallback={<p>Loading...</p>}>
          <BoardModalBody />
        </Suspense>
      </ModalContainer>
    </ModalAnimatedWrapper>
  );
});
