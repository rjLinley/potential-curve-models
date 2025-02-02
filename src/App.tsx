import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Main from "./components/main";

function App() {
  // const [count, setCount] = useState(0)

  return (

    <Router>
      <Routes>
        <Route path="/potential-curve-models/" element={<Main />} />
      </Routes>

    </Router>

    
  )
}

export default App

// <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>