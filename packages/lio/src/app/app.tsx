export function App() {
  return (
    <div className="w-screen h-screen bg-gray-500 flex relative">
      <div
        id="logo-container"
        className="absolute left-0 right-0 top-0 bottom-0 m-auto bg-gray-800 w-fit h-fit rounded-2xl shadow-md shadow-gray-700 px-6 py-12 flex items-center  box-border transition-all hover:scale-105"
      >
        <div className="flex flex-col items-center select-none gap-3 justify-between">
          <img alt="logo" src={`/lio.png`} className="w-42 h-24" />
          <input className="rounded-md bg-white placeholder-black px-3 py-1.5 outline-none border-none" placeholder="Username"></input>
          <input className="rounded-md bg-white placeholder-black px-3 py-1.5 outline-none border-none" placeholder="Password"></input>
        </div>
      </div>
    </div>
  );
}

export default App;
