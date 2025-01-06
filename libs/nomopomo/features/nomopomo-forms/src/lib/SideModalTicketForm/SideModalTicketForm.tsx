import { boardOperations } from '@boktor-apps/nomopomo/data-access/store';
import { AnimatedSelectionCard } from '@boktor-apps/nomopomo/ui/cards';
import { ChipCard } from '@boktor-apps/shared/ui/cards';
import { Dropdown } from '@boktor-apps/shared/ui/dropdowns';
import { BaseFormField, BaseNumericInput, BaseTextArea } from '@boktor-apps/shared/ui/fields';
import { useAtomValue } from 'jotai';

import {
  AddIconComponent,
  ArrowSideComponent,
  BoardComponent,
  ClockComponent,
  CloseComponent,
  HelpIconComponent,
} from '@boktor-apps/shared/ui/assets';

import { useMemo, useState } from 'react';
import styled from 'styled-components';

const TicketFormContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 0px 24px;
  flex-direction: column;
`;

const FieldsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: inherit;
`;

const Field = styled(FieldsContainer)`
  gap: 2px;
`;

const HeaderRow = styled.div`
  display: flex;
  flex: 1;
  height: fit-content;
  padding: 0px 12px;
  box-sizing: inherit;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const HeaderLabel = styled.p`
  display: inline;
  margin: 0;
  font-weight: 300;
  font-size: 16px;
`;

const Tags = styled.div`
  display: inherit;
  flex-direction: row;
  padding: 4px 12px;
  gap: 2px;
  box-sizing: inherit;
  align-items: center;
  justify-content: flex-start;
`;

const Closed = styled(CloseComponent)`
  display: flex;
  width: 12px;
  height: 12px;
  align-items: center;
  justify-content: center;
`;

const Break = styled.hr`
  border: none;
  outline: none;
  width: calc(100% - 64px);
  align-self: center;
  background-color: #ffffff41;
  height: 3px;
`;

const BoardPickerRow = styled.div`
  display: inherit;
  flex-direction: row;
  width: 100%;
  padding: 0px 12px;
  box-sizing: border-box;
  align-items: center;
  gap: 12px;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex: 1;
`;

const NumericPickerContainer = styled.div`
  width: 78px;
`;

export const SideModalTicketForm = () => {
  const [dropdownOpen, setOpen] = useState<boolean>(false);
  const { getAllBoards, getBoardConfigByKey } = useAtomValue(boardOperations);

  const boardDropDownItems = useMemo(
    () =>
      Object.keys(getAllBoards()).map((boardKey, idx) => ({
        id: idx,
        label: boardKey,
        boardTheme: getBoardConfigByKey(boardKey).theme,
      })),
    [getAllBoards, getBoardConfigByKey],
  );

  const [optionLabel, setOptionLabel] = useState<{ id: number; label: string }>();

  return (
    <TicketFormContainer>
      <FieldsContainer>
        <Field>
          <HeaderRow>
            <HeaderLabel>Task name</HeaderLabel>
            <HelpIconComponent width={24} height={24} />
          </HeaderRow>
          <BaseFormField
            inputAttr={{
              style: { backgroundColor: '#ffffff45' },
            }}
            onInputChange={() => {}}
            placeholder="Enter a task name"
            placeholderColor="#2b2b2be6"
          />
        </Field>
        <Field>
          <HeaderRow>
            <HeaderLabel>Task description</HeaderLabel>
            <HelpIconComponent width={24} height={24} />
          </HeaderRow>
          <BaseTextArea
            textareaAttr={{
              style: { backgroundColor: '#ffffff45' },
            }}
            onInputChange={() => {}}
            placeholder="Enter a task description"
            placeholderColor="#2b2b2be6"
          />
          <Tags>
            <ChipCard
              key={0}
              Icon={<Closed />}
              label={'Chip tag'}
              actionButtonAttr={{ style: { padding: 4 } }}
              labelAttr={{ style: { fontSize: 10 } }}
              onActionClick={() => {}}
            />
            <AddIconComponent width={24} height={24} />
          </Tags>
        </Field>
        <Break />
        <BoardPickerRow>
          <BoardComponent width={24} height={24} />
          <DropdownContainer>
            <Dropdown
              items={boardDropDownItems}
              length={boardDropDownItems.length}
              placeholder={optionLabel?.label ?? 'Select a board'}
              onClose={() => {
                setOpen(false);
              }}
              onOpen={() => {
                setOpen(true);
              }}
              Icon={<ArrowSideComponent width={24} height={24} />}
              open={dropdownOpen}
              onOptionSelect={(option) => {
                if (optionLabel?.id === option.id) {
                  setOptionLabel(undefined);
                } else {
                  setOptionLabel(option);
                }
              }}
              render={(item, idx, onSelect) => (
                <AnimatedSelectionCard
                  selectionCardAttr={{ style: { padding: 6, gap: 8 } }}
                  labelAttr={{ style: { fontSize: 14, textAlign: 'start', fontWeight: 400, letterSpacing: -1 } }}
                  toggleContainerAttr={{ style: { transform: `scale(0.6)` } }}
                  cardColor={item.boardTheme}
                  delay={0.15 * idx}
                  key={idx}
                  label={item.label}
                  toggled={optionLabel?.id === item.id}
                  onSelection={() => onSelect(item)}
                />
              )}
            />
          </DropdownContainer>

          <NumericPickerContainer>
            <BaseNumericInput
              onInputChange={() => {}}
              placeholder="0"
              inputAttr={{ style: { fontWeight: 600, letterSpacing: -1, fontSize: 18 } }}
              affixLeft={<ClockComponent width={24} height={24} />}
              inputContainerAttr={{
                style: { backgroundColor: '#ffffff45', padding: `6px 12px` },
              }}
            />
          </NumericPickerContainer>
          <HelpIconComponent width={24} height={24} />
        </BoardPickerRow>
      </FieldsContainer>
    </TicketFormContainer>
  );
};
