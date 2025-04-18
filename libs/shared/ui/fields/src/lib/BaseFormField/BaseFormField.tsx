import React, { ChangeEvent, forwardRef } from 'react';
import styled, { css } from 'styled-components';

type BaseFormFieldProps = {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
  placeholder?: string;
  placeholderColor?: string;
  disabled?: boolean;
  inputAttr?: React.InputHTMLAttributes<HTMLInputElement>;
  inputContainerAttr?: React.HTMLAttributes<HTMLDivElement>;
  validationMessage?: string;
  severity?: 'info' | 'warning' | 'error';
  limit?: number;
};

const FormFieldContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: 4px;
  & > input {
    transition: box-shadow ease-in-out 200ms;
    &:focus {
      box-shadow: 0px 0px 0px 2px inset #3a3a3a;
    }
  }
`;

const Input = styled.input<{ $placeholderColor?: string }>`
  display: inline-block;
  outline: none;
  border: none;
  text-decoration: none;
  background-color: transparent;
  border-radius: 24px;
  width: calc(100% - 24px);
  height: fit-content;
  user-select: none;
  padding: 12px;
  font-family: Inter;
  font-weight: 300;

  ${({ $placeholderColor }) =>
    $placeholderColor &&
    css`
      ::placeholder {
        color: ${$placeholderColor};
      }
    `}
`;

const ValidationText = styled.p<{ $severity?: string }>`
  margin: 0;
  font-family: Inter;
  display: flex;
  align-self: flex-start;
  font-weight: 300;
  font-size: 14px;
  padding-left: 16px;
  color: ${({ $severity }) => {
    switch ($severity) {
      case 'info': {
        return `black`;
      }
      case 'warn': {
        return `yellow`;
      }
      case 'error': {
        return `red`;
      }
      default: {
        return `black`;
      }
    }
  }};
`;

export const BaseFormField = forwardRef<HTMLInputElement, BaseFormFieldProps>(
  ({ ...props }: BaseFormFieldProps, inputRef) => {
    return (
      <FormFieldContainer {...props?.inputContainerAttr}>
        <Input
          $placeholderColor={props.placeholderColor}
          placeholder={props.placeholder}
          ref={inputRef}
          maxLength={props.limit}
          onChange={props.onInputChange}
          value={props?.inputValue}
          disabled={props.disabled}
          {...props.inputAttr}
        />
        {props.validationMessage && (
          <ValidationText $severity={props.severity}>{props.validationMessage}</ValidationText>
        )}
      </FormFieldContainer>
    );
  },
);
