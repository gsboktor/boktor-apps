import { AddIconComponent, DropCardComponent } from '@boktor-apps/shared/ui/assets';
import { AnimatePresence, motion, useAnimate } from 'motion/react';
import { RefObject, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { PlaceholderCard } from '../KanbanBoard';

const VacantBoardContainer = styled(motion.div)<{ $theme: string }>`
  position: absolute;
  top: 52px;

  margin: auto;
  width: 95%;
  overflow: hidden;
  height: 40%;
  border-radius: 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 12px;
  background-color: ${({ $theme }) => $theme + `88`};
`;

const animate = keyframes`
    0% {
		background-position: 0 0;
	}
	50% {
		background-position: 300% 0;
	}
	100% {
		background-position: 0 0;
	}
`;

const ModalGradient = styled.div`
  position: absolute;
  width: calc(80% + 16px);
  height: calc(80% + 16px);
  border-radius: 36px;
  filter: blur(64px);
  background: var(--gradient-shadow);
  background-size: 400%;
  animation: ${animate} 20s linear infinite;
  transition: filter ease-in-out 200ms;
`;

export const VacantBoard = ({
  expand,
  overlayRef,
  theme,
  boardId,
}: {
  expand: boolean;
  overlayRef?: RefObject<HTMLDivElement>;
  theme: string;
  boardId: string;
}) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    if (expand) {
      animate(scope.current, { transform: `scale(1)`, borderRadius: `26px`, width: `100%`, height: `80%` });
    } else {
      animate(scope.current, { transform: `scale(1)`, borderRadius: `36px`, width: `95%`, height: '40%' });
    }
  }, [expand, animate]);

  return (
    <>
      <VacantBoardContainer
        initial={{ transform: 'scale(1)', opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          height: overlayRef?.current?.getBoundingClientRect().height,
          transition: {
            duration: 0.2,
          },
        }}
        ref={scope}
        $theme={theme}
      >
        <ModalGradient />
        <AnimatePresence>
          {expand ? (
            <PlaceholderCard
              $theme={theme}
              initial={{ height: 0, opacity: 0 }}
              exit={{ height: 0, display: 'none', opacity: 0 }}
              animate={{ height: overlayRef?.current?.getBoundingClientRect().height, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <DropCardComponent width={48} height={48} />
            </PlaceholderCard>
          ) : (
            <>
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  display: 'flex',
                  zIndex: 1000,
                  gap: 12,
                }}
                layout
                initial={{ scale: 1.3, opacity: 0.75 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.6 }}
              >
                <AddIconComponent width={72} height={72} />
                <p
                  style={{
                    margin: 0,
                    color: '#4c4b4b',
                    fontWeight: 400,
                    fontSize: 24,
                    textAlign: 'center',
                    maxWidth: `80%`,
                  }}
                >
                  Add a new Task to <b style={{ color: theme, filter: `brightness(0.7)` }}>{boardId}</b>
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </VacantBoardContainer>
    </>
  );
};
