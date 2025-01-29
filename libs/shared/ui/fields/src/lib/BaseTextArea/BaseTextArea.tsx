import React, { ChangeEvent, forwardRef } from 'react';
import styled, { css } from 'styled-components';

type BaseTextAreaProps = {
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  inputValue?: string;
  placeholder?: string;
  placeholderColor?: string;
  disabled?: boolean;
  textareaAttr?: React.InputHTMLAttributes<HTMLTextAreaElement>;
  textareaContainerAttr?: React.HTMLAttributes<HTMLDivElement>;
  validationMessage?: string;
  severity?: 'info' | 'warning' | 'error';
};

const TextAreaContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: 4px;
`;

const Textarea = styled.textarea<{ $placeholderColor?: string }>`
  display: inline-block;
  outline: none;
  border: none;
  text-decoration: none;
  background-color: transparent;
  border-radius: 24px;
  height: 164px;
  user-select: none;
  padding: 12px;
  font-family: Inter;
  font-weight: 300;
  resize: none;
  ${({ $placeholderColor }) =>
    $placeholderColor &&
    css`
      ::placeholder {
        color: ${$placeholderColor};
      }
    `};
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

export const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  ({ ...props }: BaseTextAreaProps, inputRef) => {
    return (
      <TextAreaContainer {...props?.textareaContainerAttr}>
        <Textarea
          $placeholderColor={props.placeholderColor}
          placeholder={props.placeholder}
          ref={inputRef}
          onChange={props.onInputChange}
          value={props?.inputValue}
          disabled={props.disabled}
          {...props.textareaAttr}
        />
        {props.validationMessage && (
          <ValidationText $severity={props.severity}>{props.validationMessage}</ValidationText>
        )}
      </TextAreaContainer>
    );
  },
);
