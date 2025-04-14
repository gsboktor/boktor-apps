import { useEffect, useRef } from 'react';

export const useTimer = (fn: (elapsed: number) => void) => {
  const lastTickRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout>();

  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const elapsed = now - lastTickRef.current;
      lastTickRef.current = now;
      fnRef.current(elapsed);
    };

    const handleVisibilityChange = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      lastTickRef.current = Date.now();

      const interval = document.hidden ? 500 : 1000;
      intervalRef.current = setInterval(tick, interval);
    };

    intervalRef.current = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};
