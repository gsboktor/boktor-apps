import { SideModalTicketForm } from '@boktor-apps/nomopomo/features/nomopomo-forms';
import { ChipCard, SelectionCard } from '@boktor-apps/shared/ui/cards';
import { ScrollCarousel } from '@boktor-apps/shared/ui/scroll-carousel';

import { setTaskFormValues } from '@boktor-apps/nomopomo/data-access/store';
import { CloseComponent } from '@boktor-apps/shared/ui/assets';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { DEFAULTS } from './consts';

const ModalSubHeader = styled.p`
  display: flex;
  margin: 0px;
  width: 100%;
  height: fit-content;
  text-align: left;
  font-family: Inter;
  letter-spacing: -2px;
  font-weight: 300;
  font-size: 26px;
  color: #434343;
`;

const ModalBody = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 16px;
  overflow: scroll;
  width: 100%;
  margin: 24px 0px;
  align-items: center;
  flex-direction: column;
`;

const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const CardContainer = styled.div`
  width: fit-content;
`;

const SelectionsContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Closed = styled(CloseComponent)`
  display: flex;
  width: 12px;
  height: 12px;
  align-items: center;
  justify-content: center;
`;

export const SideModalBody = () => {
  const [localSelections, setLocalSelections] = useState<number[]>([]);
  const [taskForm, setTaskForm] = useAtom(setTaskFormValues);

  const handleSelection = useCallback(
    (id: number) => {
      if (localSelections.includes(id)) {
        const spliced = localSelections;
        spliced.splice(localSelections.indexOf(id), 1);
        setLocalSelections([...spliced]);

        const oldTags = taskForm.tags;
        oldTags.splice(
          oldTags.findIndex((t) => t.id === id),
          1,
        );

        setTaskForm({
          tags: [...oldTags],
        });
        return;
      }
      setLocalSelections((prev) => [...prev, id]);
      setTaskForm({
        tags: taskForm.tags
          ? [
              ...taskForm.tags,
              {
                id: id,
                mainColor: DEFAULTS['variant1'][id - 1].mainColor,
                label: DEFAULTS['variant1'][id - 1].label,
                icon: DEFAULTS['variant1'][id - 1].icon,
              },
            ]
          : [
              {
                id: id,
                mainColor: DEFAULTS['variant1'][id - 1].mainColor,
                label: DEFAULTS['variant1'][id - 1].label,
                icon: DEFAULTS['variant1'][id - 1].icon,
              },
            ],
      });
    },
    [localSelections],
  );
  return (
    <ModalBody>
      <ModalSection>
        <ModalSubHeader>
          Step 1<b style={{ marginLeft: 6, letterSpacing: -1 }}> • Pick work categories!</b>
        </ModalSubHeader>
        <div style={{ height: 'fit-content' }}>
          <ScrollCarousel
            gap={12}
            direction="right"
            marginFactor={32}
            animationDelay={200}
            items={DEFAULTS['variant1']}
            render={(item, idx) => {
              return (
                <CardContainer>
                  <SelectionCard
                    onSelection={() => handleSelection(item.id)}
                    label={item.label}
                    toggled={localSelections.includes(item.id)}
                    selectionCardAttr={{ tabIndex: 0, style: { padding: '4px 10px' } }}
                    cardColor={item.mainColor}
                    labelAttr={{ style: { fontSize: 14, fontWeight: '400', letterSpacing: '-0.5px' } }}
                    toggleContainerAttr={{ style: { transform: `scale(0.6)` } }}
                  />
                </CardContainer>
              );
            }}
          />
          <ScrollCarousel
            gap={12}
            direction="right"
            marginFactor={12}
            animationDelay={500}
            items={DEFAULTS['variant2']}
            render={(item, idx) => {
              return (
                <CardContainer>
                  <SelectionCard
                    onSelection={() => handleSelection(item.id)}
                    label={item.label}
                    selectionCardAttr={{ tabIndex: 0, style: { padding: '4px 10px' } }}
                    toggled={localSelections.includes(item.id)}
                    cardColor={item.mainColor}
                    labelAttr={{ style: { fontSize: 14, fontWeight: '400', letterSpacing: '-0.5px' } }}
                    toggleContainerAttr={{ style: { transform: `scale(0.6)` } }}
                  />
                </CardContainer>
              );
            }}
          />
          <SelectionsContainer>
            {localSelections.map((id) => (
              <ChipCard
                key={id}
                Icon={<Closed />}
                label={DEFAULTS['variant1'][id - 1].label}
                actionButtonAttr={{ style: { padding: 4 } }}
                labelAttr={{ style: { fontSize: 10 } }}
                onActionClick={() => {}}
              />
            ))}
          </SelectionsContainer>
        </div>
      </ModalSection>
      <ModalSection>
        <ModalSubHeader>
          Step 2<b style={{ marginLeft: 6, letterSpacing: -1 }}> • Create your first ticket!</b>
        </ModalSubHeader>
        <SideModalTicketForm />
      </ModalSection>
      <ModalSection>
        <ModalSubHeader>
          Step 3<b style={{ marginLeft: 6, letterSpacing: -1 }}> • Set a time and get going!</b>
        </ModalSubHeader>
      </ModalSection>
    </ModalBody>
  );
};
