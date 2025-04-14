import { toastsAtom } from '@boktor-apps/boktor-portfolio/data-access/store';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';
import styled from 'styled-components';
import { ToastComponent } from './Toast';

export const ToastContainer = styled(motion.div)`
  min-width: 250px;
  width: 'fit-content';
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: absolute;
  bottom: 8px;
  left: 0px;
  right: 0px;
  margin: auto;
`;

export const ToastItemSkeleton = styled(motion.div)`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToastList = () => {
  const toasts = useAtomValue(toastsAtom);

  return (
    <AnimatePresence>
      <ToastContainer layout>
        <AnimatePresence>
          {toasts.length > 0 &&
            toasts.map((t, idx) => {
              return (
                <ToastItemSkeleton layout key={t.id}>
                  <ToastComponent t={t} />
                </ToastItemSkeleton>
              );
            })}
        </AnimatePresence>
      </ToastContainer>
    </AnimatePresence>
  );
};
