import { Bullet, PageHeader, Size, StyledText } from '@boktor-apps/boktor-portfolio/ui/components';
import { AnimatePresence, motion, useAnimationControls, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useMedia } from 'react-use';

const options = {
  cMapUrl: '/cmaps/',
  cMapPacked: true,
};

const startingPositions = [
  // Horizontal approaches
  -window.innerWidth, // slide from left
  window.innerWidth, // slide from right
  -window.innerWidth / 2, // slide from middle-left
  window.innerWidth / 2, // slide from middle-right

  // Vertical approaches
  { x: 0, y: -window.innerHeight / 2 }, // slide from top
  { x: 0, y: window.innerHeight / 2 }, // slide from bottom

  // Diagonal approaches
  { x: -window.innerWidth / 2, y: -window.innerHeight / 2 }, // slide from top-left
  { x: window.innerWidth / 2, y: -window.innerHeight / 2 }, // slide from top-right
  { x: -window.innerWidth / 2, y: window.innerHeight / 2 }, // slide from bottom-left
  { x: window.innerWidth / 2, y: window.innerHeight / 2 }, // slide from bottom-right
];

const RESUME_ASPECT_RATIO = 1.33; // width/height ratio of the PDF

export const ResumePage = () => {
  const controls = useAnimationControls();
  const resizeBlock = useRef<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBlurOverlay, setShowBlurOverlay] = useState<boolean>(false);

  const isMobile = useMedia('(width < 768px)');
  const isMobileSmall = useMedia('(width < 418px)');
  const isMobileHeight = useMedia('(height < 925px)');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXspring = useSpring(mouseX, { bounce: 0.25 });
  const mouseYSpring = useSpring(mouseY, { bounce: 0.25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [22, -22]);
  const rotateY = useTransform(mouseXspring, [-0.5, 0.5], [-22, 22]);

  const shadowX = useTransform(mouseXspring, [-0.5, 0.5], [-22, 22]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [22, -22]);

  const boxShadow = useTransform([shadowX, shadowY], ([x, y]: number[]) => {
    return `${-x * 5}px ${y * 5}px 64px 4px black`;
  });

  const [showInnerPage, setShowInnerPage] = useState<boolean>(false);

  const startingPosition = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * startingPositions.length);
    const position = startingPositions[randomIndex];
    return typeof position === 'number' ? { x: position, y: 0 } : position;
  }, []);

  const width = useMemo(() => {
    if (isMobile && !isMobileSmall) return 325;
    if (isMobileSmall) return 265;

    return 500;
  }, [isMobile, isMobileSmall]);

  const height = useMemo(() => {
    return Math.round(width * RESUME_ASPECT_RATIO);
  }, [width]);

  useEffect(() => {
    if (resizeBlock.current) return;
    controls.start({ height: height, width: width });
  }, [controls, height, width]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const mX = event.clientX - rect.left;
    const mY = event.clientY - rect.top;
    const x = mX / rect.width - 0.5;
    const y = mY / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setShowBlurOverlay(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headerHeight = useMemo(() => {
    if (isMobile && !isMobileHeight) return 128;
    if (isMobileHeight) return 48;

    return 48;
  }, [isMobile, isMobileHeight]);

  useEffect(() => {
    if (resizeBlock.current) return;
    controls.start({ height: height, width: width });
  }, [controls, height, width]);

  function onDocumentLoadSuccess() {
    controls
      .start({
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        filter: `blur(0px)`,
        transition: { type: 'spring', duration: 0.75 },
      })
      .then(() => controls.start({ borderRadius: 12 }))
      .then(() => {
        setShowInnerPage(true);
        controls
          .start({
            width: width,
            height: height,
            borderRadius: 12,
          })
          .then(() => controls.start({ backgroundColor: 'white' }));
        resizeBlock.current = false;
      });
  }
  return (
    <>
      <PageHeader
        header="resume"
        subHeader="*as of april 2025"
        cta="Click to download"
        onClick={() => window.open('/assets/george-boktor-resume.pdf', '_blank')}
        style={
          !isMobileSmall
            ? {
                position: 'absolute',
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
                justifyContent: 'center',
                left: 64,
                top: headerHeight,
              }
            : { left: 0, right: 0, margin: 'auto', top: headerHeight }
        }
      />

      <motion.div
        ref={containerRef}
        initial={{
          filter: `blur(16px)`,
          opacity: 0,
          x: startingPosition.x,
          y: startingPosition.y,
          width: 64,
          height: 64,
          backgroundColor: '#008578',
          borderRadius: '50%',
        }}
        animate={{
          ...controls,
        }}
        onMouseOver={() => setShowBlurOverlay(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          top: 64,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow,
          margin: 'auto',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'fit-content',
          height: 'fit-content',
          perspective: 1000,
          transformStyle: 'preserve-3d',
          rotateX: rotateX,
          rotateY: rotateY,
        }}
      >
        <AnimatePresence>
          {showBlurOverlay && !resizeBlock.current && (
            <motion.div
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(8px)', backgroundColor: '#00857891', transition: { duration: 1 } }}
              exit={{ backdropFilter: 'blur(0px)', backgroundColor: '#ffffff0', transition: { duration: 0.5 } }}
              onClick={() => window.open('/assets/george-boktor-resume.pdf', '_blank')}
              style={{
                cursor: 'pointer',
                position: 'absolute',
                zIndex: 100000,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                initial={{
                  filter: 'blur(8px)',

                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  width: '100%',
                }}
                animate={{ filter: 'blur(0px)', transition: { duration: 0.5 } }}
                exit={{ filter: 'blur(8px)', transition: { duration: 0.5 } }}
              >
                <StyledText size={Size.REG}>download resume*</StyledText>
                <Bullet cta="*pdf only" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Document
          options={options}
          file={`/assets/george-boktor-resume.pdf`}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                color: '#666',
              }}
            >
              Loading PDF...
            </div>
          }
          error={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                color: '#e74c3c',
              }}
            >
              Failed to load PDF file.
            </div>
          }
        >
          {showInnerPage && (
            <motion.div
              initial={{ filter: `blur(8px)` }}
              animate={{ filter: `blur(0px)` }}
              transition={{ delay: 0.25 }}
              style={{
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                padding: '10px',
                width: 'fit-content',
              }}
            >
              <Page pageNumber={1} width={width} renderTextLayer={false} renderAnnotationLayer={false} />
            </motion.div>
          )}
        </Document>
      </motion.div>
    </>
  );
};
