import React from 'react';
import styled from 'styled-components';

type SecondaryButtonProps = {
  onClick: (p: unknown) => void | unknown;
  label?: string;
  affixLeft?: string | React.ReactNode;
  labelAttr?: React.HTMLAttributes<HTMLParagraphElement>;
};

const StyledRootButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  transition: border-radius ease-in-out 200ms, transform ease-in-out 200ms;
  overflow: hidden;
`;

const ButtonContainer = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  align-items: inherit;
  background-color: transparent;
  cursor: pointer;
  border: none;
  z-index: 100;
  &:hover {
    background-color: #3d3d3d32;
  }
  transition: background-color ease-in-out 200ms;
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
  /* position: absolute; */
  width: 12px;
  height: 12px;
  /* left: 24px; */
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ButtonLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 3;
  padding: 4px 8px;
`;

const Label = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 400;
  font-size: 18px;
  color: #494949;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

export const SecondaryButton = ({ ...props }: SecondaryButtonProps) => {
  return (
    <StyledRootButtonContainer onClick={props?.onClick}>
      <ButtonContainer id="secondary-b-id">
        <ContentContainer>
          {props?.affixLeft && <LeftContent>{props.affixLeft}</LeftContent>}
          {props?.label && (
            <ButtonLabel>
              <Label {...props.labelAttr}>{props.label}</Label>
            </ButtonLabel>
          )}
        </ContentContainer>
      </ButtonContainer>
    </StyledRootButtonContainer>
  );
};
