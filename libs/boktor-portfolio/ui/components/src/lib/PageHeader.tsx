import { forwardRef } from 'react';
import { useMedia } from 'react-use';
import { AnimatedBlurBox } from './AnimatedBlurBox';
import { RowBlock } from './Blocks';
import { Bullet } from './Bullet';
import { Size, StyledText } from './StyledText';

export type PageHeaderProps = {
  header: string;
  subHeader: string;
  cta?: string;
  onClick?: React.HTMLAttributes<HTMLButtonElement>['onClick'];
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>;
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(({ ...props }, ref) => {
  const isMobile = useMedia('(width < 768px)');

  return (
    <AnimatedBlurBox
      ref={ref}
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        left: 64,
        top: isMobile ? 88 : 48,
        width: 'fit-content',
        ...props.style,
      }}
    >
      <div style={{ display: 'flex', flex: 1, width: 8, backgroundColor: 'white', borderRadius: 2 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <RowBlock style={{ gap: 16, alignItems: 'center' }}>
          <StyledText size={Size.LG}>{props.header}</StyledText>
          {props.cta && <Bullet cta={props.cta} handleClick={(e) => props.onClick?.(e)} />}
        </RowBlock>
        <StyledText color="#008578" size={Size.SM}>
          {props.subHeader}
        </StyledText>
      </div>
    </AnimatedBlurBox>
  );
});
