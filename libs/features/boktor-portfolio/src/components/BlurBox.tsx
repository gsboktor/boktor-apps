import styled from 'styled-components';

const BlurBoxContainer = styled.div<{ $backgroundImg?: string }>`
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(201, 201, 201, 0.5);
  ${({ $backgroundImg }) =>
    $backgroundImg && `background-image: url(${$backgroundImg}); background-size: cover; background-position: center;`}
  backdrop-filter: blur(45px);
  border-radius: 25px;
`;

export type BlurBoxProps = {
  children?: React.ReactNode;
  backgroundImg?: string;
};

export const BlurBox = ({ children, backgroundImg }: BlurBoxProps) => {
  return <BlurBoxContainer $backgroundImg={backgroundImg}>{children}</BlurBoxContainer>;
};
