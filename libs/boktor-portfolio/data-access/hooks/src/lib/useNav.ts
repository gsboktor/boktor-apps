import { showMenuAtom } from '@boktor-apps/boktor-portfolio/data-access/store';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

export const useNav = () => {
  const nav = useNavigate();
  const setShowMenu = useSetAtom(showMenuAtom);

  const navigate = useCallback(
    (path: string) => {
      setShowMenu(false);

      setTimeout(() => {
        nav(path);
      }, 175);
    },
    [nav, setShowMenu],
  );

  return { navigate };
};
