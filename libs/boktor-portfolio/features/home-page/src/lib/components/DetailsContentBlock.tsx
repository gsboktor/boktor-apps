import { motion } from 'motion/react';
import styled from 'styled-components';

const DetailsContentBlock = styled(motion.div)<{ $offset?: number }>`
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

  @media screen and (height < 900px) and (width < 1364px) {
    bottom: 0px;
    top: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    background-color: #000000c5;
    backdrop-filter: blur(16px);
    border-radius: 12px;
    padding: 24px;
    z-index: ${Number.MAX_SAFE_INTEGER + 1};
  }
`;

export const DetailsBlock = motion(({ children, offset, ...rest }: { children: React.ReactNode; offset?: number }) => {
  return (
    <DetailsContentBlock $offset={offset} {...rest}>
      {children}
    </DetailsContentBlock>
  );
});
