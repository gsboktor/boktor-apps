// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { showMenuAtom } from '@boktor-apps/boktor-portfolio/data-access/store';
import { HomePage } from '@boktor-apps/boktor-portfolio/features/home-page';
import { MenuOverlay } from '@boktor-apps/boktor-portfolio/features/menu-overlay';
import { Noise } from '@boktor-apps/shared/ui/assets';
import { useAtom, useAtomValue } from 'jotai';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import styled from 'styled-components';

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

  background-size: 200px 200px; /* Adjust size as needed */
  background-blend-mode: soft-light;
  opacity: 0.1; /* Adjust for subtlety */
`;

export function App() {
  const showMenu = useAtomValue(showMenuAtom);

  const [, setShowOverlay] = useAtom(showMenuAtom);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if CMD (Mac) or CTRL (Windows) is pressed along with 'g'
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'g') {
        event.preventDefault(); // Prevent default browser behavior
        setShowOverlay((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [setShowOverlay]);
  return (
    <>
      <RootContainer noise={Noise.default}></RootContainer>
      <HomePage />
      <AnimatePresence>{showMenu && <MenuOverlay />}</AnimatePresence>
    </>
  );
}

export default App;
