import styled from 'styled-components';
import { Bullet } from './Bullet';
import { Size, StyledText } from './StyledText';

const CmdCTAContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  position: absolute;
  bottom: 16px;
  right: 16px;
  align-items: center;
  justify-content: center;
`;

const ButtonGroupContainer = styled.div`
  padding: 6px 10px;
  border-radius: 12px;
  background-color: #5f5f5fb6;
`;

export const CmdCTA = () => {
  return (
    <CmdCTAContainer>
      <Bullet cta={"'⌘ + G' for Menu"} direction="left" />
      <ButtonGroupContainer>
        <StyledText size={Size.REG}>⌘ + G</StyledText>
      </ButtonGroupContainer>
    </CmdCTAContainer>
  );
};
