import Plot from "react-plotly.js";
import { linspace } from "../helperFunctions";
import { ChangeEvent, useState, useEffect } from 'react';
import { useAsyncError } from "react-router-dom";


const VanDerWaals = () => {

  // Adjustable
  const [R1, setR1] = useState(5E-9)
  // const R1 = 5E-9 //m (radius of sphere 1) Limits (5E-7 to 5E-5 m)
  const [R2, setR2] = useState(5E-9)
  // const R2 = 5E-9 //m (radius of sphere 2) Limits (5E-7 to 5E-5 m)
  const [A1, setA1] = useState(43.5E-20)
  // const A1 = 43.5E-20 //J (Hamaker constant of sphere 1) Limits (3.5E-20 to 45E-20)
  const [A2, setA2] = useState(43.5E-20)
  // const A2 = 43.5E-20 //J (Hamaker constant of sphere 2) Limits (3.5E-20 to 45E-20)
  const [A_S, setA_S] = useState(4.35E-20)
  // const A_S = 4.35E-20 //J (Hamaker constant of solvent) Limits (3.5E-20 to 8E-20)
  const [T, setT] = useState(25)
  // const T = 25 //degrees C (Temperature) Limits (0 to 100)

  // Fixed 
  const d = linspace(1E-10,1E-7,1001);
  // const T_K = T + 273.15;
  const kB = 1.38E-23 //J/K

  // #Calculate combined Hamaker constant
  const A_C = (A2**(1/2)-A_S**(1/2))*(A1**(1/2)-A_S**(1/2))

  const x = d.map((item) => item * 1E9)
  const y = d.map((item) => (-A_C/(6*item)*(R1*R2)/(R1+R2))/(kB*T))
  
  return (
    
  <div>
   <div className="graph-container">
    <Plot className="graph" data={[{
      x: x,
      y: y,
      type: 'scatter',
      marker: {color: 'teal'},
    }]}
    layout={{width: screen.width * .65, height: screen.height * .65, title: 'Van der Waals Attraction Between Two Spheres',
      xaxis: {range: [0,100], rangemode: "normal", title: {text: "Separation Distance (nm)"}},
      yaxis: {range: [-25,0], rangemode: "normal", title: {text: "V/kBT (-)"}},
      shapes: [{
        type: 'line',
        x0: 0,
        y0: -25,
        x1: 100,
        y1: -25,
        line: {
          color: 'black',
          width: 1.5
        }
      }]
     }}/>
   </div>

   <div>
    Set R1
    <input className="variable-counter" type='number' onChange={(event: ChangeEvent<HTMLInputElement>) => setR1(Number(event.target.value))} value={R1} step='0.0000001' min='0.0000005' max='0.00005'></input>
    <input className="variable-slider" type='range' onChange={(event: ChangeEvent<HTMLInputElement>) => setR1(Number(event.target.value))} value={R1} min='0.0000005' max='0.00005' step='0.0000001'></input>
   </div>

   <div>
    Set T
    <input className="variable-counter" type='number' onChange={(event: ChangeEvent<HTMLInputElement>) => setT(Number(event.target.value))} value={T} step='1' min='0' max='100'></input>
    <input className="variable-slider" type='range' onChange={(event: ChangeEvent<HTMLInputElement>) => setT(Number(event.target.value))} value={T} min='0' max='100' step='1'></input>
   </div>
  </div>
)


}


export default VanDerWaals;