import { useOutOfBounds, useRenderDirection } from '@boktor-apps/shared/ui/hooks';
import { AnimatePresence } from 'motion/react';
import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

export type DropdownProps<T> = {
  items: T[];
  length: number;
  Icon: React.ReactNode;
  open?: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOptionSelect: (option: T) => void;
  render: (item: T, idx: number, onSelection: (option: T) => void) => React.ReactNode;
  placeholder?: string;
};

const DropdownRootContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  overflow: visible;
  user-select: none;
  cursor: pointer;
`;

const DropdownFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff45;
  border-radius: 24px;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  height: fit-content;
  padding: 8px;
  gap: 8px;
  &:hover {
    background-color: #ffffff70;
    transform: scale(1.025);
  }
  transition: background-color ease-in-out 200ms, transform ease-in-out 200ms;
`;

const DropdownFieldLabel = styled.p`
  margin: 0;
  display: flex;
  font-family: Inter;
  font-weight: 300;
  font-size: 14px;
  flex: 1;
`;

const DropdownFieldIconContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropdownContainer = styled.div<{ $dir?: 'up' | 'down' }>`
  position: relative;
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: 6px;
  position: absolute;
  ${({ $dir }) =>
    $dir === 'down'
      ? css`
          top: 48px;
        `
      : css`
          transform: translateY(calc(-100% - 8px));
        `};

  z-index: 1000;
`;

export const Dropdown = <T,>({ placeholder = 'Select an option', ...props }: DropdownProps<T>) => {
  const dropdownRootRef = useRef<HTMLDivElement>(null);
  const { direction } = useRenderDirection(dropdownRootRef);

  useOutOfBounds(dropdownRootRef, () => {
    props.onClose();
  });

  return (
    <DropdownRootContainer id="dropdown-root" ref={dropdownRootRef}>
      <DropdownFieldContainer onClick={() => (!props.open ? props.onOpen() : props.onClose())}>
        <DropdownFieldLabel>{placeholder}</DropdownFieldLabel>
        {props.Icon && <DropdownFieldIconContainer>{props.Icon}</DropdownFieldIconContainer>}
      </DropdownFieldContainer>
      <AnimatePresence>
        {props.open && (
          <DropdownContainer $dir={direction.current}>
            {props.items.map((item, idx) => {
              const isReversed = direction.current === 'up';
              return props.render(item, isReversed ? props.length - 1 - idx : idx, props.onOptionSelect);
            })}
          </DropdownContainer>
        )}
      </AnimatePresence>
    </DropdownRootContainer>
  );
};
