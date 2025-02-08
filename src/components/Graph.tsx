import GuoyChapman from "./GuoyChapman";
import IonGradients from "./IonGradients";
import VanDerWaals from "./VanDerWaals";

type GraphProps = {
    selectedModel: string;
    containerRef: null | HTMLDivElement;
};

const Graph = ({ selectedModel, containerRef }: GraphProps) => {
    switch (selectedModel) {
        case "Guoy Chapman":
            return <GuoyChapman containerRef={containerRef} />;
        case "Van Der Waals":
            return <VanDerWaals containerRef={containerRef} />;
        case "Ion Gradients":
            return <IonGradients containerRef={containerRef} />;
        default:
            return <GuoyChapman containerRef={containerRef} />;
    }
};

export default Graph;
