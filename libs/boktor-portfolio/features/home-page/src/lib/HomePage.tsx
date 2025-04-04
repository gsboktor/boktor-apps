import { showMenuAtom } from '@boktor-apps/boktor-portfolio/data-access/store';
import { useSetAtom } from 'jotai';
import styled from 'styled-components';
import { Bullet } from './components/Bullet';
import { CmdCTA } from './components/CmdCTA';
import { HighlightedText } from './components/HighlightedText';
import { HomePageContentBlock } from './components/HomePageContentBlock';
import { Size, StyledText, Weight } from './components/StyledText';

const InnerBlock = styled.div`
  display: inherit;
  flex-direction: inherit;
  gap: 30px;
`;

const RowBlock = styled.div`
  position: relative;
  display: inherit;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const HomePage = () => {
  const setShowMenu = useSetAtom(showMenuAtom);
  return (
    <>
      <HomePageContentBlock>
        <InnerBlock style={{ gap: 8 }}>
          <RowBlock style={{ gap: 20 }} onClick={() => setShowMenu(true)}>
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
            i’m a <HighlightedText>full stack engineer</HighlightedText>, crafting applications that solve problems, engage users, and
            create clarity.
          </StyledText>
          <StyledText size={Size.SM} weight={Weight.None}>
            previously @ <HighlightedText>Asurion</HighlightedText> building enterprise applications for AT&T, Verzion, and Google.{' '}
          </StyledText>
          <StyledText size={Size.SM} weight={Weight.None}>
            currently @ <HighlightedText>HCA</HighlightedText> building next-generation React Native applications for our healthcare
            workforce.{' '}
          </StyledText>
        </InnerBlock>
        <RowBlock style={{ height: 42 }}>
          <StyledText size={Size.SM} weight={Weight.None}>
            let's talk
          </StyledText>
          <Bullet cta="Contact me" />
        </RowBlock>
      </HomePageContentBlock>
      <CmdCTA />
    </>
  );
};
