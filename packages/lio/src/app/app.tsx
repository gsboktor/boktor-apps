import { AuthPage } from '@boktor-apps/lio/features/auth-page';

export function App() {
  return (
    <div className="w-screen h-screen bg-gray-500 flex relative overflow-hidden">
      <div
        id="logo-container"
        className="absolute left-0 right-0 top-0 bottom-0 m-auto w-fit h-fit rounded-2xl flex items-center  box-border"
      >
        <div className="flex flex-col items-center select-none gap-3 justify-between">
          <img alt="logo" src={`/lio.png`} className="w-42 h-24" />

          <AuthPage />
        </div>
      </div>
    </div>
  );
}

export default App;
