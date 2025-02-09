import Plot from "react-plotly.js";
// import { ChangeEvent, useState, useEffect } from "react";
import {
    getGraphConfig,
    linspace,
    widthAndHeightPropertyForGraph,
} from "../helperFunctions";
import { ChangeEvent, useState } from "react";
import { ModelProps } from "../types/generalTypes";
import LogarithmicRange from "./LogarithmicRange";

const IonGradients = ({ containerRef }: ModelProps) => {
    // #Adjustable Model Parameters
    const [C0, setC0] = useState(0.01);
    // const C0 = 0.001 //mol/L (electrolyte concentration) Limits: 0.001 to 0.1 mol/L
    const [Psi0, setPsi0] = useState(0.1);
    // const Psi0 = 0.1 //V (surface potential) Limits: 10 to 300 mV
    const [z, setZ] = useState(1);
    // const z = 1 //(charge of ion) Limits: 1, 2 (discrete values)

    // #Fixed Model Parameters
    const kB = 1.38e-23; //J/K
    const T = 298.15; //degrees C
    const eps0 = 8.854e-12; //C^2 J^-1 m^-1
    const epsr = 82;
    const e0 = 1.602e-19; //C
    const NA = 6.022e23; //mol^-1
    const d = linspace(0, 50e-9, 1001);

    // #Calculate screening wavenumber (K = 1/L_D)
    const K = ((2000 * e0 ** 2 * NA * C0) / (eps0 * epsr * kB * T)) ** (1 / 2);

    // #Calculate exact model
    // const Psi_E = 4*kB*T/(z*e0)*Math.atanh(Math.tanh(z*e0*Psi0/(4*kB*T))*Math.exp(-K*item))

    // #Calculate ion concentrations
    const y_C_P = d.map(
        (item) =>
            C0 *
            Math.exp(
                (-z *
                    e0 *
                    (((4 * kB * T) / (z * e0)) *
                        Math.atanh(
                            Math.tanh((z * e0 * Psi0) / (4 * kB * T)) *
                                Math.exp(-K * item)
                        ))) /
                    (kB * T)
            ) *
            1000
    );
    const y_C_N = d.map(
        (item) =>
            C0 *
            Math.exp(
                (z *
                    e0 *
                    (((4 * kB * T) / (z * e0)) *
                        Math.atanh(
                            Math.tanh((z * e0 * Psi0) / (4 * kB * T)) *
                                Math.exp(-K * item)
                        ))) /
                    (kB * T)
            ) *
            1000
    );

    const x = d.map((item) => item * 1e9);

    document.title = "Ion Gradients";

    const handleReset = () => {
        setC0(0.01)
        setPsi0(0.1)
        setZ(1)
    }

    return (
        <div className="graph-container">
            <Plot
                config={getGraphConfig()}
                className="graph"
                data={[
                    {
                        x: x,
                        y: y_C_P,
                        type: "scatter",
                        marker: { color: "teal" },
                        name: "Cation Concentration",
                    },
                    {
                        x: x,
                        y: y_C_N,
                        type: "scatter",
                        marker: { color: "orange" },
                        name: "Anion Concentration",
                    },
                ]}
                layout={{
                    ...widthAndHeightPropertyForGraph(containerRef),
                    title: "Ion Gradients at the EDL",
                    xaxis: {
                        range: [0, 15],
                        rangemode: "normal",
                        title: { text: "Separation Distance (nm)" },
                    },
                    yaxis: {
                        range: [0.0, 200],
                        rangemode: "normal",
                        title: { text: "Concentration (mmol/L)" },
                    },
                    shapes: [
                        {
                            type: "line",
                            x0: 0,
                            y0: C0 * 1000,
                            x1: 50,
                            y1: C0 * 1000,
                            label: {
                                text: "C<sub>0</sub>",
                                textposition: "start",
                                padding: 8,
                            },

                            line: {
                                color: "black",
                                width: 1.5,
                                dash: "dot",
                            },
                        },
                        {
                            type: "line",
                            x0: (1 / K) * 1e9,
                            y0: 0,
                            x1: (1 / K) * 1e9,
                            y1: 200,
                            label: {
                                text: "\u03bb<sub>D</sub>",
                                textangle: 0,
                                xanchor: "left",
                                textposition: "start",
                                padding: 12,
                            },
                            line: {
                                color: "black",
                                width: 1.5,
                                dash: "dot",
                            },
                        },
                    ],
                }}
            />
            <div className="variables-container">
                <div className="variable-group">
                    <div className="variable-title">Set C0</div>
                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setC0(Number(event.target.value))
                        }
                        value={C0}
                        step="0.0001"
                        min="0.01"
                        max="0.1"
                    ></input>
                     <LogarithmicRange primaryValue={C0} setPrimaryValue={setC0} minpos={0} maxpos={100} minval={0.01} maxval={0.1} fixedPlaces={3}/>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setC0(Number(event.target.value))
                        }
                        value={C0}
                        min="0.01"
                        max="0.1"
                        step="0.0001"
                    ></input>
                </div>

                <div className="variable-group">
                    <div className="variable-title">Set Psi0</div>
                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setPsi0(Number(event.target.value))
                        }
                        value={Psi0}
                        step="0.001"
                        min="0.001"
                        max="0.1"
                    ></input>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setPsi0(Number(event.target.value))
                        }
                        value={Psi0}
                        min="0.001"
                        max="0.1"
                        step="0.001"
                    ></input>
                </div>

                <div className="variable-group">
                    <div className="variable-title">Set z</div>
                    <input
                        className="variable-counter"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setZ(Number(event.target.value))
                        }
                        value={z}
                        step="1"
                        min="1"
                        max="2"
                    ></input>
                    <input
                        className="variable-slider"
                        type="range"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setZ(Number(event.target.value))
                        }
                        value={z}
                        min="1"
                        max="2"
                        step="1"
                    ></input>
                </div>
                    <button className="reset" onClick={() => handleReset()}>
                    Reset
                    </button>
            </div>
        </div>
    );
};

export default IonGradients;
