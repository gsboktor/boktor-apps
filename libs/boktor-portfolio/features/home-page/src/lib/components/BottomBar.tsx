import { Size, StyledText } from '@boktor-apps/boktor-portfolio/ui/components';
import styled from 'styled-components';

const BottomBarContainer = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 24px;
  gap: 16px;
  z-index: ${Number.MAX_SAFE_INTEGER - 1};

  @media screen and (width < 768px) {
    left: 0px;
    right: 0px;
    margin: auto;
    justify-content: center;
  }
`;

const HoverText = styled(StyledText)`
  cursor: pointer;
`;
export const BottomBar = () => {
  return (
    <BottomBarContainer>
      <StyledText size={Size.SM}>
        designed & built by •{' '}
        <HoverText size={Size.SM} style={{ textDecoration: 'underline', textUnderlineOffset: 6 }}>
          George Boktor
        </HoverText>
      </StyledText>
    </BottomBarContainer>
  );
};
