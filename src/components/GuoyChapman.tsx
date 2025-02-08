import { ChangeEvent, useState } from "react";
import Plot from "react-plotly.js";
import {
    getGraphConfig,
    linspace,
    widthAndHeightPropertyForGraph,
} from "../helperFunctions";
import { ModelProps } from "../types/generalTypes";
import LogarithmicRange from "./LogarithmicRange";

const GuoyChapman = ({ containerRef }: ModelProps) => {
    const KB = 1.380649e-23;
    const T = 298; //K
    const z = 1;
    const [Psi0, setPsi0] = useState(0.15); //V
    const e0 = 1.602176e-19; //C
    const Eps0 = 8.854187e-12; //F/m
    const EpsR = 78; // relative permittivity of water at 20 degrees C
    const NA = 6.02214076e23; //mol
    const [C00, setC00] = useState(0.1); //mol/L
    const [stepC00, setStepC00] = useState(0.001);
    const C0 = C00 * 1000; //mol/m^3
    const Kinv = ((Eps0 * EpsR * KB * T) / (e0 ** 2 * NA * 2 * C0)) ** (1 / 2);
    const K = Kinv ** -1;
    const kB = 8.617e-5;
    const base = linspace(0, 20e-9, 1000);

    const Psix = base.map(
        (item) =>
            ((4 * kB * T) / z) *
            Math.atanh(
                Math.tanh((z * Psi0) / (4 * kB * T)) * Math.exp(-1 * K * item)
            ) *
            1000
    );

    const x = base.map((item) => item * 1e9);

    const handleC00Change = (value: number) => {
        if (value < 0.08 && value > 0.00001) {
            setStepC00(0.0001);
        } else {
            setStepC00(0.001);
        }

        if (value <= 0) {
            setC00(0.00001);
        }
        if (value > 0.75) {
            setC00(0.75);
        } else {
            setC00(value);
        }
    };

    const handleReset = () => {
        setC00(0.1);
        setPsi0(0.15);
    };

    document.title = "Guoy Chapman Visualization";

    return (
        <div className="graph-container">
            <Plot
                config={getGraphConfig()}
                className="graph"
                data={[
                    {
                        x: x,
                        y: Psix,
                        type: "scatter",
                        // mode: 'lines+markers',
                        marker: { color: "teal" },
                    },
                ]}
                layout={{
                    ...widthAndHeightPropertyForGraph(containerRef),
                    title: "Guoy Chapman Model",
                    xaxis: {
                        range: [-1, 12],
                        rangemode: "normal",
                        title: { text: "Distance from Surface (nm)" },
                    },
                    yaxis: {
                        range: [-25, 300],
                        rangemode: "normal",
                        title: { text: "Potential (mV)" },
                    },
                    annotations: [
                        {
                            text: `Surface potential in:<br></br>${C0.toFixed(
                                1
                            )} mmol/L NaCl<br></br>at ${
                                T - 273
                            }\u00B0C in H<sub>2</sub>O`,
                            x: 9,
                            y: 205,
                        },
                    ],
                    shapes: [
                        {
                            type: "line",
                            x0: Kinv * 1e9,
                            y0: 0,
                            x1: Kinv * 1e9,
                            y1: 300,
                            label: {
                                text: "1/\u039a",
                                textangle: 0,
                                xanchor: "left",
                                padding: 12,
                            },
                            line: {
                                color: "black",
                                width: 1.5,
                                dash: "dash",
                            },
                        },
                    ],
                }}
            />
            <div className="variables-container">
                <div className="variable-group">
                    <div className="variable-title">
                        Set {'\u03A8'}<sub>0</sub>
                    </div>
                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setPsi0(Number(event.target.value))
                        }
                        value={Psi0}
                        step="0.001"
                        min="0.01"
                        max="0.5"
                    ></input>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setPsi0(Number(event.target.value))
                        }
                        value={Psi0}
                        min="0.01"
                        max=".350"
                        step="0.001"
                    ></input>
                </div>

                <div className="variable-group">
                    <div className="variable-title">
                        Set C<sub>00</sub>
                    </div>
                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleC00Change(Number(event.target.value))
                        }
                        value={C00}
                        step={0.00001}
                        min="0.00001"
                        max="0.5"
                    ></input>
                    <LogarithmicRange primaryValue={C00} setPrimaryValue={setC00} minpos={0} maxpos={100} minval={0.0001} maxval={0.5}/>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleC00Change(Number(event.target.value))
                        }
                        value={C00}
                        min="0.00001"
                        max=".50"
                        step={stepC00}
                    ></input>

                </div>
                <button className="reset" onClick={() => handleReset()}>
                    Reset
                </button>
            </div>     
        </div>
    );
};

export default GuoyChapman;
