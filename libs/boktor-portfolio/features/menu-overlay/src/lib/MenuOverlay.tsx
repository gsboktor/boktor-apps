import { showMenuAtom } from '@boktor-apps/boktor-portfolio/data-access/store';
import { Size, StyledText } from '@boktor-apps/boktor-portfolio/features/home-page';
import { useOutOfBounds } from '@boktor-apps/shared/ui/hooks';

import { useSetAtom } from 'jotai';
import { motion } from 'motion/react';
import { useRef } from 'react';
import styled from 'styled-components';

const MenuOverlayBlurContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  z-index: 10000;
  background-color: #000000;
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.95) 20%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.3) 80%,
    transparent 100%
  );
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 0.95) 20%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.3) 80%, transparent 100%);
`;

const MenuItemsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 64px;
  left: 48px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  height: 80%;
`;
export const MenuOverlay = () => {
  const setShowOverlay = useSetAtom(showMenuAtom);
  const menuRef = useRef<HTMLDivElement>(null);
  useOutOfBounds(menuRef, () => setShowOverlay(false));

  return (
    <MenuOverlayBlurContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <MenuItemsContainer id="items_container" ref={menuRef} onClick={() => setShowOverlay(false)}>
        <motion.div initial={{ x: -400 }} animate={{ x: 0 }} transition={{ delay: 0.15, type: 'spring' }}>
          <StyledText size={Size.LG}>home</StyledText>
        </motion.div>
        <motion.div initial={{ x: -400 }} animate={{ x: 0 }} transition={{ delay: 0.25, type: 'spring' }}>
          <StyledText size={Size.LG}>contact me</StyledText>
        </motion.div>

        <motion.div initial={{ x: -400 }} animate={{ x: 0 }} transition={{ delay: 0.35, type: 'spring' }}>
          <StyledText size={Size.LG}>projects</StyledText>
        </motion.div>

        <motion.div initial={{ x: -400 }} animate={{ x: 0 }} transition={{ delay: 0.45, type: 'spring' }}>
          <StyledText size={Size.LG}>resume</StyledText>
        </motion.div>
      </MenuItemsContainer>
    </MenuOverlayBlurContainer>
  );
};
