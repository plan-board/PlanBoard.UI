import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FocusSectorMaster from "./Components/FocusSectorMaster";


const Settings = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="main  w3-border">

      <div class="w3-row w3-padding-16"></div>

      <div class="w3-row w3-white w3-border w3-border-gray">
        <div className="w3-bar w3-gray">
          <div
            className={
              toggleState === 1
                ? " w3-bar-item w3-button w3-white  w3-hover-white  "
                : " w3-bar-item w3-button w3-gray  w3-hover-white  "
            }
            onClick={() => toggleTab(1)}
          >
            <span className=" h6  w3-text-gray "> <i className="fa fa-gear" ></i> Focus Sector Master  </span>
          </div>
          <div
            className={
              toggleState === 2
                ? " w3-bar-item w3-button  w3-white  w3-hover-white "
                : " w3-bar-item w3-button w3-gray w3-hover-white "
            }
            onClick={() => toggleTab(2)}
          >
            <span className=" h6  w3-text-gray "> <i className="fa fa-gear" ></i>  </span>
          </div>
          <div
            className={
              toggleState === 3
                ? " w3-bar-item w3-button  w3-white  w3-hover-white "
                : " w3-bar-item w3-button w3-gray w3-hover-white "
            }
            onClick={() => toggleTab(3)}
          >
            <span className=" h6 w3-text-gray "> <i className="fa fa-gear" ></i> </span>
          </div>
        </div>
        <div class="w3-row w3-padding ">
          <div
            className={toggleState === 1 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(1)}
          >
            <FocusSectorMaster />
          </div>
          <div
            className={toggleState === 2 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(2)}
          >

          </div>
          <div
            className={toggleState === 3 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(3)}
          ></div>
        </div>
      </div>

    </div>
  )
}

export default Settings