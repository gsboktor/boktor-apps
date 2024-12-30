import { activeModalAtom, boardOperations } from '@boktor-apps/nomopomo/data-access/store';
import { KanbanBoard } from '@boktor-apps/nomopomo/features/nomopomo-kanban';
import { NomopomoSideModal } from '@boktor-apps/nomopomo/features/nomopomo-side-modal';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMedia } from 'react-use';
import styled from 'styled-components';
import { MainTimer, NomopomoBlurLogo } from './components';

const DashboardRootContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const NomopomoDashHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
  overflow: visible;
  align-items: center;
  justify-content: space-between;
`;

const NomopomoMainDashboard = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: calc(100% - 224px);

  gap: 16px;
  margin-bottom: 88px;
  padding: 16px 0px;
  overflow-x: scroll;
`;

const BoardContainer = styled.div`
  display: flex;
  height: 100%;
  min-width: 224px;
  @media screen and (width < 378px) {
    width: 100%;
    min-width: 100%;
  }
`;

export const NomopomoDashboard = () => {
  const isMobile = useMedia('(max-width: 374px)');
  const setModalState = useSetAtom(activeModalAtom);
  const { getAllBoards, getBoardConfigByKey } = useAtomValue(boardOperations);

  return (
    <DashboardRootContainer>
      {!isMobile && <NomopomoBlurLogo />}
      <NomopomoDashHeader>
        <MainTimer />
        <button
          style={{ position: 'absolute', right: 0 }}
          onClick={() =>
            setModalState({
              Component: NomopomoSideModal,
              show: true,
            })
          }
        >
          show
        </button>
      </NomopomoDashHeader>
      <NomopomoMainDashboard>
        {Object.keys(getAllBoards()).map((id) => {
          return (
            <BoardContainer>
              <KanbanBoard boardId={id} theme={getBoardConfigByKey(id).theme ?? 'white'} />
            </BoardContainer>
          );
        })}
        {/* <BoardContainer>
          <KanbanBoard id="In Progress" />
        </BoardContainer>
        <BoardContainer>
          <KanbanBoard id="tesst" />
        </BoardContainer>
        <BoardContainer>
          <KanbanBoard id="tesst" />
        </BoardContainer>
        <BoardContainer>
          <KanbanBoard id="tesst" />
        </BoardContainer>
        <BoardContainer>
          <KanbanBoard id="tesst" />
        </BoardContainer> */}
      </NomopomoMainDashboard>
    </DashboardRootContainer>
  );
};
