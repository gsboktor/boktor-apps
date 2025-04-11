// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { showMenuAtom } from '@boktor-apps/boktor-portfolio/data-access/store';
import { BottomBar, TopBar } from '@boktor-apps/boktor-portfolio/features/home-page';
import { MenuOverlay } from '@boktor-apps/boktor-portfolio/features/menu-overlay';

import { CmdCTA } from '@boktor-apps/boktor-portfolio/features/home-page';
import { ToastList } from '@boktor-apps/boktor-portfolio/ui/components';
import { Noise } from '@boktor-apps/shared/ui/assets';
import { useAtom, useAtomValue } from 'jotai';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useMedia } from 'react-use';
import styled from 'styled-components';
import { Router } from '../router/router';

const AppContainer = styled.div`
  position: relative;
  display: flex;
  max-width: 1920px;
  width: 100%;
  left: 0px;
  right: 0px;
  min-height: 98vh;
  max-height: 98vh;
  overflow: scroll;
  margin: auto;
`;

const RootContainer = styled.div<{ noise: string }>`
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  background-color: #1d1d1d;
  background-image: url('${(props) => props.noise}');
  background-size: 150px 150px; /* Adjust size as needed */
  background-blend-mode: soft-light;
  opacity: 0.25; /* Adjust for subtlety */
`;

export function App() {
  const showMenu = useAtomValue(showMenuAtom);
  const [, setShowOverlay] = useAtom(showMenuAtom);

  const isMobile = useMedia('(width < 768px)');

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'g') {
        event.preventDefault();
        setShowOverlay((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [setShowOverlay]);
  return (
    <>
      <RootContainer noise={Noise.default} />
      <TopBar />
      <BottomBar />
      <AppContainer id="app-container">
        <Router />
        <ToastList />
      </AppContainer>
      {!isMobile && <CmdCTA />}
      <AnimatePresence>{showMenu && <MenuOverlay />}</AnimatePresence>
    </>
  );
}

export default App;
