import { forwardRef } from 'react';
import styled from 'styled-components';
import { AnimatedToggle } from './AnimatedToggle';

export type SelectionCardProps = {
  toggleFill?: string;
  toggled?: boolean;
  label: string;
  onSelection: () => unknown;
  cardColor?: string;
} & {
  selectionCardAttr?: Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'>;
  toggleContainerAttr?: React.HTMLAttributes<HTMLDivElement>;
} & {
  labelAttr?: React.HTMLAttributes<HTMLParagraphElement>;
};

const StyledSelectionCardContainer = styled.div<{ $mainColor: string }>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 48px;
  background-color: ${({ $mainColor }) => $mainColor};
  flex-direction: row;
  padding: 16px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.035);
    box-shadow: 6px 4px 12px 4px ${({ $mainColor }) => `${$mainColor}44`};
  }
  transition: transform ease-in-out 200ms, box-shadow ease-in-out 200ms;
`;

const SelectionCardToggleContainer = styled.div`
  width: 32px;
  height: 32px;
  z-index: 100;
`;

const SelectionCardToggleLabel = styled.p`
  margin: 0;
  width: 100%;
  flex: 1;
  text-align: center;
  font-size: 24px;
  line-height: 24px;
  font-family: Inter;
  font-weight: 300;
  color: #000000;
`;

export const SelectionCard = forwardRef<HTMLDivElement, SelectionCardProps>(
  ({ toggleFill = '#000000', cardColor = '#d3d3d3', toggled = false, ...props }, cardRef) => {
    return (
      <StyledSelectionCardContainer
        {...props.selectionCardAttr}
        ref={cardRef}
        onClick={() => {
          props.onSelection?.();
        }}
        $mainColor={cardColor}
      >
        <SelectionCardToggleContainer {...props.toggleContainerAttr}>
          <AnimatedToggle fill={toggleFill} toggled={toggled} />
        </SelectionCardToggleContainer>
        <SelectionCardToggleLabel {...props.labelAttr}>{props.label}</SelectionCardToggleLabel>
      </StyledSelectionCardContainer>
    );
  },
);
