import styled from 'styled-components';

const BMACContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: fit-content;
`;

const Image = styled.img`
  max-width: 164px;
  &:hover {
    transform: scale(1.075);
  }
  transition: transform ease-in-out 300ms;
`;

const HelperText = styled.p`
  font-size: 14px;
  margin: 0px;
  font-family: 'Inter', sans-serif;
  color: #2f2f2f;
`;

export const BuyMeACoffee = () => {
  return (
    <BMACContainer>
      <HelperText>Enjoying Nomopomo?</HelperText>
      <a href="https://www.buymeacoffee.com/gsboktor" target="_blank">
        <Image src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=gsboktor&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
      </a>
    </BMACContainer>
  );
};
