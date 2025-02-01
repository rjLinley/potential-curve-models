import Plot from "react-plotly.js";
import { ChangeEvent, useState, useEffect } from "react";
import { linspace } from "../helperFunctions";

const IonGradients = () => {

  // #Adjustable Model Parameters
  const C0 = 0.001 //mol/L (electrolyte concentration) Limits: 0.001 to 0.1 mol/L
  const Psi0 = 0.1 //V (surface potential) Limits: 10 to 300 mV
  const z = 1 //(charge of ion) Limits: 1, 2 (discrete values)

  // #Fixed Model Parameters
  const kB = 1.38E-23 //J/K
  const T = 298.15 //degrees C
  const eps0 = 8.854E-12 //C^2 J^-1 m^-1
  const epsr = 82
  const e0 = 1.602E-19 //C
  const NA = 6.022E23 //mol^-1
  const d = linspace(0,50E-9,1001)

  // #Calculate screening wavenumber (K = 1/L_D)
  const K = (2000*e0**2*NA*C0/(eps0*epsr*kB*T))**(1/2)

// #Calculate exact model
  // const Psi_E = 4*kB*T/(z*e0)*Math.atanh(Math.tanh(z*e0*Psi0/(4*kB*T))*Math.exp(-K*item))

  // #Calculate ion concentrations
  const y_C_P = d.map((item) => C0*Math.exp(-z*e0*(4*kB*T/(z*e0)*Math.atanh(Math.tanh(z*e0*Psi0/(4*kB*T))*Math.exp(-K*item)))/(kB*T)) * 1000)
  const y_C_N = d.map((item) => C0*Math.exp(z*e0*(4*kB*T/(z*e0)*Math.atanh(Math.tanh(z*e0*Psi0/(4*kB*T))*Math.exp(-K*item)))/(kB*T)) * 1000)

  const x = d.map((item) => item * 1E9)


  return (
    <div>
      <div>
        <div className="graph-container">
          <Plot className="graph" data={[{
            x: x,
            y: y_C_P,
            type: 'scatter',
            marker: {color: 'teal'},
            name: 'Cation Concentration'
          }, {
            x: x,
            y: y_C_N,
            type: 'scatter',
            marker: {color: 'orange'},
            name: 'Anion Concentration'

          }]}
          layout={{width: screen.width * .5, height: screen.height * .5, title: 'Ion Gradients at the EDL',
            xaxis: {range: [0,50], rangemode: "normal", title: {text: "Separation Distance (nm)"}},
            yaxis: {range: [0.0, 3.0], rangemode: "normal", title: {text: "Concentration (mmol/L)"}},
            shapes: [{
              type: 'line',
              x0: 0,
              y0: 1.0,
              x1: 50,
              y1: 1.0,
              label: {
                text: 'C<sub>0</sub>',
                textposition: "start",
                padding: 8
              },

              line: {
                color: 'black',
                width: 1.5,
                dash: 'dot'
              }
            },
            {
              type: 'line',
              x0: 10,
              y0: 0,
              x1: 10,
              y1: 3,
              label: {
                text: '\u03bb<sub>D</sub>',
                textangle: 0,                
                xanchor: "left",
                textposition: "start",
                padding: 12                
              },
              line: {
                color: 'black',
                width: 1.5,
                dash: 'dot'
              }

            }]
           }}/>
        </div>
      </div>
    </div>
  )

}

export default IonGradients;