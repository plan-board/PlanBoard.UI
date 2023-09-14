import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FocusSectorMaster from "./Components/FocusSectorMaster";


const Settings = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="main">
      <div className="w3-row">
        <span className="main-title">Shalimar Paints Limited</span>
      </div>
      <div class="card-box lightgreen">
        <div className="w3-bar tab-container">
          <div className={ toggleState === 1
              ? "w3-button tab tab-active"
              : "w3-button tab"
            } onClick={() => toggleTab(1)} >
            <span className="h6"> <i className="fa fa-gear" ></i> Focus Sector Master  </span>
          </div>
          <div className={ toggleState === 2
              ? "w3-button tab tab-active"
              : "w3-button tab"
            } onClick={() => toggleTab(2)} >
            <span className="h6"> <i className="fa fa-gear" ></i>  </span>
          </div>
          <div className={ toggleState === 3
              ? "w3-button tab tab-active"
              : "w3-button tab"
            } onClick={() => toggleTab(3)} >
            <span className="h6"> <i className="fa fa-gear" ></i> </span>
          </div>
        </div>
        <div class="row w-100">
          <div className="full">
            <div className={toggleState === 1 ? "  " : " w3-hide  "} onClick={() => toggleTab(1)} >
              <FocusSectorMaster />
            </div>
            <div className={toggleState === 2 ? "  " : " w3-hide  "} onClick={() => toggleTab(2)} >
            
            </div>
            <div className={toggleState === 3 ? "  " : " w3-hide  "} onClick={() => toggleTab(3)} >
            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings