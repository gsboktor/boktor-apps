import { motion } from 'motion/react';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import noise from './assets/noise.svg';
import { SideModalMainContent } from './components';

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
    width: 100%;
    height: 75%;
  }
  width: 500px;
  height: 92vh;
`;
const ModalAnimatedWrapper = styled(motion.div)`
  position: absolute;
  left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${ModalDimensions}
  @media screen and (width < 748px) {
    bottom: 0;
    left: 0;
  }
`;

const ModalGradient = styled.div`
  position: absolute;
  width: calc(100% + 24px);
  height: calc(100% + 48px);
  border-radius: 36px;
  filter: blur(64px);
  background: var(--gradient-shadow);
  background-size: 400%;
  animation: ${animate} 20s linear infinite;
  transition: filter ease-in-out 200ms;
`;

const ModalContainer = styled.div`
  position: relative; // Add this
  padding: 16px;
  background: linear-gradient(#f5deb36a, #f5deb36a), url(${noise});
  box-shadow: 0px 0px 64px 12px #00000015;
  border-radius: 36px;
  width: 100%;
  height: 100%;
  z-index: 1001; // Increase z-index to be above the blur
  @media screen and (width < 748px) {
    border-radius: 36px 36px 0px 0px;
  }
`;

type NomopomoSideModalProps = {
  closeModal: (p: boolean) => void;
};

export const NomopomoSideModal = React.forwardRef<HTMLDivElement, NomopomoSideModalProps>((props, modalRef) => {
  return (
    <ModalAnimatedWrapper
      ref={modalRef}
      initial={{ opacity: 0, x: -500 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        type: 'spring',
        bounce: 0.4,
      }}
      exit={{
        x: -500,
        transition: {
          duration: 0.2,
          type: 'tween',
          ease: 'easeOut',
        },
      }}
    >
      <ModalGradient id="m-gradient" />
      <ModalContainer>
        <SideModalMainContent />
      </ModalContainer>
    </ModalAnimatedWrapper>
  );
});
