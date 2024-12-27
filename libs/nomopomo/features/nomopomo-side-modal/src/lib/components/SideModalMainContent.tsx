import styled from 'styled-components';

const SideModalContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const ModalHeader = styled.p`
  margin: 0px;
  width: 100%;
  text-align: left;
  font-family: Inter;
  font-weight: 300;
  font-size: 36px;
  color: #3a3a3a;
`;
export const SideModalMainContent = () => {
  return (
    <SideModalContentContainer>
      <ModalHeader>✏️ Let's get started.</ModalHeader>
    </SideModalContentContainer>
  );
};
