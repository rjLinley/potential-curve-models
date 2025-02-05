import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
    const [selectedModel, setSelectedModel] = useState("Guoy Chapman");
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
                <Main
                    selectedModel={selectedModel}
                    containerRef={containerRef}
                />
            </div>
        </div>
    );
}

export default App;
