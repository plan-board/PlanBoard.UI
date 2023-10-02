import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FocusSectorMaster from "./Components/FocusSectorMaster";
import AllFigureText from "../components/AllFigureText";
import ZoneMaster from "./Components/ZoneMaster";
import DepotMaster from "./Components/DepotMaster";
import TerritoryMaster from "./Components/TerritoryMaster";
import EmployeeMaster from "./Components/EmployeeMaster";

const Settings = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="main">
      <div className="w3-row">
        <span className="main-title">
          Shalimar Paints Limited <AllFigureText />
        </span>
      </div>
      <div class="card-box lightgreen">
        <div className="w3-bar tab-container">
          <div
            className={
              toggleState === 1 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(1)}
          >
            <span className="h6">
              {" "}
              <i className="fa fa-gear"></i> Focus Sector Master{" "}
            </span>
          </div>
          <div
            className={
              toggleState === 2 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(2)}
          >
            <span className="h6">
              {" "}
              <i className="fa fa-gear"> Zone Master</i>{" "}
            </span>
          </div>
          <div
            className={
              toggleState === 3 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(3)}
          >
            <span className="h6">
              {" "}
              <i className="fa fa-gear"> Depot Master</i>{" "}
            </span>
          </div>
          <div
            className={
              toggleState === 4 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(4)}
          >
            <span className="h6">
              {" "}
              <i className="fa fa-gear"> Territory Master</i>{" "}
            </span>
          </div>
          <div
            className={
              toggleState === 5 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(5)}
          >
            <span className="h6">
              {" "}
              <i className="fa fa-gear"> Employee Master</i>{" "}
            </span>
          </div>
        </div>
        <div class="row w-100">
          <div className="full">
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
              {toggleState === 2 && <ZoneMaster toggleState={toggleState} />}
            </div>
            <div
              className={toggleState === 3 ? "  " : " w3-hide  "}
              onClick={() => toggleTab(3)}
            >
              {toggleState === 3 && <DepotMaster toggleState={toggleState} />}
            </div>
            <div
              className={toggleState === 4 ? "  " : " w3-hide  "}
              onClick={() => toggleTab(4)}
            >
              {toggleState === 4 && (
                <TerritoryMaster toggleState={toggleState} />
              )}
            </div>
            <div
              className={toggleState === 5 ? "  " : " w3-hide  "}
              onClick={() => toggleTab(5)}
            >
              {toggleState === 5 && (
                <EmployeeMaster toggleState={toggleState} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
