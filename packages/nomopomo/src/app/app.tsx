// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NomopomoDashboard } from '@boktor-apps/nomopomo/features/nomopomo-dashboard';
import { NomopomoFooter } from '@boktor-apps/nomopomo/features/nomopomo-footer';
import { ModalSkeleton } from '@boktor-apps/shared/ui/modal';

import { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from './globalStyles';

const AppContainer = styled.div`
  position: relative;
`;

export function App() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <AppContainer id="app-container">
        <GlobalStyles />
        <NomopomoDashboard />
        <NomopomoFooter />
        <button onClick={() => setShow(!show)}>show</button>
      </AppContainer>
      <ModalSkeleton show={show} setShow={setShow} />
    </>
  );
}

export default App;
