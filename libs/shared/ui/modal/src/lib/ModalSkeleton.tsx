import { useOutOfBounds } from '@boktor-apps/shared/ui/hooks';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef } from 'react';
import styled from 'styled-components';

const ModalPageContainer = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(64, 64, 64, 0.24);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(8px);

  &:has(div:hover) {
    #m-gradient {
      filter: blur(10px);
    }
  }
`;

type ModalSkeletonRenderProps = {
  setShow: () => void;
  ref: React.RefObject<HTMLDivElement>;
};

type ModalSkeletonProps = {
  show: boolean;
  setShow: () => void;
  render: (p: ModalSkeletonRenderProps) => JSX.Element;
};

export const ModalSkeleton = ({ show, setShow, render }: ModalSkeletonProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    setShow();
  }, [setShow]);

  useOutOfBounds(modalRef, () => {
    closeModal();
  });

  return (
    <AnimatePresence>
      {show && <ModalPageContainer exit={{ opacity: 0 }}>{render({ setShow, ref: modalRef })}</ModalPageContainer>}
    </AnimatePresence>
  );
};
