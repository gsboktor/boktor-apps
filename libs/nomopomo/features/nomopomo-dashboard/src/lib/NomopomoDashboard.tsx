import { useMedia } from 'react-use';
import styled from 'styled-components';
import { MainTimer, NomopomoBlurLogo } from './components';

const NomopomoDashHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
  overflow: visible;
  align-items: center;
  justify-content: space-between;
`;

export const NomopomoDashboard = () => {
  const isTablet = useMedia('(max-width: 768px)');
  return (
    <>
      <NomopomoDashHeader>
        {!isTablet && <NomopomoBlurLogo />}
        <MainTimer />
      </NomopomoDashHeader>
    </>
  );
};
