import { MutableRefObject, useEffect, useState } from 'react';

export type ScrollDirectionConfig = {
  threshold?: number;
  topThreshold?: number;
};

export enum Direction {
  UP = 'up',
  DOWN = 'down',
}

export const useScrollDirection = (
  { threshold = 0, topThreshold = 10 }: ScrollDirectionConfig,
  scrollContainerRef?: MutableRefObject<HTMLElement | undefined>,
) => {
  const [scrollDirection, setScrollDirection] = useState<Direction | undefined>(undefined);
  const [withinTop, setWithinTop] = useState<boolean>(false);

  useEffect(() => {
    let lastScrollY = scrollContainerRef?.current?.scrollTop ?? 0;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = scrollContainerRef?.current?.scrollTop ?? 0;

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

    scrollContainerRef?.current?.addEventListener('scroll', onScroll);

    return () => scrollContainerRef?.current?.removeEventListener('scroll', onScroll);
  }, [scrollContainerRef, scrollDirection, threshold, topThreshold]);

  return { scrollDirection, withinTop };
};
