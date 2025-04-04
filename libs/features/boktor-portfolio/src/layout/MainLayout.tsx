import styled from 'styled-components';
import { default as bg } from '../assets/me.png';
import { BlurBox } from '../components';
import { ColorBlob } from '../components/ColorBlob';
import { ContentRow } from '../components/ContentRow';

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding-top: 48px;
`;

const LeftContent = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ImageBoxContainer = styled.div`
  height: 480px;
  width: 100%;
`;

const HeaderBox = styled.div`
  height: 375px;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 100;
  border-radius: 25px;
`;

const SubheaderLeftBox = styled.div`
  height: 232px;
  width: 100%;
  flex: 3;
`;

const SubheaderRightBox = styled.div`
  height: 232px;
  width: 100%;
  flex: 2;
  position: relative;
  border-radius: 25px;
  overflow: hidden;
  z-index: 100;
`;

const IntroductionBoxHeader = styled.h1`
  display: inline;
  color: #2a2a2ae1;
  text-overflow: 'ellipsis';
  font-family: 'Merriweather';
  font-weight: 300;
`;

const IntroductionContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  z-index: 1000;
`;

export const MainLayout = () => {
  return (
    <MainContentContainer>
      <LeftContent>
        <ContentRow>
          <HeaderBox>
            <ColorBlob color="#8f7b6a" right={-64} bottom={80} zIndex={0} />
            <ColorBlob color="#b19b8b" right={-64} bottom={-120} zIndex={-1} />
            <BlurBox>
              <IntroductionContent>
                <IntroductionBoxHeader>
                  <span role="img" aria-label="wave" tabIndex={0}>
                    👋
                  </span>{' '}
                  Hi, I'm George
                </IntroductionBoxHeader>
              </IntroductionContent>
            </BlurBox>
          </HeaderBox>
        </ContentRow>
        <ContentRow>
          <SubheaderLeftBox>
            <BlurBox />
          </SubheaderLeftBox>
          <SubheaderRightBox>
            <ColorBlob color="#090c0b" right={-180} bottom={-120} zIndex={-1} />
            <ColorBlob color="#434d4c" right={-18} bottom={60} zIndex={0} />
            <BlurBox />
          </SubheaderRightBox>
        </ContentRow>
      </LeftContent>
      <RightContent>
        <ImageBoxContainer>
          <BlurBox backgroundImg={bg} />
        </ImageBoxContainer>
      </RightContent>
    </MainContentContainer>
  );
};
