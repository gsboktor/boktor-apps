import styled from 'styled-components';
import { BuyMeACoffee } from './components';

const FooterContainer = styled.div`
  position: absolute;
  bottom: 18px;
  width: calc(100% - 36px);
  margin: auto;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
export const NomopomoFooter = () => {
  return (
    <FooterContainer>
      <BuyMeACoffee />
    </FooterContainer>
  );
};
