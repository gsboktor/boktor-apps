import { validateBoardForm } from '@boktor-apps/nomopomo/data-access/store';
import { BoardComponent } from '@boktor-apps/shared/ui/assets/svgs';
import { PrimaryButton } from '@boktor-apps/shared/ui/buttons';
import { useSetAtom } from 'jotai';
import styled from 'styled-components';
import { BoardModalColorPicker } from './BoardModalColorPicker';
import { BoardModalInput } from './BoardModalInput';

const StyledPrimaryButton = styled.div`
  display: flex;
  width: 80%;
  height: 48px;
`;

export const BoardModalBody = () => {
  const validateAndCreateBoard = useSetAtom(validateBoardForm);

  return (
    <>
      <p style={{ margin: 0, fontSize: 24, fontWeight: 300, padding: 8, color: '#3a3a3a', letterSpacing: 0 }}>
        <span role="img" aria-label="Clipboard emoji">
          📋
        </span>{' '}
        • <b style={{ letterSpacing: -1 }}>Create a New Board</b>
      </p>
      <BoardModalInput />
      <p style={{ margin: 0, fontSize: 24, fontWeight: 300, padding: 8, color: '#3a3a3a', letterSpacing: 0 }}>
        <span role="img" aria-label="Paint board emoji">
          🎨
        </span>{' '}
        • <b style={{ letterSpacing: -1 }}>Pick a Board Color</b>
      </p>
      <BoardModalColorPicker />
      <StyledPrimaryButton>
        <PrimaryButton
          affixLeft={<BoardComponent width={20} height={20} />}
          label={`Add board`}
          onClick={() => validateAndCreateBoard(undefined)}
        />
      </StyledPrimaryButton>
    </>
  );
};
