import styled from 'styled-components';
import { BuyMeACoffee, MainTimer, NomopomoBlurLogo } from './components';

const NomopomoDashHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 16px;
  overflow: visible;
  align-items: center;
`;

export const NomopomoDashboard = () => {
  return (
    <>
      <NomopomoDashHeader>
        <NomopomoBlurLogo />
        <MainTimer />
      </NomopomoDashHeader>
      <BuyMeACoffee />
    </>
  );
};
