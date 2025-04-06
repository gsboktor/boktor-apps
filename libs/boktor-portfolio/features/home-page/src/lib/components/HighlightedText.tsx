import React from 'react';
import styled from 'styled-components';
import { Size, StyledText, Weight } from './StyledText';

const Backdrop = styled.div`
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #006056;
  transition: all 175ms ease-in-out;
  backdrop-filter: blur(6px);
  cursor: pointer;
  user-select: none;
  &:hover {
    transform: scale(1.2);
  }
`;

export const HighlightedText = ({ children, ...rest }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Backdrop {...rest}>
      <StyledText size={Size.SM} weight={Weight.None}>
        {children}
      </StyledText>
    </Backdrop>
  );
};
