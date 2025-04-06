import { RefObject, useEffect, useRef } from 'react';

export const useOutOfBounds = (ref: RefObject<HTMLElement>, onOutOfBounds: () => void) => {
  const callbackFn = useRef<() => void>();

  callbackFn.current = onOutOfBounds;

  useEffect(() => {
    const handleMouseDown = (ev: MouseEvent) => {
      console.log('onMousedown', ev);
      if (ref && !ref.current?.contains(ev.target as Element)) {
        console.log('outside target');

        callbackFn.current?.();
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [ref]);
};
