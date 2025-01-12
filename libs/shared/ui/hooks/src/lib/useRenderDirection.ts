import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';

export const useRenderDirection = (objRef: RefObject<HTMLElement>) => {
  const direction = useRef<'up' | 'down'>();

  useMemo(() => {
    if (objRef.current?.getBoundingClientRect) {
      objRef.current?.getBoundingClientRect().y > window.innerHeight / 2
        ? (direction.current = 'up')
        : (direction.current = 'down');
    }
  }, [objRef.current]);

  const handleDirectionChange = useCallback(() => {
    objRef.current?.getBoundingClientRect && objRef.current?.getBoundingClientRect().y > window.innerHeight / 2
      ? (direction.current = 'up')
      : (direction.current = 'down');
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleDirectionChange);
    return () => {
      window.removeEventListener('resize', handleDirectionChange);
    };
  }, []);

  return { direction };
};
