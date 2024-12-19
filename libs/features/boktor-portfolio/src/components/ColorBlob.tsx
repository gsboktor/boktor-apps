import styled from 'styled-components';

const ColorBlobContainer = styled.div<{
  $color: string;
  $top?: number;
  $left?: number;
  $right?: number;
  $bottom?: number;
  $zIndex?: number;
}>`
  background-color: ${({ $color }) => $color};
  position: absolute;
  top: ${({ $top }) => ($top ? `${$top}px` : null)};
  left: ${({ $left }) => ($left ? `${$left}px` : null)};
  right: ${({ $right }) => ($right ? `${$right}px` : null)};
  bottom: ${({ $bottom }) => ($bottom ? `${$bottom}px` : null)};
  width: 300px;
  height: 300px;
  border-radius: 50%;
  z-index: ${({ $zIndex }) => ($zIndex ? $zIndex : null)};
`;

export type ColorBlobProps = {
  color: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  zIndex?: number;
};

export const ColorBlob: React.FC<ColorBlobProps> = ({ color, top, left, right, bottom, zIndex }) => {
  return <ColorBlobContainer $color={color} $top={top} $left={left} $right={right} $bottom={bottom} $zIndex={zIndex} />;
};
