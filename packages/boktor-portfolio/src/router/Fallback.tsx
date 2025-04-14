import { useNav } from '@boktor-apps/boktor-portfolio/data-access/hooks';
import { Size, StyledText } from '@boktor-apps/boktor-portfolio/ui/components';
import styled from 'styled-components';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 96px;
  gap: 48px;
`;

const Pardner = styled.img`
  height: 400px;
  width: 300px;
`;

export const Fallback = () => {
  const { navigate } = useNav();

  return (
    <PageContainer>
      <StyledText size={Size.LG}>
        slow down there pardner{' '}
        <span role="img" aria-label="water-gun">
          🔫
        </span>
      </StyledText>
      <StyledText id="test" size={Size.MD} style={{ color: ' #aaaaaa' }}>
        you've taken a WRONG turn
      </StyledText>
      <div style={{ borderRadius: 16, overflow: 'hidden', width: 'fit-content', height: 'fit-content' }}>
        <Pardner src={'/assets/images/pardner.png'} loading="eager" />
      </div>

      <StyledText
        size={Size.REG}
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 12 }}
      >
        click here to giddy on home
      </StyledText>
    </PageContainer>
  );
};
