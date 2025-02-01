import HamburgerMenu from "./hamburgerMenu";
import GuoyChapman from "./guoyChapman";
import { useState } from "react";
import VanDerWaals from "./vanDerWaals";
import IonGradients from "./ionGradients";




const Main = () => {

  const [selectedModel, setSelectedModel] = useState('Guoy Chapman');

  // let whomstToRender: any = () => {
  //   if (selectedModel == "Guoy Chapman") {
  //     return whomstToRender = <GuoyChapman/> 
  //   }


  // }
    
  return (
    <div className="grid-container">
        <div className="side-bar">
            <HamburgerMenu selectedModel={selectedModel} setSelectedModel={setSelectedModel}/>
        </div>

      <div className="main-content">
      {(() => {
        switch (selectedModel) {
          case "Guoy Chapman":   return <GuoyChapman/>;
          case "Van Der Waals": return <VanDerWaals/>;
          case "Ion Gradients":  return <IonGradients/>;
          default:      return <GuoyChapman/>;
        }
      })()}
    </div>
  
    
    </div>
  )
}

export default Main;