import { ChangeEvent, useState } from "react";
import Plot from "react-plotly.js";
import {
    getGraphConfig,
    linspace,
    widthAndHeightPropertyForGraph,
} from "../helperFunctions";
import { ModelProps } from "../types/generalTypes";
import LogarithmicRange from "./LogarithmicRange";

const DLVO = ({ containerRef }: ModelProps) => {

  // #Adjustable Parameters:
  const [C0, setC0] = useState(0.001) //#mol/L (electrolyte concentration) Limits: 0.001 to 0.1 mol/L
  const [r, setR] = useState(60E-9) //#m (radius of sphere) Limits (5E-9 to 5E-5 m)
  const [A1, setA1] = useState(8.6E-20) //#J (Hamaker constant of sphere 1) Limits (3.5E-20 to 45E-20)
  const [A2, setA2] = useState(8.6E-20) //#J (Hamaker constant of sphere 2) Limits (3.5E-20 to 45E-20)
  const [A_S, setA_S] = useState(4.35E-20) //#J (Hamaker constant of solvent) Limits (3.5E-20 to 8E-20)
  const [T, setT] = useState(25) //#degrees C (Temperature) Limits (0 to 100)
  const [Psi_d, setPsi_d] = useState(0.018) //#V (Surface Potential) Limits: 0 - 0.025

  // #Fixed Parameters
  const d = linspace(1E-10,1E-7,1001)
  // const T_K = T + 273.15
  const kB = 1.38E-23 //#J/K
  const eps0 = 8.854E-12 //#C^2 J^-1 m^-1
  const epsr = 78
  const e0 = 1.602E-19 //#C
  const NA = 6.022E23 //#mol^-1

  // #Calculate combined Hamaker constant
  const A_C = (A2**(1/2)-A_S**(1/2))*(A1**(1/2)-A_S**(1/2))

  // #vdW Model
  // const VA = d.map((item) => -A_C/(12*item)*r)
  
  // #Electrostatic Model
  const K = (2000*e0**2*NA*C0/(eps0*epsr*kB*T))**(1/2)
  
  const y_VA_norm = d.map((item) => -A_C/(12*item)*r/(kB*T))
  const y_VR_norm = (K*r < 4) ? d.map((item) => 2*Math.PI*r*eps0*epsr*Psi_d**2*Math.exp(-K*item)/(kB*T)) : d.map((item) => 2*Math.PI*r*eps0*epsr*Psi_d**2*Math.log(1 + Math.exp(-K*item))/(kB*T))
  const y_VA_norm_VR_norm = (K*r < 4) ? d.map((item) => (-A_C/(12*item)*r/(kB*T)) + 2*Math.PI*r*eps0*epsr*Psi_d**2*Math.exp(-K*item)/(kB*T)) : d.map((item) => (-A_C/(12*item)*r/(kB*T)) + (2*Math.PI*r*eps0*epsr*Psi_d**2*Math.log(1 + Math.exp(-K*item))/(kB*T)))

  const x = d.map((item) => item * 1E9)

  document.title = "DLVO - Combining Interactions"

  const handleReset = () => {
    setC0(0.001)
    setR(60E-9)
    setA1(8.6E-20)
    setA2(8.6E-20)
    setA_S(4.35E-20)
    setT(25)
    setPsi_d(0.018)
  }


  return (

    <div className="graph-container">

      <Plot
        config={getGraphConfig()}
        className="graph"
        data={[
          {
            x: x,
            y: y_VR_norm,
            type: 'scatter',
            marker: { color: 'orange'},
            name: "V<sub>R</sub>",
            line: {
              width: 1.5,
              dash: 'dash'
            }
          },
          {
            x: x,
            y: y_VA_norm,
            type: 'scatter',
            marker: {color: 'blue'},
            name: "V<sub>A</sub>",
            line: {
              width: 1.5,
              dash: 'dash'
            }
          },
          {
            x: x,
            y: y_VA_norm_VR_norm,
            type: 'scatter',
            marker: {color: 'black'},
            name: "V<sub>T</sub>",
            line: {
              width: 1.5
            }
          }
        ]}
        layout={{...widthAndHeightPropertyForGraph(containerRef),
          title: "DLVO - Combining Interactions",
          xaxis: {
            range: [0, 30],
            rangemode: 'normal',
            title: {text: "Separation Distance (nm)"}
          },
          yaxis: {
            range: [-60, 60],
            rangemode: 'normal',
            title: {text: 'V/kBT (-)'}
          },
          shapes: [
            {
              type: 'line',
              x0: 0,
              y0: -10,
              x1: 30,
              y1: -10,
              line: {
                color: 'black',
                width: 1.5,
                dash: 'dot'
              }
            },
            {
              type: 'line',
              x0: 0,
              y0: 10,
              x1: 30,
              y1: 10,
              line: {
                color: 'black',
                width: 1.5,
                dash: 'dot'
              }
            },
            {
              type: 'line',
              x0: 0,
              y0: -60,
              x1: 30,
              y1: -60,
              line: {
                color: 'black',
                width: 1.5
              }
            }
          ]
        }}
      />
      <div className="variables-container">
        <div className="variable-group">
          <div className="variable-title">Set C0</div>
          <input
            value={C0}
            className="variable-counter"
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setC0(Number(event.target.value))}
            min="0.001"
            max="0.1"
            step="0.001"/>
          <LogarithmicRange  primaryValue={C0} setPrimaryValue={setC0} minpos={0} maxpos={100} minval={0.001} maxval={0.1} fixedPlaces={4}/>
        </div>
        <div className="variable-group">
        <div className="variable-title"> Set r</div>
        <input
          value={r}
          className="variable-counter"
          type="number"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setR(Number(event.target.value))}></input>
        <LogarithmicRange primaryValue={r} setPrimaryValue={setR} minpos={0} maxpos={100} minval={1e-9} maxval={1e-6} fixedPlaces={9} />
        </div>
        <div className="variable-group">
          <div className="variable-title">Set A1</div>
          <input 
            value={A1}
            className="variable-counter"
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setA1(Number(event.target.value))}
            min="3.5E-20"
            max="45E-20"
            step="1E-20"/>
          <input 
            className="variable-slider"
            type='range'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setA1(Number(event.target.value))}
            value={A1}
            min="3.5E-20"
            max="45E-20"
            step="1E-20"/>
        </div>
        <div className="variable-group">
          <div className="variable-title">Set A2</div>
          <input 
            value={A2}
            className="variable-counter"
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setA2(Number(event.target.value))}
            min="3.5E-20"
            max="45E-20"
            step="1E-20"/>
          <input 
            className="variable-slider"
            type='range'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setA2(Number(event.target.value))}
            value={A2}
            min="3.5E-20"
            max="45E-20"
            step="1E-20"/>
        </div>
        <div className="variable-group">
          <div className="variable-title">Set A_S</div>
          <input 
            value={A_S}
            className="variable-counter"
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setA_S(Number(event.target.value))}
            min="3.5E-20"
            max="8E-20"
            step="1E-21"/>
          <input 
            className="variable-slider"
            type='range'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setA_S(Number(event.target.value))}
            value={A_S}
            min="3.5E-20"
            max="8E-20"
            step="1E-21"/>
        </div>
        <div className="variable-group">
          <div className="variable-title">Set T</div>
          <input 
            value={T}
            className="variable-counter"
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setT(Number(event.target.value))}
            min="0"
            max="100"
            step="1"/>
          <input 
            className="variable-slider"
            type='range'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setT(Number(event.target.value))}
            value={T}
            min="0"
            max="100"
            step="1"/>
        </div>
        <div className="variable-group">
          <div className="variable-title">Set Psi_d</div>
          <input 
            value={Psi_d}
            className="variable-counter"
            type="number"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPsi_d(Number(event.target.value))}
            min="0"
            max="0.025"
            step="0.0001"/>
          <input 
            className="variable-slider"
            type='range'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPsi_d(Number(event.target.value))}
            value={Psi_d}
            min="0"
            max="0.025"
            step="0.0001"/>
        </div>

        <button className="reset" onClick={() => handleReset()}>Reset</button>
      </div>


    </div>
  )


}


export default DLVO