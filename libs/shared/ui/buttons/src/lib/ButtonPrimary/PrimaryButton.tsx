import styled, { keyframes } from 'styled-components';

type PrimaryButtonProps = {
  onClick: (p: unknown) => void | unknown;
  label: string;
  affixLeft?: string | React.ReactNode;
  withGradient?: boolean;
};

const animate = keyframes`
    0% {
        background-position: 0 200%;
    }
    25% {
        background-position: 200% 200%;
    }
    50% {
        background-position: 400% 200%;
    }
    75% {
        background-position: 200% 200%;
    }
    100% {
        background-position: 0 200%;
    }
`;

const StyledRootButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  &:has(button:hover) {
    #b-gradient {
      background: var(--gradient-shadow);
      background-size: 600%;
      opacity: 1;
      filter: blur(8px);
      animation: ${animate} 20s linear infinite;
    }
    border-radius: 36px;
    transform: scale(0.95);
  }
  transition: border-radius ease-in-out 200ms, transform ease-in-out 200ms;
  overflow: hidden;
`;

const ButtonGradient = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  transition: opacity ease-in-out 300ms;
`;

const ButtonContainer = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  align-items: inherit;
  background-color: #ffcd62a8;
  cursor: pointer;
  border: none;
  z-index: 100;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  height: fit-content;
  align-items: center;
  line-height: 24px;
`;

const LeftContent = styled.div`
  display: flex;
  position: absolute;
  left: 24px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ButtonLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 3;
`;

const Label = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 400;
  font-size: 24px;
  color: #494949;
`;

export const PrimaryButton = ({ withGradient = true, ...props }: PrimaryButtonProps) => {
  return (
    <StyledRootButtonContainer onClick={props?.onClick}>
      {withGradient && <ButtonGradient id="b-gradient" />}
      <ButtonContainer id="b-id">
        <ContentContainer>
          {props?.affixLeft && <LeftContent>{props.affixLeft}</LeftContent>}
          <ButtonLabel>
            <Label>{props.label}</Label>
          </ButtonLabel>
        </ContentContainer>
      </ButtonContainer>
    </StyledRootButtonContainer>
  );
};
