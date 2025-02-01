import { boardFormErrors, setBoardFormValues } from '@boktor-apps/nomopomo/data-access/store';
import { BaseFormField } from '@boktor-apps/shared/ui/fields';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const ModalInputContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BoardModalInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [val, setVal] = useState<string>('');
  const setBoardForm = useSetAtom(setBoardFormValues);
  const validationError = useAtomValue(boardFormErrors);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    setBoardForm({ [e.target.name]: e.target.value });
  }, []);

  const textLimit = 20;
  return (
    <ModalInputContainer>
      <BaseFormField
        validationMessage={validationError?.boardName?.message}
        severity={!validationError?.boardName?.valid ? 'error' : undefined}
        inputAttr={{
          style: { backgroundColor: '#ffffff45', width: `100%`, boxSizing: 'border-box' },
          name: 'boardName',
        }}
        ref={inputRef}
        inputValue={val}
        onInputChange={handleChange}
        placeholder="New board name"
        limit={textLimit}
        placeholderColor="#2b2b2be6"
      />
      <p style={{ alignSelf: 'end', paddingRight: '8px', margin: 0, fontSize: 14 }}>
        {val?.length} / {textLimit}
      </p>
    </ModalInputContainer>
  );
};
