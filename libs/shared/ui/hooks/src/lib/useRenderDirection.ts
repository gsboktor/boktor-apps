import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { Direction } from './useScrollDirection';

export const useRenderDirection = (objRef: RefObject<HTMLElement>, id?: string) => {
  const direction = useRef<Direction>();
  const directionHorizontal = useRef<'left' | 'right'>();

  useMemo(() => {
    if (objRef.current?.getBoundingClientRect) {
      objRef.current?.getBoundingClientRect().y > window.innerHeight / 2
        ? (direction.current = Direction.UP)
        : (direction.current = Direction.DOWN);

      objRef.current.getBoundingClientRect().x > window.innerWidth / 2
        ? (directionHorizontal.current = 'left')
        : (directionHorizontal.current = 'right');
    }
  }, [objRef.current]);

  const handleDirectionChange = useCallback(() => {
    objRef.current?.getBoundingClientRect && objRef.current?.getBoundingClientRect().y > window.innerHeight / 2
      ? (direction.current = Direction.UP)
      : (direction.current = Direction.DOWN);

    objRef.current?.getBoundingClientRect && objRef.current?.getBoundingClientRect().x > window.innerWidth / 2
      ? (directionHorizontal.current = 'left')
      : (directionHorizontal.current = 'right');
  }, [objRef]);

  useEffect(() => {
    window.addEventListener('resize', handleDirectionChange);
    return () => {
      window.removeEventListener('resize', handleDirectionChange);
    };
  }, [handleDirectionChange]);

  return { direction, directionHorizontal };
};
