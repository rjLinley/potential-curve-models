import GuoyChapman from "./GuoyChapman";
import IonGradients from "./IonGradients";
import VanDerWaals from "./VanDerWaals";

type MainProps = {
    selectedModel: string;
    containerRef: null | HTMLDivElement;
};

const Main = ({ selectedModel, containerRef }: MainProps) => {
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

export default Main;
