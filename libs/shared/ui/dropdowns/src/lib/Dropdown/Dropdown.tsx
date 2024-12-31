import React, { useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';

export type DropdownProps<T> = {
  items: T[];
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
  width: calc(100% - 16px);
  height: fit-content;
  padding: 8px;
  gap: 8px;
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
  const dropdownRenderDirection = useRef<'up' | 'down'>();

  const handleDropdownOpen = useCallback(() => {
    if (!dropdownRootRef.current?.getBoundingClientRect) return;

    if (dropdownRootRef.current?.getBoundingClientRect().y > window.innerHeight / 2) {
      dropdownRenderDirection.current = 'up';
    } else {
      dropdownRenderDirection.current = 'down';
    }

    props.onOpen();
  }, []);

  return (
    <DropdownRootContainer id="dropdown-root" ref={dropdownRootRef}>
      <DropdownFieldContainer>
        <DropdownFieldLabel>{placeholder}</DropdownFieldLabel>
        {props.Icon && (
          <DropdownFieldIconContainer onClick={() => (props.open ? props.onClose() : handleDropdownOpen())}>
            {props.Icon}
          </DropdownFieldIconContainer>
        )}
      </DropdownFieldContainer>
      {props.open && (
        <DropdownContainer $dir={dropdownRenderDirection.current}>
          {props.items.map((item, idx) => {
            return props.render(item, idx, props.onOptionSelect);
          })}
        </DropdownContainer>
      )}
    </DropdownRootContainer>
  );
};
