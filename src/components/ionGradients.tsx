import Plot from "react-plotly.js";
import { ChangeEvent, useState, useEffect } from "react";

const IonGradients = () => {

  return (
    <div>
      <div>
        <div className="graph-container">
          <Plot className="graph" data={[{
            x: 10,
            y: 10,
            type: 'scatter',
            marker: {color: 'red'},
          }]}
          layout={{width: screen.width * .5, height: screen.height * .5, title: 'Ion Gradients at the EDL' }}/>
        </div>
      </div>
    </div>
  )

}

export default IonGradients;