import { useTimer } from '@boktor-apps/nomopomo/data-access/hooks';
import { activeModalAtom, timerSelectorAtom } from '@boktor-apps/nomopomo/data-access/store';
import { NomopomoFooter } from '@boktor-apps/nomopomo/features/nomopomo-footer';
import { useAtom } from 'jotai';
import { AnimatePresence } from 'motion/react';
import React, { Suspense, useRef } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from './globalStyles';

const ModalSkeleton = React.lazy(async () => {
  let _module = await import('@boktor-apps/shared/ui/modal');
  return { default: _module.ModalSkeleton };
});

const NomopomoDashboard = React.lazy(async () => {
  let _module = await import('@boktor-apps/nomopomo/features/nomopomo-dashboard');
  return { default: _module.NomopomoDashboard };
});

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export function App() {
  const [modalState, setModalState] = useAtom(activeModalAtom);
  const [timeSelector, setTimeSelector] = useAtom(timerSelectorAtom);
  const elapsedRef = useRef<number>(0);

  useTimer((elapsed: number) => {
    if (!timeSelector.active || timeSelector.time < 0) return;
    elapsedRef.current += elapsed;
    if (elapsedRef.current >= 1000) {
      const secondsToDecrease = Math.floor(elapsedRef.current / 1000);
      setTimeSelector({ newTime: timeSelector.time - secondsToDecrease });
      elapsedRef.current = elapsedRef.current % 1000;
    }
  });

  return (
    <>
      <GlobalStyles />
      <AppContainer id="app-container">
        <Suspense fallback={<p>Loading...</p>}>
          <NomopomoDashboard />
        </Suspense>
        <NomopomoFooter />
      </AppContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence>
          {modalState?.show && (
            <ModalSkeleton
              show={modalState?.show ?? false}
              setShow={() => {
                setModalState(null);
              }}
              render={(p) => {
                if (!modalState?.Component) return <></>;
                const ModalComponent = modalState.Component;
                return <ModalComponent ref={p.ref} closeModal={p.setShow} />;
              }}
            />
          )}
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default App;
