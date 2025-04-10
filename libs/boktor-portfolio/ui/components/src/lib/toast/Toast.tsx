import { removeToastAtom, Toast } from '@boktor-apps/boktor-portfolio/data-access/store';
import { LightningComponent } from '@boktor-apps/shared/ui/assets/svgs';
import { useSetAtom } from 'jotai';
import { motion, useAnimationControls } from 'motion/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatedBlurBox } from '../AnimatedBlurBox';
import { Ball } from '../Bullet';
import { StyledText } from '../StyledText';

const ToastComponentContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  flex-wrap: wrap;
  user-select: none;
`;

const ToastComponentIconContainer = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 0px;
  left: 8px;
  bottom: 0px;
  margin: auto;
`;

export const ToastComponent = ({ t }: { t: Toast }) => {
  const containerCtrl = useAnimationControls();
  const [content, showContent] = useState<boolean>(false);
  const dismissToast = useSetAtom(removeToastAtom);

  useEffect(() => {
    containerCtrl
      .start({ y: 0, transition: { type: 'spring', bounce: 0.5 } })
      .then(() => showContent(true))
      .then(() => containerCtrl.start({ borderRadius: 24, width: `fit-content`, height: `100%`, backgroundColor: '#ffffff' }));
  }, [containerCtrl]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dismissToast({ id: t.id });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [dismissToast, t]);

  return (
    <ToastComponentContainer
      initial={{ width: 28, height: 28, backgroundColor: '#008578', borderRadius: 100, y: 100 }}
      whileHover={{ scale: 1.1 }}
      animate={containerCtrl}
      exit={{ filter: `blur(8px)`, opacity: 0 }}
    >
      {content && (
        <AnimatedBlurBox
          animate={{ opacity: 1, filter: 'blur(0px)', transition: { delay: 0.2, duration: 0.4 } }}
          style={{
            width: '100%',
            height: '100%',
            display: 'inherit',
            flexDirection: 'inherit',
            alignItems: 'inherit',
            justifyContent: 'inherit',
          }}
        >
          <ToastComponentIconContainer>{t.icon ?? <LightningComponent width={28} height={28} />}</ToastComponentIconContainer>
          <StyledText style={{ color: '#000000', fontSize: 16, marginLeft: 48, marginRight: 48 }}>{t.message}</StyledText>
          <Ball style={{ position: 'absolute', right: 16, top: 0, bottom: 0, margin: 'auto', borderRadius: 50 }}></Ball>
        </AnimatedBlurBox>
      )}
    </ToastComponentContainer>
  );
};
