import styled from 'styled-components';

const EmojiTagContainer = styled.div<{ $theme: string }>`
  width: 36px;
  user-select: none;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ $theme }) => $theme + `88`};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 8px;
  left: 8px;
`;
export const EmojiTag = ({ theme, emoji }: { theme: string; emoji: string }) => {
  return (
    <EmojiTagContainer $theme={theme}>
      <p style={{ margin: 0, fontSize: 22 }}>{emoji}</p>
    </EmojiTagContainer>
  );
};
