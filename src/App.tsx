import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="font-bold text-2xl">Vite + React</h1>
      <div className="card">
        <button
          className="bg-green-500"
          onClick={() => setCount((count) => count + 1)}
        >
          counter: {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
