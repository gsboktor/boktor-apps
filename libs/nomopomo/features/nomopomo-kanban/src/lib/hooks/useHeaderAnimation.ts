import { Direction, useScrollDirection } from '@boktor-apps/shared/ui/hooks';
import { useAnimate } from 'motion/react';
import { MutableRefObject, useMemo, useState } from 'react';

export const useHeaderAnimation = ({
  containerRef,
}: {
  containerRef: MutableRefObject<HTMLDivElement | undefined>;
}) => {
  const [ref, animate] = useAnimate<HTMLDivElement>();
  const [showActions, setShowActins] = useState<boolean>(false);
  const { scrollDirection, withinTop } = useScrollDirection({ threshold: 30, topThreshold: 50 }, containerRef);

  useMemo(() => {
    if (!ref.current) return;
    if (scrollDirection === Direction.UP && withinTop) {
      setShowActins(false);
      animate(ref.current, {
        y: 0,
        width: `calc(100% - 24px)`,
      });
    } else if (scrollDirection === Direction.DOWN) {
      setShowActins(true);
      animate(
        ref.current,
        {
          y: 24,
          width: `70%`,
        },
        {
          type: 'spring',
          damping: 10,
        },
      );
    }
  }, [scrollDirection, withinTop]);

  return { headerAnimationRef: ref, showActions };
};
