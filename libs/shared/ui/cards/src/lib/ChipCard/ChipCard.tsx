import React from 'react';
import styled, { keyframes } from 'styled-components';

export const getComplementaryColors = (hexColor: string) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Generate complementary colors by rotating hue
  const complement1 = `hsl(${(r + 120) % 360}, ${g}%, ${b}%)`;
  const complement2 = `hsl(${(r + 240) % 360}, ${g}%, ${b}%)`;

  return `linear-gradient(45deg, ${hexColor}, ${complement1}, ${complement2}, ${hexColor}, ${complement1}, ${complement2}, ${hexColor}, ${complement1}, ${complement2}, ${hexColor}, ${complement1}, ${complement2})`;
};

type ChipCardProps = {
  label: string;
  onActionClick: () => void;
  containerAttr?: React.HTMLAttributes<HTMLDivElement>;
  actionButtonAttr?: React.HTMLAttributes<HTMLButtonElement>;
  labelAttr?: React.HTMLAttributes<HTMLParagraphElement>;
  mainColor?: string;
  Icon?: React.ReactNode;
};

const animate = keyframes`
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: 300% 0;
    }
    100% {
        background-position: 0 0;
    }
`;

const ChipContainer = styled.div<{ $mainColor: string }>`
  position: relative;
  width: fit-content;
  height: fit-content;
  padding: 5px 12px;
  border-radius: 16px;
  background-color: ${({ $mainColor }) => $mainColor};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  z-index: 100;
`;

const ChipContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: space-between;
  align-items: center;
`;

const ChipLabel = styled.p`
  margin: 0;
  width: 100%;
  flex: 1;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  font-family: Inter;
  white-space: nowrap;
  font-weight: 300;
  color: #000000;
`;

const IconContainer = styled.button<{ $mainColor: string }>`
  border: none;
  border-radius: 50%;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  box-sizing: border-box;
  margin: 0;
  padding: 8px;
  &:hover {
    background-color: ${({ $mainColor }) => $mainColor + `22`};
    cursor: pointer;
  }
  transition: background-color ease-in-out 200ms;
`;

const ChipGradient = styled.div<{ $mainColor: string }>`
  position: absolute;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  border-radius: 18px;
  top: -4;
  left: -4;
  opacity: 0;
  background: ${({ $mainColor }) => {
    return getComplementaryColors($mainColor);
  }};
  background-size: 400%;
  transition: opacity ease-in-out 300ms;
  pointer-events: none;
`;

const GradientContainer = styled.div`
  position: relative;
  height: fit-content;
  &:hover {
    #chip-gradient {
      opacity: 1;
      animation: ${animate} 20s linear infinite;
      z-index: -1;
    }
  }
  width: fit-content;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChipCard = ({ mainColor = '#f8b577', ...props }: ChipCardProps) => {
  return (
    <GradientContainer>
      <ChipGradient id="chip-gradient" $mainColor={mainColor} />
      <ChipContainer $mainColor={mainColor} {...props.containerAttr}>
        <ChipContent>
          {props.Icon && (
            <IconContainer $mainColor={'#000000'} {...props.actionButtonAttr}>
              {props.Icon}
            </IconContainer>
          )}
          <ChipLabel {...props.labelAttr}>{props.label}</ChipLabel>
        </ChipContent>
      </ChipContainer>
    </GradientContainer>
  );
};
