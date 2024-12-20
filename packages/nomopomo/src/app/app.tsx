// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NomopomoDashboard } from '@boktor-apps/nomopomo/features/nomopomo-dashboard';
import styled from 'styled-components';

const AppContainer = styled.div``;

export function App() {
  return (
    <AppContainer id="app-container">
      <NomopomoDashboard />
    </AppContainer>
  );
}

export default App;
