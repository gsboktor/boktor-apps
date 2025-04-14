import React, { ChangeEvent, forwardRef } from 'react';
import styled, { css } from 'styled-components';

type BaseNumericInputProps = {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  affixLeft?: React.ReactNode;
  inputValue?: number;
  placeholder?: string;
  placeholderColor?: string;
  disabled?: boolean;
  inputAttr?: React.InputHTMLAttributes<HTMLInputElement>;
  inputContainerAttr?: React.HTMLAttributes<HTMLDivElement>;
  validationMessage?: string;
  severity?: 'info' | 'warning' | 'error';
};

const FormFieldContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  flex-direction: row;
  align-items: center;
  border-radius: 24px;
  padding: 12px;
  gap: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Input = styled.input<{ $placeholderColor?: string }>`
  display: inline-flex;
  flex: 3;
  outline: none;
  border: none;
  text-decoration: none;
  background-color: transparent;
  height: fit-content;
  width: 100%;
  min-width: 36px;
  user-select: none;
  font-family: Inter;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  ${({ $placeholderColor }) =>
    $placeholderColor &&
    css`
      ::placeholder {
        color: ${$placeholderColor};
      }
    `}
`;

const IconContainer = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
`;

export const BaseNumericInput = forwardRef<HTMLInputElement, BaseNumericInputProps>(
  ({ ...props }: BaseNumericInputProps, inputRef) => {
    return (
      <FormFieldContainer {...props?.inputContainerAttr}>
        {props.affixLeft && <IconContainer>{props.affixLeft}</IconContainer>}
        <Input
          $placeholderColor={props.placeholderColor}
          type="number"
          placeholder={props.placeholder}
          ref={inputRef}
          onChange={props.onInputChange}
          value={props?.inputValue}
          disabled={props.disabled}
          {...props.inputAttr}
        />
      </FormFieldContainer>
    );
  },
);
