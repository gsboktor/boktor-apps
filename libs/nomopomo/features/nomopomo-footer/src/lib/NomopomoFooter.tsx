import styled from 'styled-components';
import { BuyMeACoffee } from './components';

const FooterContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  @media screen and (width < 768px) {
    justify-content: flex-end;
    flex-direction: column-reverse;
  }
`;
export const NomopomoFooter = () => {
  return (
    <FooterContainer>
      <p style={{ margin: 0, fontSize: 14 }}>
        Made with ❤️ and ☕ by{' '}
        <b>
          <a href="https://github.com/gsboktor" target="_blank" style={{ textUnderlineOffset: 2, color: '#976700a8' }}>
            George Boktor
          </a>
        </b>
      </p>
      <BuyMeACoffee />
    </FooterContainer>
  );
};
