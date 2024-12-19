// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MainLayout, PortfolioTabBar } from '@boktor-apps/features/boktor-portfolio';
import styled from 'styled-components';

const RootContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  max-width: 1280px;
  margin: 0 auto;
`;

export function App() {
  return (
    <RootContainer>
      <PortfolioTabBar />
      <MainLayout />
    </RootContainer>
  );
}

export default App;
