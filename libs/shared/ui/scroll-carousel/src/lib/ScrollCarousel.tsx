import { AnimationControls, motion, useAnimation } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Boundary = styled.div`
  display: flex;
  width: 100%; // Changed from fit-content to 100%
  overflow-x: hidden; // Added overflow-x
  overflow-y: visible;
  scrollbar-width: none;
  cursor: grabbing;
  z-index: 100;
  padding: 4px 0;
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
`;

export type ScrollCarouselProps<T> = {
  // Generic type T for the data items
  items: T[];
  // Render prop that receives the item and animation controls
  render: (item: T, controls: AnimationControls) => React.ReactNode;
  // Animation options
  direction?: 'left' | 'right';
  stagger?: boolean;
  staggerDelay?: number;
  // Carousel behavior
  gap?: number;
  snap?: boolean;
  marginFactor?: number;
  animationDelay?: number;
};

export const ScrollCarousel = <T,>({
  items,
  render,
  direction = 'left',
  stagger = true,
  staggerDelay = 0.2,
  gap = 14,
  snap = true,
  marginFactor = 24,
  animationDelay = 0,
}: ScrollCarouselProps<T>) => {
  const controls = useAnimation();

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const delayTime = setTimeout(
      () =>
        controls.start((i) => ({
          x: 0,
          opacity: 1,
          transition: {
            delay: stagger ? i * staggerDelay : 0,
            type: 'spring',
            stiffness: 100,
          },
        })),
      animationDelay,
    );

    return () => {
      clearTimeout(delayTime);
    };
  }, [controls, stagger, staggerDelay]);

  const setDragConstraints = () => {
    setScrollWidth(scrollBarRef.current?.scrollWidth ?? 0);
    setContainerWidth(containerRef.current?.offsetWidth ?? 0);
  };

  useLayoutEffect(() => {
    setDragConstraints();

    window.addEventListener('resize', setDragConstraints);

    return () => {
      window.removeEventListener('resize', setDragConstraints);
    };
  }, []);

  return (
    <Boundary ref={containerRef}>
      <motion.div
        ref={scrollBarRef}
        style={{
          display: 'flex',
          gap,
          marginLeft: marginFactor,
          marginRight: marginFactor,
          cursor: 'grabbing',
        }}
        drag="x"
        dragElastic={0.2} // Prevents elastic dragging beyond constraints
        dragMomentum={true} // Disables momentum after drag
        dragConstraints={{
          left: -(scrollWidth - containerWidth) - 30,
          right: 0,
        }}
        whileDrag={{ pointerEvents: 'none' }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial={{
              x: direction === 'left' ? -200 : 200,
              opacity: 0,
            }}
            animate={controls}
            style={{
              minWidth: 'fit-content', // Add fixed minimum width
              flexShrink: 1, // Prevent shrinking
              display: 'flex', // Ensure proper flex layout
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {render(item, controls)}
          </motion.div>
        ))}
      </motion.div>
    </Boundary>
  );
};
