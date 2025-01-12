// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NomopomoDashboard } from '@boktor-apps/nomopomo/features/nomopomo-dashboard';
import { NomopomoFooter } from '@boktor-apps/nomopomo/features/nomopomo-footer';
// import { ModalSkeleton } from '@boktor-apps/shared/ui/modal';

import { activeModalAtom } from '@boktor-apps/nomopomo/data-access/store';
import { useAtom } from 'jotai';
import { AnimatePresence } from 'motion/react';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from './globalStyles';

const ModalSkeleton = React.lazy(async () => {
  let _module = await import('@boktor-apps/shared/ui/modal');
  return { default: _module.ModalSkeleton };
});

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export function App() {
  const [modalState, setModalState] = useAtom(activeModalAtom);

  return (
    <>
      <GlobalStyles />
      <AppContainer id="app-container">
        <NomopomoDashboard />
        <NomopomoFooter />
      </AppContainer>
      <Suspense fallback={<div>Loading!</div>}>
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
