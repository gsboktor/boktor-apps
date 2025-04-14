import { boardOperations, setTaskFormValues, taskFieldErrors } from '@boktor-apps/nomopomo/data-access/store';
import { AnimatedSelectionCard } from '@boktor-apps/nomopomo/ui/cards';
import { ChipCard } from '@boktor-apps/shared/ui/cards';
import { Dropdown } from '@boktor-apps/shared/ui/dropdowns';
import { BaseFormField, BaseNumericInput, BaseTextArea } from '@boktor-apps/shared/ui/fields';
import { useAtomValue, useSetAtom } from 'jotai';

import {
  AddIconComponent,
  ArrowSideComponent,
  BoardComponent,
  ClockComponent,
  CloseComponent,
  HelpIconComponent,
} from '@boktor-apps/shared/ui/assets/svgs';

import { Popover } from '@boktor-apps/shared/ui/pop-over';
import { useCallback, useMemo, useState } from 'react';
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

const HelpInnerContent = styled.p`
  color: white;
  display: flex;
  margin: 0px;
  flex-wrap: wrap;
  width: 164px;
  font-size: 12px;
  font-weight: 300;
`;

export const SideModalTicketForm = () => {
  const [dropdownOpen, setOpen] = useState<boolean>(false);
  const { getAllBoards, getBoardConfigByKey } = useAtomValue(boardOperations);
  const setTaskForm = useSetAtom(setTaskFormValues);
  const taskErrors = useAtomValue(taskFieldErrors);

  const boardDropDownItems = useMemo(
    () =>
      Object.keys(getAllBoards()).map((boardKey, idx) => ({
        id: idx,
        label: boardKey,
        boardTheme: getBoardConfigByKey(boardKey)?.theme,
      })),
    [getAllBoards, getBoardConfigByKey],
  );

  const [optionLabel, setOptionLabel] = useState<{ id: number; label: string }>();

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTaskForm({ [e.target.name]: e.target.value === '' ? undefined : e.target.value });
    },
    [setTaskForm],
  );

  const handleOptionSelect = useCallback(
    (board: string) => {
      setTaskForm({ parentBoardKey: board });
    },
    [setTaskForm],
  );

  return (
    <TicketFormContainer>
      <FieldsContainer>
        <Field>
          <HeaderRow>
            <HeaderLabel>Task name</HeaderLabel>
            <Popover
              renderHorizontal="left"
              Icon={<HelpIconComponent width={24} height={24} />}
              Content={<HelpInnerContent>Task names will help you uniquely identify your ticket!</HelpInnerContent>}
            />
          </HeaderRow>
          <BaseFormField
            validationMessage={taskErrors['name']?.message}
            severity={taskErrors['name'] ? 'error' : undefined}
            inputAttr={{
              style: { backgroundColor: '#ffffff45' },
              name: 'name',
            }}
            onInputChange={handleFormChange}
            placeholder="Enter a task name"
            placeholderColor="#2b2b2be6"
          />
        </Field>
        <Field>
          <HeaderRow>
            <HeaderLabel>Task description</HeaderLabel>
            <Popover
              renderHorizontal="left"
              Icon={<HelpIconComponent width={24} height={24} />}
              Content={<HelpInnerContent>Add additional information about the scope of your ticket! Details help!</HelpInnerContent>}
            />
          </HeaderRow>
          <BaseTextArea
            validationMessage={taskErrors['desc']?.message}
            severity={taskErrors['desc'] ? 'error' : undefined}
            textareaAttr={{
              style: { backgroundColor: '#ffffff45' },
              name: 'desc',
            }}
            onInputChange={handleFormChange}
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
              onActionClick={() => {
                console.log('noop');
              }}
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
                  handleOptionSelect(option.label);
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
              onInputChange={handleFormChange}
              placeholder="0"
              inputAttr={{ style: { fontWeight: 600, letterSpacing: -1, fontSize: 18 }, name: 'estimatedCycles' }}
              affixLeft={<ClockComponent width={24} height={24} />}
              inputContainerAttr={{
                style: { backgroundColor: '#ffffff45', padding: `6px 12px` },
              }}
            />
          </NumericPickerContainer>
          <Popover
            renderHorizontal="left"
            Icon={<HelpIconComponent width={24} height={24} />}
            Content={
              <HelpInnerContent>
                Pick the kanban board you want this ticket to start in. And select the number of pomodoro cycles you estimate it will
                require to finish this task!
              </HelpInnerContent>
            }
          />
        </BoardPickerRow>
      </FieldsContainer>
    </TicketFormContainer>
  );
};
