import { useState } from "react";
import { useSelector } from "react-redux";

import CommonTopSales from "../components/CommonTopSales";
import ZoneDropDown from "../components/ZoneDropDown";
import DepoMonthWiseSalesReport from "../components/DepoMonthWiseSalesReport";

const Zone = () => {
  const { AuthData } = useSelector((state) => state.auth);
  console.log("--AuthData---", AuthData)

  const [selectedZone, setSelectedZone] = useState(AuthData?.Zone[0]?.ZoneID ? AuthData?.Zone[0]?.ZoneID : 0);
  const [selectedDepot, setSelectedDepot] = useState(0);

  const handleSelectionChange = (newValue) => {
    setSelectedZone(newValue);
  };

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="main">
      <div className="w3-row">
        <span className="main-title">Shalimar Paints Limited</span>
      </div>
      <div className="card-box px-0 lightgreen">
        <div className="row justify-content-between w-100 align-items-center m-0">
          <div className="one-fourth">
            <ZoneDropDown selectedZone={selectedZone} onValueChange={handleSelectionChange} />
          </div>
          <div className="one-fourth">
            <span className="w3-small w3-text-gray w3-right" > * All figures are in Lacs (INR)  </span>
          </div>
        </div>
      </div>

      <CommonTopSales actionType="Zone" selectedZone={selectedZone} />
      <div class="card-box lightblue">
        <div className="w3-bar tab-container">
          <div className={toggleState === 1 
            ? "w3-button tab tab-active"
            : "w3-button tab"
            } onClick={() => toggleTab(1)} >
            <span className="h6" > Depots  Monthly  Plan  </span>
          </div>
        </div>
        <div class="w3-row w-100" style={{ minheight: "300px" }}>
          <div>
            <h3>Depot Wise Monthly Plan / Achievement</h3>
          </div>
          <div className={toggleState === 1 ? "  " : " w3-hide  "} onClick={() => toggleTab(1)} >
            <DepoMonthWiseSalesReport selectedZone={selectedZone} selectedDepot={selectedDepot} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Zone;
