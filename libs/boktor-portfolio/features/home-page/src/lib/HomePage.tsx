import { useNav } from '@boktor-apps/boktor-portfolio/data-access/hooks';
import {
  AnimatedBlurBox,
  AsurionLogo,
  AWSLogo,
  Ball,
  Bullet,
  CSSMLogo,
  HCALogo,
  HighlightedText,
  InnerBlock,
  PGLogo,
  ReactLogo,
  RowBlock,
  Size,
  StyledText,
  TSLogo,
  Weight,
} from '@boktor-apps/boktor-portfolio/ui/components';

import { Detail, PersonalDetailsContext } from '@boktor-apps/boktor-portfolio/ui/providers';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useRef, useState } from 'react';
import { DetailsBlock } from './components/DetailsContentBlock';
import { HomePageContentBlock } from './components/HomePageContentBlock';

export const HomePage = () => {
  const { detailToShow, onHoverDetail, onResetDetail } = useContext(PersonalDetailsContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>();

  const { navigate } = useNav();

  return (
    <>
      <HomePageContentBlock
        ref={containerRef}
        initial={{ filter: 'blur(16px', opacity: 0 }}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        exit={{ filter: 'blur(16px)', opacity: 0 }}
        onAnimationComplete={() => setHeight(containerRef.current?.getBoundingClientRect().height)}
      >
        <InnerBlock style={{ gap: 8 }}>
          <RowBlock style={{ gap: 20 }}>
            <StyledText size={Size.LG}>george boktor</StyledText>
            <Bullet cta="Get to know me" />
          </RowBlock>
          <StyledText size={Size.SM}>/ ˈ b ɒ k t ɔ r / in International Phonetic Alphabet (IPA)</StyledText>
          <StyledText size={Size.SM} color="#008578">
            *( bAWK - to/h/r )
          </StyledText>
        </InnerBlock>
        <InnerBlock style={{ maxWidth: 500 }}>
          <StyledText size={Size.SM} weight={Weight.None}>
            i’m a{' '}
            <HighlightedText onMouseOver={() => onHoverDetail(Detail.FS)} onMouseLeave={() => onResetDetail()}>
              full stack engineer
            </HighlightedText>
            , crafting applications that solve problems, engage users, and create clarity.
          </StyledText>
          <StyledText size={Size.SM} weight={Weight.None}>
            previously @{' '}
            <HighlightedText onMouseOver={() => onHoverDetail(Detail.AS)} onMouseLeave={() => onResetDetail()}>
              Asurion
            </HighlightedText>{' '}
            building enterprise applications for AT&T, Verzion, and Google.{' '}
          </StyledText>
          <StyledText size={Size.SM} weight={Weight.None}>
            currently @{' '}
            <HighlightedText onMouseOver={() => onHoverDetail(Detail.HCA)} onMouseLeave={() => onResetDetail()}>
              HCA
            </HighlightedText>{' '}
            building next-generation React Native applications for our healthcare workforce.{' '}
          </StyledText>
        </InnerBlock>
        <RowBlock style={{ height: 42 }}>
          <StyledText size={Size.SM} weight={Weight.None} style={{ marginRight: 32 }}>
            let's talk <b style={{ position: 'absolute', bottom: 9, left: 65, fontSize: 25, userSelect: 'none' }}>⟶</b>
          </StyledText>
          <Bullet cta="Contact me" handleClick={() => navigate('/contact')} />
        </RowBlock>
      </HomePageContentBlock>
      <AnimatePresence>
        {detailToShow && (
          <DetailsBlock offset={height} exit={{ filter: 'blur(16px)' }}>
            {detailToShow && (
              <motion.div
                initial={{
                  height: '100%',
                  position: 'absolute',
                  width: 8,
                  backgroundColor: 'white',
                  left: -24,
                  y: -100,
                  filter: 'blur(16px)',
                  opacity: 0,
                  borderRadius: 2,
                }}
                animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
                exit={{ y: -100, filter: 'blur(16px)', opacity: 0 }}
              />
            )}
            {detailToShow && detailToShow === Detail.FS && (
              <AnimatedBlurBox>
                <Ball
                  layoutId="b1"
                  initial={{ borderRadius: '50%', right: -24, top: 12 }}
                  animate={{ right: 16, transition: { duration: 0.5, type: 'spring' } }}
                  exit={{ right: -24 }}
                />
                <InnerBlock style={{ flexDirection: 'row', gap: 16 }}>
                  <InnerBlock style={{ flexDirection: 'column', gap: 8, height: '100%', alignSelf: 'start' }}>
                    <ReactLogo width={48} height={48} />
                    <TSLogo width={48} height={48} />
                    <AWSLogo width={48} height={48} />
                    <CSSMLogo width={48} height={48} style={{ backgroundColor: 'white', borderRadius: '50%' }} />
                    <PGLogo width={48} height={48} style={{ backgroundColor: 'black', borderRadius: '50%' }} />
                  </InnerBlock>
                  <InnerBlock style={{ flexDirection: 'column', maxWidth: 400, gap: 24 }}>
                    <InnerBlock style={{ gap: 8 }}>
                      <StyledText>Full Stack</StyledText>
                      <StyledText size={Size.SM} style={{ color: '#008578' }}>
                        web apps / cross-platform mobile / frontend leaning
                      </StyledText>
                    </InnerBlock>
                    <StyledText size={Size.SM}>
                      specialized in React / React Native / Typescript. infrastructure with AWS, GCP, and Heroku.
                    </StyledText>
                    <StyledText size={Size.SM}>styling with CSS modules & styled components.</StyledText>
                    <StyledText size={Size.SM}>persistence w/ dynamoDB & postgres, on RDS and other managed providers.</StyledText>
                    <StyledText size={Size.SM}>monitoring, analytics and service logging w/ Bugsnag, Dynatrace & Mixpanel</StyledText>
                  </InnerBlock>
                </InnerBlock>
              </AnimatedBlurBox>
            )}
            {detailToShow && detailToShow === Detail.AS && (
              <AnimatedBlurBox>
                <Ball
                  layoutId="b1"
                  initial={{ borderRadius: '50%', right: -24, top: 12 }}
                  animate={{ right: 16, transition: { duration: 0.5, type: 'spring' } }}
                  exit={{ right: -24 }}
                />
                <InnerBlock style={{ flexDirection: 'row', gap: 16 }}>
                  <InnerBlock style={{ flexDirection: 'column', gap: 8, height: '100%', alignSelf: 'start' }}>
                    <AsurionLogo width={48} height={48} style={{ borderRadius: '50%', backgroundColor: 'white' }} />
                  </InnerBlock>
                  <InnerBlock style={{ flexDirection: 'column', maxWidth: 400, gap: 24 }}>
                    <InnerBlock style={{ gap: 8 }}>
                      <StyledText>Asurion</StyledText>
                      <StyledText size={Size.SM} style={{ color: '#008578' }}>
                        aug 2021 - dec 2024
                      </StyledText>
                    </InnerBlock>
                    <StyledText size={Size.SM}>
                      building and iterating on microfrontends applications for clients (at&t, verizon, google)
                    </StyledText>
                    <StyledText size={Size.SM}>
                      managing multi-app deployments w/ github actions, provisioning infra with CDK & serverless
                    </StyledText>
                    <StyledText size={Size.SM}>
                      contributing to internal component libraries, auditing for accessibility, managing stakeholder requirements
                    </StyledText>
                  </InnerBlock>
                </InnerBlock>
              </AnimatedBlurBox>
            )}
            {detailToShow && detailToShow === Detail.HCA && (
              <AnimatedBlurBox>
                <Ball
                  layoutId="b1"
                  initial={{ borderRadius: '50%', right: -24, top: 12 }}
                  animate={{ right: 16, transition: { duration: 0.5, type: 'spring' } }}
                  exit={{ right: -24 }}
                />
                <InnerBlock style={{ flexDirection: 'row', gap: 16 }}>
                  <InnerBlock style={{ flexDirection: 'column', gap: 8, height: '100%', alignSelf: 'start' }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: `50%`,
                        backgroundColor: 'white',
                      }}
                    >
                      <HCALogo width={40} height={40} />
                    </div>
                  </InnerBlock>
                  <InnerBlock style={{ flexDirection: 'column', maxWidth: 400, gap: 24 }}>
                    <InnerBlock style={{ gap: 8 }}>
                      <StyledText>HCA</StyledText>
                      <StyledText size={Size.SM} style={{ color: '#008578' }}>
                        april 2025 - present
                      </StyledText>
                    </InnerBlock>
                    <StyledText size={Size.SM}>building and maintaining HCA's timpani manager React Native application</StyledText>
                    <StyledText size={Size.SM}>faciliating strong, technical culture. mentoring subordinate engineers</StyledText>
                  </InnerBlock>
                </InnerBlock>
              </AnimatedBlurBox>
            )}
          </DetailsBlock>
        )}
      </AnimatePresence>
    </>
  );
};
