import HamburgerMenu from "./hamburgerMenu";
import Graph from "./graph";
import { useState } from "react";

const Main = () => {

  const [selectedModel, setSelectedModel] = useState('Guoy Chap');
    
  return (
    <div className="grid-container">
        <div className="side-bar">
            <HamburgerMenu selectedModel={selectedModel} setSelectedModel={setSelectedModel}/>
        </div>
    <div className="main-content">
        <Graph/>
    </div>
    </div>
  )
}

export default Main;