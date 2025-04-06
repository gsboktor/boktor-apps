import { showMenuAtom } from '@boktor-apps/boktor-portfolio/data-access/store';
import { useOutOfBounds } from '@boktor-apps/shared/ui/hooks';

import { useSetAtom } from 'jotai';
import { motion } from 'motion/react';
import { useRef } from 'react';
import styled from 'styled-components';
import { MenuItem } from './components';

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
  z-index: ${Number.MAX_SAFE_INTEGER};
  background-color: #000000ee;
  will-change: 'mask-image, backdrop-filter, transform';
  mask-image: var(--menu-mask-to-right);
  backdrop-filter: blur(16px);
  transform: translateZ(0);
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
      <MenuItemsContainer id="items_container" ref={menuRef}>
        <MenuItem label="home" animationDelay={0.15} />
        <MenuItem label="contact me" animationDelay={0.25} />
        <MenuItem label="projects" animationDelay={0.35} />
        <MenuItem label="resume" animationDelay={0.45} />
      </MenuItemsContainer>
    </MenuOverlayBlurContainer>
  );
};
