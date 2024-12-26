// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NomopomoDashboard } from '@boktor-apps/nomopomo/features/nomopomo-dashboard';
import { NomopomoFooter } from '@boktor-apps/nomopomo/features/nomopomo-footer';

import styled from 'styled-components';
import { GlobalStyles } from './globalStyles';

const AppContainer = styled.div``;

export function App() {
  return (
    <AppContainer id="app-container">
      <GlobalStyles />
      <NomopomoDashboard />
      <NomopomoFooter />
    </AppContainer>
  );
}

export default App;
