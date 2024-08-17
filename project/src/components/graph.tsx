import { ChangeEvent, useState } from 'react';
import Plot from 'react-plotly.js';


const Graph = () => {
  const KB = 1.380649E-23
  const T = 298 //K
  const z = 1
  const[Psi0, setPsi0] = useState(0.150) //V
  const e0 = 1.602176E-19 //C
  const Eps0 = 8.854187E-12 //F/m
  const EpsR = 78 // relative permittivity of water at 20 degrees C
  const NA = 6.02214076E23 //mol
  const [C00, setC00] = useState(0.1) //mol/L
  const C0 = C00*1000 //mol/m^3
  const Kinv = ((Eps0*EpsR*KB*T)/(e0**2*NA*2*C0))**(1/2)
  const K = Kinv**(-1)


  const linspace = (start: number, stop: number, num:number, endpoint: Boolean = true):number[] => {
      const div = endpoint ? (num - 1) : num;
      const step = (stop - start) / div;
      return Array.from({length: num}, (_, i) => start + step * i);
  }

  const kB = 8.617E-5
  const base = linspace(0, 20E-9, 1000);

  const Psix = base.map((item) => (4*kB*T/z)*Math.atanh(Math.tanh(z*Psi0/(4*kB*T))*Math.exp((-1)*K*item))*1000)

  const x = base.map((item) => item * 1E9)
  
  return (
    <div>
    <Plot
        data={[
          {
            x: x,
            y: Psix,
            type: 'scatter',
            // mode: 'lines+markers',
            marker: {color: 'teal'},
          },
          
        ]}
        layout={ {width: 760, height: 480, title: 'Guoy Chapman',
         xaxis: {range: [-1, 12], rangemode: "normal", title: {text: "Distance from Surface (nm)"}},
         yaxis: {range: [-25,300], rangemode: 'normal', title: {text: "Potential (mV)"}},
        shapes: [  {
          type: 'line',
          x0: Kinv*1E9,
          y0: 0,
          x1: Kinv*1E9,
          y1: 300,
          line: {
            color: 'black',
            width: 1.5,
            dash: 'dash'
    
          }}]} }
      />
      <div>Psi0 = {Psi0}</div>
      <div>C00 = {C00}</div>

      <div>
        Set Psi0
        <br></br>
      <input type='number' onChange={(event: ChangeEvent<HTMLInputElement>) => setPsi0(Number(event.target.value))} value={Psi0} step='0.001' min='0' max='0.5'></input> |  
      <input type='range' onChange={(event: ChangeEvent<HTMLInputElement>) => setPsi0(Number(event.target.value))} value={Psi0} min='0' max='.350' step='0.001'></input>
      </div>

      <div>
        Set C00
        <br></br>
      <input type='number' onChange={(event: ChangeEvent<HTMLInputElement>) => setC00(Number(event.target.value))} value={C00} step='0.001' min='0' max='0.5'></input> |  
      <input type='range' onChange={(event: ChangeEvent<HTMLInputElement>) => setC00(Number(event.target.value))} value={C00} min='0' max='.750' step='0.001'></input>
      </div>
      
    </div>
  )
}

export default Graph;
