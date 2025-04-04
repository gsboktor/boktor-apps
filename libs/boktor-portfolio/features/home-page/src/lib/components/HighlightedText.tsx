import styled from 'styled-components';
import { Size, StyledText, Weight } from './StyledText';

const BackdropContainer = styled.div`
  display: inline-flex;
  width: fit-content;
  height: fit-content;
`;

const Backdrop = styled.div`
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #00857859;
  transition: all 175ms ease-in-out;
  backdrop-filter: blur(6px);
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export const HighlightedText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Backdrop>
      <StyledText size={Size.SM} weight={Weight.None}>
        {children}
      </StyledText>
    </Backdrop>
  );
};
