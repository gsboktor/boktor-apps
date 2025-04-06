import styled from 'styled-components';

const DetailsContentBlock = styled.div<{ $offset?: number }>`
  position: absolute;
  padding: 16px 0px;
  top: 168px;
  right: 168px;
  max-width: 625px;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  text-overflow: ellipsis;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 36px;

  @media screen and (width < 1364px) {
    top: ${(props) => (props.$offset ? `${props.$offset + 100}px` : '575px')};
    left: 192px;
    right: unset;
    margin: auto;
  }

  @media screen and (width < 768px) {
    top: ${(props) => (props.$offset ? `${props.$offset + 100}px` : '575px')};
    left: 0px;
    right: 0px;
    margin: auto;
  }
`;

export const DetailsBlock = ({ children, offset }: { children: React.ReactNode; offset?: number }) => {
  return <DetailsContentBlock $offset={offset}>{children}</DetailsContentBlock>;
};
