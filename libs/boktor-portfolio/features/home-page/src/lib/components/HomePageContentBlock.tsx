import { motion } from 'motion/react';
import { forwardRef } from 'react';
import styled from 'styled-components';

const HomePageContentContainer = styled.div`
  position: absolute;
  top: 168px;
  left: 168px;
  max-width: 625px;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  text-overflow: ellipsis;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 58px;

  @media screen and (width < 1364px) {
    top: 72px;
  }

  @media screen and (width < 768px) {
    left: 0px;
    right: 0px;
    margin: auto;
  }
`;

export const HomePageContentBlock = motion(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    return (
      <HomePageContentContainer ref={ref} {...props}>
        {props.children}
      </HomePageContentContainer>
    );
  }),
);
