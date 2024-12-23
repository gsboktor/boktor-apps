// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NomopomoDashboard } from '@boktor-apps/nomopomo/features/nomopomo-dashboard';
import styled from 'styled-components';

const AppContainer = styled.div``;

export function App() {
  const string = process.env.NX_PUBLIC_TEST_STRING;
  return (
    <AppContainer id="app-container">
      <NomopomoDashboard />
      <p>{string}</p>
    </AppContainer>
  );
}

export default App;
