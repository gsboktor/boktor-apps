import styled from 'styled-components';

const BMACContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: fit-content;
  &:hover {
    > #blur-object {
      transform: scale(1.025);
      box-shadow: 0px 0px 128px 64px #ffc039a9;
      background: #ffcd62a8;
    }
  }
`;

const BlurObject = styled.div`
  position: absolute;
  border-radius: 12px;
  box-shadow: none;
  width: 164px;
  height: 35px;
  z-index: -1;
  bottom: 4px;
  transition: box-shadow ease-in-out 250ms, background ease-in-out 250ms, transform ease-in-out 250ms;
`;

const Image = styled.img`
  max-width: 164px;
  position: relative; // Add this
  &:hover {
    transform: scale(1.075);
  }
  transition: transform ease-in-out 300ms;
`;

const HelperText = styled.p`
  font-size: 14px;
  margin: 0px;
  font-family: 'Inter';
  color: #2f2f2f;
`;

export const BuyMeACoffee = () => {
  return (
    <BMACContainer>
      <HelperText>Enjoying Nomopomo?</HelperText>
      <a href="https://www.buymeacoffee.com/gsboktor" target="_blank">
        <Image src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=gsboktor&button_colour=ffcd62a8&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
      </a>
      <BlurObject id="blur-object" />
    </BMACContainer>
  );
};
