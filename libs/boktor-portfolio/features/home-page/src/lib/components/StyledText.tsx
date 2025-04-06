import styled from 'styled-components';

export enum Size {
  SM = 'sm',
  REG = 'reg',
  MD = 'md',
  LG = 'lg',
}

export enum Weight {
  None = '0',
  Regular = '400',
  Heavy = '700',
}

const StyledTextBlock = styled.p<{ s: Size; w?: Weight; c?: string; u?: boolean }>`
  display: inline;
  margin: 0px;
  color: ${({ c }) => c && c};
  height: fit-content;
  text-decoration: ${({ u }) => u && 'underline'};
  text-underline-offset: 4;
  flex-wrap: wrap;
  text-overflow: ellipsis;
  font-family: 'Merriweather';
  font-weight: ${({ w }) => w && w};
  font-size: ${({ s }) => {
    switch (s) {
      case Size.SM: {
        return `14px`;
      }
      case Size.REG: {
        return `24px`;
      }
      case Size.MD: {
        return `32px`;
      }
      case Size.LG: {
        return `58px`;
      }
    }
  }};
`;

export const StyledText = ({
  children,
  size = Size.MD,
  weight = Weight.Heavy,
  color = 'white',
  underline = false,
  ...rest
}: {
  children: React.ReactNode;
  size?: Size;
  weight?: Weight;
  color?: string;
  underline?: boolean;
} & React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <StyledTextBlock s={size} w={weight} c={color} u={underline} {...rest}>
      {children}
    </StyledTextBlock>
  );
};
