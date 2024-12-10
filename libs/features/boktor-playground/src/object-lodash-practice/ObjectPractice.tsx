import { useState } from 'react';
import styled from 'styled-components';

const StyledTextArae = styled.textarea`
  border: 1px solid black;
  outline: none;
  border-radius: 16px;
  &::-webkit-resizer {
    display: none;
    cursor: pointer;
  }
  padding: 16px;
`;

export const ObjectPractice = () => {
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <StyledTextArae ref={(node) => node?.focus()} onChange={(e) => setTextareaValue(e.currentTarget.value)} />
      <button type="button" onClick={() => setShow(!show)}>
        Test
      </button>
      {show && textareaValue && <span style={{ display: 'block' }}>{JSON.stringify(textareaValue).trim()}</span>}
      <StyledTextArae value={textareaValue}></StyledTextArae>
    </>
  );
};
