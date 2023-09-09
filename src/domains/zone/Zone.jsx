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
    <div className=" main ">

      <div className="w3-row  w3-margin-bottom">
        <div className="w3-col l3 m3 s6 ">
          <ZoneDropDown selectedZone={selectedZone} onValueChange={handleSelectionChange} />
        </div>
        <div className="w3-col l3 m3 s6 w3-right ">
          <span className=" w3-small w3-text-gray w3-right" > * All figures are in Lacs (INR)  </span>
        </div>
      </div>

      <CommonTopSales actionType="Zone" selectedZone={selectedZone} />

      <div class="w3-row w3-padding-16"></div>

      <div class="w3-row w3-white w3-border w3-border-gray">
        <div className="w3-bar w3-gray ">
          <div className={toggleState === 1 ? " w3-bar-item w3-button w3-white  w3-hover-white  " : " w3-bar-item w3-button w3-gray  w3-hover-white  "} onClick={() => toggleTab(1)} >
            <span className=" h6  w3-text-gray" > Depots  Monthly  Plan  </span>
          </div>
        </div>
        <div class="w3-row w3-padding " style={{ minheight: "300px" }}>
          <div>
            <h3>Depot Month Wise Report</h3>
          </div>
          <div className={toggleState === 1 ? "  " : " w3-hide  "} onClick={() => toggleTab(1)} >
            <DepoMonthWiseSalesReport selectedZone={selectedZone} selectedDepot={selectedDepot} />
          </div>
        </div>
      </div>

      <div class="w3-row w3-padding-16"> </div>




    </div>
  );
};
export default Zone;
