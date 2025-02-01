import Plot from "react-plotly.js";
import { linspace } from "../helperFunctions";
import { ChangeEvent, useState, useEffect } from 'react';


const VanDerWaals = () => {

  // Adjustable
  const R1 = 5E-9 //m (radius of sphere 1) Limits (5E-7 to 5E-5 m)
  const R2 = 5E-9 //m (radius of sphere 2) Limits (5E-7 to 5E-5 m)
  const A1 = 43.5E-20 //J (Hamaker constant of sphere 1) Limits (3.5E-20 to 45E-20)
  const A2 = 43.5E-20 //J (Hamaker constant of sphere 2) Limits (3.5E-20 to 45E-20)
  const A_S = 4.35E-20 //J (Hamaker constant of solvent) Limits (3.5E-20 to 8E-20)
  const T = 25 //degrees C (Temperature) Limits (0 to 100)

  // Fixed 
  const d = linspace(1E-10,1E-7,1001);
  const T_K = T + 273.15;
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
      marker: {color: 'red'},
    }]}
    layout={{width: screen.width * .5, height: screen.height * .5, title: 'Van der Waals Attraction Between Two Spheres',
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
  </div>
)


}


export default VanDerWaals;