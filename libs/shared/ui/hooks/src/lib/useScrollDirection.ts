import { RefObject, useEffect, useState } from 'react';

export type ScrollDirectionConfig = {
  threshold?: number;
  topThreshold?: number;
};

export enum Direction {
  UP = 'up',
  DOWN = 'down',
}

export const useScrollDirection = (
  scrollContainerRef: RefObject<HTMLElement>,
  { threshold = 0, topThreshold = 10 }: ScrollDirectionConfig,
) => {
  const [scrollDirection, setScrollDirection] = useState<Direction | undefined>(undefined);
  const [withinTop, setWithinTop] = useState<boolean>(false);

  useEffect(() => {
    let lastScrollY = scrollContainerRef.current?.scrollTop!;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = scrollContainerRef.current?.scrollTop!;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDirection(scrollY > lastScrollY ? Direction.DOWN : Direction.UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;

      if (scrollY <= topThreshold) {
        setWithinTop(true);
      } else {
        setWithinTop(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    scrollContainerRef.current?.addEventListener('scroll', onScroll);

    return () => scrollContainerRef.current?.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return { scrollDirection, withinTop };
};
