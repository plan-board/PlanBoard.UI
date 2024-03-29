import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FocusSectorMaster from "./Components/FocusSectorMaster";
import AllFigureText from "../components/AllFigureText";
import ZoneMaster from "./Components/ZoneMaster";
import DepotMaster from "./Components/DepotMaster";
import TerritoryMaster from "./Components/TerritoryMaster";
import EmployeeMaster from "./Components/EmployeeMaster";
import CustomerMaster from "./Components/CustomerMaster";
import { useSelector } from "react-redux";
const Settings = () => {
  const [toggleState, setToggleState] = useState(1);
  const flag = useSelector((state) => state.sidebarStatus.flag);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="main" style={{ marginLeft: flag ? "150px" : "0px" }}>
      <div className="w3-row">
        <span className="main-title">
          Shalimar Paints Limited <AllFigureText />
        </span>
      </div>
      <div class="card-box lightblue">
        <div className="w3-bar tab-container">
          <div
            className={
              toggleState === 1 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(1)}
          >
            <span className="h6">
              {" "}
              <i className="fa fa-gear"></i>
              <span style={{ fontFamily: "Nunito Sans" }}>
                {" "}
                Focus Sector Master
              </span>{" "}
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
              <i className="fa fa-gear">
                {" "}
                <span style={{ fontFamily: "Nunito Sans" }}>Zone Master</span>
              </i>{" "}
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
              <i className="fa fa-gear">
                <span style={{ fontFamily: "Nunito Sans" }}>
                  {" "}
                  Depot Master{" "}
                </span>
              </i>{" "}
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
              <i className="fa fa-gear">
                <span style={{ fontFamily: "Nunito Sans" }}>
                  {" "}
                  Territory Master
                </span>
              </i>{" "}
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
              <i className="fa fa-gear">
                <span style={{ fontFamily: "Nunito Sans" }}>
                  {" "}
                  Employee Master
                </span>
              </i>{" "}
            </span>
          </div>
          <div
            className={
              toggleState === 6 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(6)}
          >
            <span className="h6">
              {" "}
              <i className="fa fa-gear">
                <span style={{ fontFamily: "Nunito Sans" }}>
                  {" "}
                  Customer Master
                </span>
              </i>{" "}
            </span>
          </div>
        </div>
        <div class="row w-100">
          <div className="full">
            <div
              className={toggleState === 1 ? "  " : " w3-hide  "}
              onClick={() => toggleTab(1)}
            >
              {toggleState === 1 && <FocusSectorMaster />}
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
            <div
              className={toggleState === 6 ? "  " : " w3-hide  "}
              onClick={() => toggleTab(6)}
            >
              {toggleState === 6 && (
                <CustomerMaster toggleState={toggleState} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
