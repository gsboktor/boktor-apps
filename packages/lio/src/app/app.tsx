import { LandingForm } from '@boktor-apps/lio/features/landing-form';

export function App() {
  return (
    <div className="w-screen h-[2000px] bg-gray-500 flex relative overflow-hidden">
      <div className="fixed top-24 w-full h-24 bg-red-50">Test</div>
      <LandingForm />
    </div>
  );
}

export default App;
