import { HoverCard, PageHeader } from '@boktor-apps/boktor-portfolio/ui/components';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { TimedSensitiveItem } from './components/TimedSensitiveItem';

const ContactPageContainer = styled.div`
  position: absolute;
  top: 224px;
  left: 168px;
  right: 168px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (width < 1168px) {
    left: 0px;
    right: 0px;
    margin: auto;
    flex-direction: column;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 345px;
`;

const SensitiveContentContainer = styled(motion.div)<{ calcHeight?: number }>`
  min-height: ${({ calcHeight }) => (calcHeight ? `${calcHeight}px` : `100%`)};
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  @media screen and (width < 768px) {
    min-width: 300px;
    transform: scale(0.2);
  }
`;

export const ContactPage = () => {
  const [showItemsMap, setShowItemsMap] = useState<Set<string>>(new Set<string>());
  const containerRef = useRef<HTMLDivElement>(null);
  const timeWrapperRef = useRef<HTMLDivElement>(null);

  const [calcHeight, setCalcHeight] = useState<number>();

  const contentMap = useMemo(() => {
    return {
      hover1: {
        header: 'gsboktor@gmail.com',
        subHeader: 'send me an email',
        key: 10,
        toast: "Copied:  ' gsboktor@gmail.com '",
        clipboard: 'gsboktor@gmail.com',
      },
      hover2: {
        header: '615 • 243 • 3596',
        subHeader: 'send me a voicemail',
        key: 20,
        toast: "Copied:  ' (615) 243 3596 '",
        clipboard: '6152433596',
      },
      hover3: {
        header: 'linkedin.com/george-boktor',
        subHeader: 'send me a connection invite',
        key: 30,
        toast: "Copied:  ' https://linkedin.com/in/george-boktor '",
        clipboard: 'https://linkedin.com/in/george-boktor/',
      },
      hover4: {
        header: 'buymeacoffee.com/gsboktor',
        subHeader: 'send me a donation',
        key: 40,
        toast: "Copied:  ' https://buymeacoffee.com/gsboktor '",
        clipboard: 'https://buymeacoffee.com/gsboktor',
      },
    } as Record<string, { header: string; subHeader: string; key: number; toast: string; clipboard: string }>;
  }, []);

  const addItem = useCallback((id: string) => {
    setShowItemsMap((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setShowItemsMap((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    setCalcHeight(containerRef.current?.getBoundingClientRect().height);
  }, []);

  return (
    <>
      <PageHeader header="contact me" subHeader="*as of april 2025" cta="Hover for details" />
      <ContactPageContainer>
        <CardsContainer ref={containerRef}>
          <HoverCard
            addItem={addItem}
            id="hover1"
            key={1}
            labelHeader="email address"
            labelSubheader="fastest way to contact"
            iconLabel="EM"
          />
          <HoverCard
            addItem={addItem}
            id="hover2"
            key={2}
            labelHeader="phone number"
            labelSubheader="response within 2 hours"
            iconLabel={'PN'}
          />
          <HoverCard
            addItem={addItem}
            id="hover3"
            key={3}
            labelHeader="linkedIn page"
            labelSubheader="response within 1 day"
            iconLabel={'LI'}
          />
          <HoverCard
            addItem={addItem}
            id="hover4"
            key={4}
            labelHeader="buy me a coffee"
            labelSubheader="response within 1 week"
            iconLabel="BC"
          />
        </CardsContainer>

        <AnimatePresence>
          <SensitiveContentContainer ref={timeWrapperRef} layout="position" calcHeight={calcHeight}>
            <AnimatePresence>
              {Array.from(showItemsMap).map((id) => {
                const item = contentMap[id];

                return item ? (
                  <TimedSensitiveItem
                    key={item.key}
                    header={item.header}
                    subHeader={item.subHeader}
                    removeItem={removeItem}
                    id={id}
                    toast={item.toast}
                    clipboard={item.clipboard}
                  />
                ) : null;
              })}
            </AnimatePresence>
          </SensitiveContentContainer>
        </AnimatePresence>
      </ContactPageContainer>
    </>
  );
};
