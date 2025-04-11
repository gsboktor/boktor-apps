import {
  AnimatedBlurBox,
  AWSLogo,
  DndLogo,
  FramerLogo,
  HoverCard,
  JotaiLogo,
  PageHeader,
  PGLogo,
  ReactLogo,
  RowBlock,
  Styled,
  StyledHoverButton,
  StyledText,
  SupabaseLogo,
  TanstackLogo,
  TSLogo,
} from '@boktor-apps/boktor-portfolio/ui/components';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatedLogos, GeorgeBoktorDetails, NomopomoDetails, ProjectDetailsContainer, RuumeDetails } from './components';

const ProjectsPageContainer = styled.div`
  position: absolute;
  top: 224px;
  left: 168px;
  right: 168px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  @media screen and (width < 1168px) {
    left: 0px;
    right: 0px;
    margin: auto;
    flex-direction: column;
  }
`;

const LeftContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: fit-content;
  height: 100%;
  min-width: 375px;
`;

const HoverCardWithLogos = styled(motion.div)`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 8px;
`;

const LogosContainer = styled(motion.div)`
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 38px;
  padding-top: 4px;
  padding-bottom: 4px;
  gap: 4px;
`;

const RUUME_LOGOS = [
  <ReactLogo width={32} height={32} />,
  <TSLogo width={32} height={32} />,
  <div
    style={{
      backgroundColor: 'white',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    }}
  >
    <JotaiLogo width={26} height={26} />
  </div>,
  <TanstackLogo width={32} height={32} style={{ backgroundColor: 'transparent', borderRadius: '50%' }} />,
  <SupabaseLogo width={32} height={32} style={{ backgroundColor: 'transparent', borderRadius: '50%' }} />,
  <div
    style={{
      backgroundColor: 'white',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    }}
  >
    <Styled width={28} height={28} />
  </div>,
  <PGLogo width={32} height={32} style={{ backgroundColor: 'black', borderRadius: '50%' }} />,
];

const NOMOPOMO_LOGOS = [
  <ReactLogo width={32} height={32} />,
  <TSLogo width={32} height={32} />,
  <AWSLogo width={32} height={32} />,
  <div
    style={{
      backgroundColor: 'white',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    }}
  >
    <JotaiLogo width={26} height={26} />
  </div>,
  <div
    style={{
      backgroundColor: 'white',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    }}
  >
    <Styled width={28} height={28} />
  </div>,
  <div
    style={{
      backgroundColor: 'white',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    }}
  >
    <FramerLogo width={24} height={24} />
  </div>,
  <DndLogo width={42} height={16} />,
];

const BOKTOR_LOGOS = [
  <ReactLogo width={32} height={32} />,
  <TSLogo width={32} height={32} />,
  <AWSLogo width={32} height={32} />,
  <div
    style={{
      backgroundColor: 'white',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    }}
  >
    <JotaiLogo width={26} height={26} />
  </div>,
  <div
    style={{
      backgroundColor: 'white',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    }}
  >
    <Styled width={28} height={28} />
  </div>,
  <div
    style={{
      backgroundColor: 'white',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    }}
  >
    <FramerLogo width={24} height={24} />
  </div>,
];

export const ProjectsPage = () => {
  const [DetailsComponent, setDetailsComponent] = useState<React.ReactNode>();

  return (
    <>
      <PageHeader header="my projects" subHeader="*as of april 2025" cta="Hover for details" />
      <ProjectsPageContainer>
        <LeftContentContainer>
          <HoverCardWithLogos>
            <HoverCard
              onHoverStart={() => setDetailsComponent(RuumeDetails)}
              onHoverEnd={() => setDetailsComponent(undefined)}
              labelHeader="ruume"
              labelSubheader="from oct.2024 — jan.2025 • on hiatus"
              iconLabel="RM"
            />
            <LogosContainer>
              <AnimatedLogos logosList={RUUME_LOGOS} />
            </LogosContainer>
            <AnimatedBlurBox style={{ display: 'flex', width: '100%', paddingLeft: 38, paddingTop: 4, paddingBottom: 4 }}>
              <RowBlock style={{ alignItems: 'start', width: '100%', justifyContent: 'end', paddingRight: 38 }}>
                <StyledHoverButton fontSize={16} href="https://github.com/gsboktor/ruume-app" label="github" offset={30} />
              </RowBlock>
            </AnimatedBlurBox>
          </HoverCardWithLogos>
          <HoverCardWithLogos>
            <HoverCard
              onHoverStart={() => setDetailsComponent(GeorgeBoktorDetails)}
              onHoverEnd={() => setDetailsComponent(undefined)}
              labelHeader="georgeboktor.me"
              labelSubheader="from mar.2025 — apr.2025 • complete"
              iconLabel="GB"
            />
            <LogosContainer>
              <AnimatedLogos logosList={BOKTOR_LOGOS} />
            </LogosContainer>
            <AnimatedBlurBox style={{ display: 'flex', width: '100%', paddingLeft: 38, paddingTop: 4, paddingBottom: 4 }}>
              <RowBlock style={{ alignItems: 'center', width: '100%', justifyContent: 'end', paddingRight: 38 }}>
                <StyledHoverButton
                  fontSize={16}
                  href="https://github.com/gsboktor/boktor-apps/tree/main/packages/boktor-portfolio"
                  label="github"
                  offset={30}
                />
                <StyledText style={{ fontSize: 20 }}>•</StyledText>
                <StyledHoverButton fontSize={16} href={`${process.env.NX_PUBLIC_WEB_BASE_URL}`} label="live site" offset={30} />
              </RowBlock>
            </AnimatedBlurBox>
          </HoverCardWithLogos>
          <HoverCardWithLogos>
            <HoverCard
              onHoverStart={() => setDetailsComponent(NomopomoDetails)}
              onHoverEnd={() => setDetailsComponent(undefined)}
              labelHeader="nomopomo.io"
              labelSubheader="from oct.2024 — Present • in progress"
              iconLabel="NMP"
            />
            <LogosContainer>
              <AnimatedLogos logosList={NOMOPOMO_LOGOS} />
            </LogosContainer>
            <AnimatedBlurBox style={{ display: 'flex', width: '100%', paddingLeft: 38, paddingTop: 4, paddingBottom: 4 }}>
              <RowBlock style={{ alignItems: 'start', width: '100%', justifyContent: 'end', paddingRight: 38 }}>
                <StyledHoverButton
                  fontSize={16}
                  href="https://github.com/gsboktor/boktor-apps/tree/main/packages/nomopomo"
                  label="github"
                  offset={30}
                />
              </RowBlock>
            </AnimatedBlurBox>
          </HoverCardWithLogos>
        </LeftContentContainer>
        <AnimatePresence>{DetailsComponent && <ProjectDetailsContainer>{DetailsComponent}</ProjectDetailsContainer>}</AnimatePresence>
      </ProjectsPageContainer>
    </>
  );
};
