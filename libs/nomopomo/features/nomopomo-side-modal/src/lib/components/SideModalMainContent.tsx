import { PrimaryButton, SecondaryButton } from '@boktor-apps/shared/ui/buttons';
import styled from 'styled-components';
import { SideModalBody } from './SideModalBody';
const SideModalContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

const ModalHeader = styled.p`
  margin: 0px;
  width: 100%;
  text-align: center;
  font-family: Inter;
  letter-spacing: -2px;
  font-weight: 300;
  font-size: 32px;
  color: #3a3a3a;
`;

const ButtonGroupContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StyledPrimaryButton = styled.div`
  display: flex;
  width: 300px;
  height: 64px;
`;

const StyledSecondaryButton = styled.div`
  display: flex;
  overflow: hidden;
`;

const ButtonIcon = styled.p`
  margin: 0px;
  font-size: 24px;
  line-height: 24px;
  color: #3a3a3a;
`;
export const SideModalMainContent = () => {
  return (
    <SideModalContentContainer>
      <ModalHeader>
        ⏱️ Welcome to <b>Nomopomo.io!</b>
      </ModalHeader>
      <ModalHeader style={{ textAlign: 'start', fontSize: 28 }}>
        The last{' '}
        <em style={{ letterSpacing: -0.5, fontSize: 30 }}>
          <b>pomodoro app</b>
        </em>{' '}
        you will ever need.
      </ModalHeader>
      <SideModalBody />
      <ButtonGroupContainer>
        <StyledPrimaryButton>
          <PrimaryButton affixLeft={<ButtonIcon>✏️</ButtonIcon>} label="Get started" onClick={() => {}} />
        </StyledPrimaryButton>
        <StyledSecondaryButton>
          <SecondaryButton label="Skip" onClick={() => {}} />
        </StyledSecondaryButton>
      </ButtonGroupContainer>
    </SideModalContentContainer>
  );
};
