import { FolderBlobProvider, NewsFeed, SpotifySearch, TodoApp, VirtualList } from '@boktor-apps/features/boktor-playground';
import styled from 'styled-components';
const RootContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px;
`;

const f = {
  name: undefined,
  phoneNumber: undefined,
  email: undefined,
};

export function App() {
  return (
    <RootContainer>
      <FolderBlobProvider>
        <SpotifySearch />
        {/* <DataTreeContainer />
        <RichForm values={f} /> */}
      </FolderBlobProvider>
      <NewsFeed />
      <TodoApp />
      <VirtualList />
    </RootContainer>
  );
}

export default App;
