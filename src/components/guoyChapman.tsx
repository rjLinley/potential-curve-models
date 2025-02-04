import { ChangeEvent, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { linspace } from '../helperFunctions';

const GuoyChapman = () => {
  const KB = 1.380649E-23
  const T = 298 //K
  const z = 1
  const[Psi0, setPsi0] = useState(0.150) //V
  const e0 = 1.602176E-19 //C
  const Eps0 = 8.854187E-12 //F/m
  const EpsR = 78 // relative permittivity of water at 20 degrees C
  const NA = 6.02214076E23 //mol
  const [C00, setC00] = useState(0.1) //mol/L
  const [stepC00, setStepC00] = useState(0.001);
  const C0 = C00*1000 //mol/m^3
  const Kinv = ((Eps0*EpsR*KB*T)/(e0**2*NA*2*C0))**(1/2)
  const K = Kinv**(-1)
  const kB = 8.617E-5
  const base = linspace(0, 20E-9, 1000);

  const Psix = base.map((item) => (4*kB*T/z)*Math.atanh(Math.tanh(z*Psi0/(4*kB*T))*Math.exp((-1)*K*item))*1000)

  const x = base.map((item) => item * 1E9)
  
  const handleC00Change = (value: number) => {
    if (value < 0.080 && value > 0.00001) {
      setStepC00(0.0001)
    } else {
      setStepC00(0.001)
    }

    if (value <= 0) {
      setC00(0.00001)
    } 
    if (value > .750) {
      setC00(.750)
    }
    else {
      setC00(value)
    }
  }

  const handleReset = () => {
    setC00(0.1)
    setPsi0(0.150)
  }

  useEffect(() => {
    document.title = 'Guoy Chapman Visualization';
  })  

  return (
    <div>
    <div className='graph-container'>
      <Plot className='graph'
        data={[
          {
            x: x,
            y: Psix,
            type: 'scatter',
            // mode: 'lines+markers',
            marker: {color: 'teal'},
          },
          
        ]}
        layout={ {width: screen.width * .65, height: screen.height * .65, title: 'Guoy Chapman Model',
         xaxis: {range: [-1, 12], rangemode: "normal", title: {text: "Distance from Surface (nm)"}},
         yaxis: {range: [-25,300], rangemode: 'normal', title: {text: "Potential (mV)"}},
         annotations: [{
            text: `Surface potential in:<br></br>${C0.toFixed(1)} mmol/L NaCl<br></br>at ${T-273}\u00B0C in H<sub>2</sub>O`,
            x: 9,
            y: 205
         }],
        shapes: [  {
          type: 'line',
          x0: Kinv*1E9,
          y0: 0,
          x1: Kinv*1E9,
          y1: 300,
          label: {
            text: '1/\u039a',
            textangle: 0,
            xanchor: 'left',
            padding: 12
          },
          line: {
            color: 'black',
            width: 1.5,
            dash: 'dash'
          }}]} }
      />
        {/* <div className='variable-display'>
          <div>{'\u03A8'}<sub>0</sub> = {Psi0}</div>
          <div>C<sub>00</sub> = {C00}</div>
        </div> */}
      </div>
      

      <div>
        Set {'\u03A8'}<sub>0</sub>
        <br></br>
      <input className='variable-counter' type='number' onChange={(event: ChangeEvent<HTMLInputElement>) => setPsi0(Number(event.target.value))} value={Psi0.toFixed(3)} step='0.001' min='0.00001' max='0.5'></input> |  
      <input className='variable-slider' type='range' onChange={(event: ChangeEvent<HTMLInputElement>) => setPsi0(Number(event.target.value))} value={Psi0.toFixed(3)} min='0.00001' max='.350' step='0.001'></input>
      </div>

      <div>
        Set C<sub>00</sub>
        <br></br>
      <input className='variable-counter' type='number' onChange={(event: ChangeEvent<HTMLInputElement>) => handleC00Change(Number(event.target.value))} value={C00.toFixed(4)} step={stepC00} min='0.00001' max='0.5'></input> |  
      <input className='variable-slider' type='range' onChange={(event: ChangeEvent<HTMLInputElement>) => handleC00Change(Number(event.target.value))} value={C00.toFixed(4)} min='0.00001' max='.750' step={stepC00}></input>
      {/* <input className='variable-slider' type='range' onChange={(event: ChangeEvent<HTMLInputElement>) => handleC00Change(Number(event.target.value))} value={C00} min='-0.25' max='.750' step={stepC00}></input> */}
      {/*step={stepC00}  */}
      <button onClick={() => handleReset()}>Reset</button>
      </div>

      {/* <div>
        Test Slider
        <br></br>
      <input type='number' onChange={(event: ChangeEvent<HTMLInputElement>) => handleSliderChange(Number(event.target.value))} value={testValue} step={testStep} min='0' max='10'></input> |  
      <input type='range' onChange={(event: ChangeEvent<HTMLInputElement>) => handleSliderChange(Number(event.target.value))} value={testValue} min='0' max='10' step={testStep}></input>
      </div> */}
      
    </div>
  )
}

export default GuoyChapman;
