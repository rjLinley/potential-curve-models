import Plot from "react-plotly.js";
import {
    getGraphConfig,
    linspace,
    widthAndHeightPropertyForGraph,
} from "../helperFunctions";
import { ChangeEvent, useState } from "react";
import { ModelProps } from "../types/generalTypes";
import LogarithmicRange from "./LogarithmicRange";


const VanDerWaals = ({ containerRef }: ModelProps) => {
    // Adjustable
    const [R1, setR1] = useState(5e-9);
    // const R1 = 5E-9 //m (radius of sphere 1) Limits (5E-7 to 5E-5 m)
    const [R2, setR2] = useState(5e-9);
    // const R2 = 5E-9 //m (radius of sphere 2) Limits (5E-7 to 5E-5 m)
    const [A1, setA1] = useState(43.5e-20);
    // const A1 = 43.5E-20 //J (Hamaker constant of sphere 1) Limits (3.5E-20 to 45E-20)
    const [A2, setA2] = useState(43.5e-20);
    // const A2 = 43.5E-20 //J (Hamaker constant of sphere 2) Limits (3.5E-20 to 45E-20)
    const [A_S, setA_S] = useState(4.35e-20);
    // const A_S = 4.35E-20 //J (Hamaker constant of solvent) Limits (3.5E-20 to 8E-20)
    const [T, setT] = useState(25);
    // const T = 25 //degrees C (Temperature) Limits (0 to 100)

    // Fixed
    const d = linspace(1e-10, 1e-7, 1001);
    // const T_K = T + 273.15;
    const kB = 1.38e-23; //J/K

    // #Calculate combined Hamaker constant
    const A_C =
        (A2 ** (1 / 2) - A_S ** (1 / 2)) * (A1 ** (1 / 2) - A_S ** (1 / 2));

    const x = d.map((item) => item * 1e9);
    const y = d.map(
        (item) => ((-A_C / (6 * item)) * (R1 * R2)) / (R1 + R2) / (kB * T)
    );

    document.title = "Van Der Waals";

    const handleReset = () => {
        setR1(5e-9)
        setR2(5e-9)
        setA1(43.5e-20)
        setA2(43.5e-20)
        setA_S(4.35e-20)
        setT(25)
    }

    return (
        <div className="graph-container">
            <Plot
                config={getGraphConfig()}
                className="graph"
                data={[
                    {
                        x: x,
                        y: y,
                        type: "scatter",
                        marker: { color: "teal" },
                    },
                ]}
                layout={{
                    ...widthAndHeightPropertyForGraph(containerRef),
                    title: "Van der Waals Attraction Between Two Spheres",
                    xaxis: {
                        range: [0, 100],
                        rangemode: "normal",
                        title: { text: "Separation Distance (nm)" },
                    },
                    yaxis: {
                        range: [-25, 25],
                        rangemode: "normal",
                        title: { text: "V/kBT (-)" },
                    },
                    shapes: [
                        {
                            type: "line",
                            x0: 0,
                            y0: -25,
                            x1: 100,
                            y1: -25,
                            line: {
                                color: "black",
                                width: 1.5,
                            },
                        },
                    ],
                }}
            />
            <div className="variables-container">
                <div className="variable-group">
                    <div className="variable-title">Set R1</div>
                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setR1(Number(event.target.value))
                        }
                        value={R1}
                        step="1E-10"
                        min="5E-9"
                        max="5E-8"
                    ></input>
                    <LogarithmicRange primaryValue={R1} setPrimaryValue={setR1} minpos={0} maxpos={100} minval={5E-9} maxval={5E-8} fixedPlaces={10}/>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setR1(Number(event.target.value))
                        }
                        value={R1}
                        min="5E-9"
                        max="5E-8"
                        step="1E-10"
                    ></input>
                </div>

                <div className="variable-group">
                    <div className="variable-title">Set R2</div>
                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setR2(Number(event.target.value))
                        }
                        value={R2}
                        step="1E-10"
                        min="5E-9"
                        max="5E-8"
                    ></input>
                    <LogarithmicRange primaryValue={R2} setPrimaryValue={setR2} minpos={0} maxpos={100} minval={5E-9} maxval={5E-8} fixedPlaces={10}/>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setR2(Number(event.target.value))
                        }
                        value={R2}
                        step="1E-10"
                        min="5E-9"
                        max="5E-8"
                    ></input>
                </div>
                <div className="variable-group">
                    <div className="variable-title">Set A1</div>
                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setA1(Number(event.target.value))
                        }
                        value={A1}
                        step="1E-20"
                        min="3.5E-20"
                        max="45E-20"
                    ></input>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setA1(Number(event.target.value))
                        }
                        value={A1}
                        min="3.5E-20"
                        max="45E-20"
                        step="1E-20"
                    ></input>
                </div>

                <div className="variable-group">
                    <div className="variable-title">Set A2</div>
                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setA2(Number(event.target.value))
                        }
                        value={A2}
                        step="1E-20"
                        min="3.5E-20"
                        max="45E-20"
                    ></input>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setA2(Number(event.target.value))
                        }
                        value={A2}
                        min="3.5E-20"
                        max="45E-20"
                        step="1E-20"
                    ></input>
                </div>

                <div className="variable-group">
                    <div className="variable-title">Set T</div>
                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setT(Number(event.target.value))
                        }
                        value={T}
                        step="1"
                        min="0"
                        max="100"
                    ></input>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setT(Number(event.target.value))
                        }
                        value={T}
                        min="0"
                        max="100"
                        step="1"
                    ></input>
                </div>

                <div className="variable-group">
                    <div className="variable-title">Set A_S</div>

                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setA_S(Number(event.target.value))
                        }
                        value={A_S}
                        step="1E-20"
                        min="3.5E-20"
                        max="8E-20"
                    ></input>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setA_S(Number(event.target.value))
                        }
                        value={A_S}
                        min="3.5E-20"
                        max="8E-20"
                        step="1E-21"
                    ></input>
                </div>
                <div>
                    <button className="reset" onClick={() => handleReset()}>
                        Reset
                    </button>
                </div>
            </div>            
        </div>
    );
};

export default VanDerWaals;
