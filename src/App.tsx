import { useState } from "react";
import "./App.css";
import Graph from "./components/Graph";
import Sidebar from "./components/Sidebar";

function App() {
    const [selectedModel, setSelectedModel] = useState("DLVO");
    const [containerRef, setContainerRef] = useState<null | HTMLDivElement>(
        null
    );

    return (
        <div className="app">
            <div
                className="grid-container"
                ref={(newRef) => setContainerRef(newRef)}
            >
                <Sidebar
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                />
                <Graph
                    selectedModel={selectedModel}
                    containerRef={containerRef}
                />
            </div>
        </div>
    );
}

export default App;
