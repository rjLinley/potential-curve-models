import { Config } from "plotly.js";

export const linspace = (
    start: number,
    stop: number,
    num: number,
    endpoint: boolean = true
): number[] => {
    const div = endpoint ? num - 1 : num;
    const step = (stop - start) / div;
    return Array.from({ length: num }, (_, i) => start + step * i);
};

export const widthAndHeightPropertyForGraph = (
    containerRef: null | HTMLDivElement
) => {
    if (containerRef) {
        return {
            // width: containerRef.clientWidth - 150, // NOTE: the 150 is the width of the sidebar and should be kept in sync
            height: containerRef.clientHeight - 100, // NOTE: the 100 is the height of the variables container and should be kept in sync
        };
    }
};

export const getGraphConfig = (options?: Partial<Config>) => {
    return { ...options, responsive: true };
};
