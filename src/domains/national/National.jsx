import React from "react";
import { useEffect, useState } from "react";

import CommonTopSales from "../components/CommonTopSales";
import { useSelector } from "react-redux";
import ZoneDropDown from "../components/ZoneDropDown";
import DepoSelectionBox from "../components/DepoSelectionBox";

import NationalZoneMonthSale from "../components/NationalZoneMonthSale";
import DepoMonthWiseSalesReport from "../components/DepoMonthWiseSalesReport";
import TerritoryMonthWiseSalesReport from "../components/TerritoryMonthWiseSalesReport";
import TerritoryMonthSale from "../components/TerritoryMonthSale";
import TerritorySelectionBox from "../components/TerritorySelectionBox";
import Wgt_Delear_Ui from "../territory/Wgt_Delear_Ui";
import DealerMonthSale from "../components/DealerMonthSale";

const National = () => {
  const { AuthData } = useSelector((state) => state.auth);
  console.log("====auth====", AuthData);
  // Set Select Zone
  const [selectedZone, setSelectedZone] = useState(0);
  const [selectedZoneDrop, setSelectedZoneDrop] = useState(
    AuthData?.Zone[0].ZoneID ? AuthData?.Zone[0].ZoneID : 0
  );
  const [filteredZones, setFilteredZones] = useState([]);
  const [filteredZonesData, setFilteredZonesData] = useState([]);
  console.log(
    "🚀 ~ file: National.jsx:27 ~ National ~ filteredZonesData:",
    filteredZonesData
  );
  const [data, setData] = useState(null);
  console.log("🚀 ~ file: National.jsx:28 ~ National ~ id:", data);

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleSelectionChange = (newValue) => {
    setSelectedZone(newValue);
  };

  const handleSelectionChangeDrop = (newValue) => {
    setSelectedZoneDrop(newValue);
  };

  const [selectedTerritory, setSelectedTerritory] = useState(0);
  const [selectedDepot, setSelectedDepot] = useState(0);

  const onSelectedTerritoryChange = (newValue) => {
    setSelectedTerritory(newValue);
    console.log("45-setselectedTerritory", newValue);
  };

  const onSelectedDepoChange = (newValue) => {
    console.log("79-onSelectedDepoChange", newValue);

    setSelectedDepot(newValue);
  };

  return (
    <div className=" main ">
      <div className="w3-clear w3-padding-16"></div>

      <div className="w3-row ">
        <span className="w3-large">Shalimar Paints Limited</span>
      </div>

      <CommonTopSales actionType="hod" selectedZone={0} />

      <div
        id="Wgt_Zone_Id"
        className=" w3-leftbar w3-border-red Wgt_Zone_Class w3-row w3-row-padding w3-margin-bottom w3-white "
      >
        <NationalZoneMonthSale selectedZone={selectedZone} />
      </div>
      <div className="w3-clear w3-padding-16"> </div>

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
            <span className=" h6  w3-text-gray "> Depot Monthly Plan </span>
          </div>
          <div
            className={
              toggleState === 2
                ? " w3-bar-item w3-button  w3-white  w3-hover-white "
                : " w3-bar-item w3-button w3-gray w3-hover-white "
            }
            onClick={() => toggleTab(2)}
          >
            <span className=" h6  w3-text-gray "> Territory Monthly Plan </span>
          </div>
          <div
            className={
              toggleState === 3
                ? " w3-bar-item w3-button  w3-white  w3-hover-white "
                : " w3-bar-item w3-button w3-gray w3-hover-white "
            }
            onClick={() => toggleTab(3)}
          >
            <span className=" h6 w3-text-gray "> Dealer Monthly Plan </span>
          </div>
        </div>
        <div class="w3-row w3-padding ">
          <div>
            <div className="w3-row">
              {toggleState === 1 || toggleState === 2 || toggleState === 3 ? (
                <div className="w3-col l3 m4 s6">
                  <ZoneDropDown
                    selectedZone={selectedZoneDrop}
                    onValueChange={handleSelectionChangeDrop}
                  />
                </div>
              ) : null}

              {toggleState === 2 || toggleState === 3 ? (
                <div className="w3-col l3 m4 s6">
                  <DepoSelectionBox
                    selectedZone={selectedZoneDrop}
                    selectedDepot={selectedDepot}
                    onSelectedDepoChange={onSelectedDepoChange}
                  />
                </div>
              ) : null}

              {toggleState === 3 ? (
                <div className="w3-col l3 m4 s6">
                  <TerritorySelectionBox
                    selectedZone={selectedZoneDrop}
                    selectedDepot={selectedDepot}
                    selectedTerritory={selectedTerritory}
                    onSelectedTerritoryChange={onSelectedTerritoryChange}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="w3-clear w3-padding-16"> </div>
          <div
            className={toggleState === 1 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(1)}
          >
            <div>
              <h3>Depot Month Wise Report</h3>
            </div>
            <DepoMonthWiseSalesReport
              selectedZone={selectedZoneDrop}
              selectedDepot={0}
            />
          </div>
          <div
            className={toggleState === 2 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(2)}
          >
            <div>
              <h3>Territory Month Wise Report</h3>
            </div>
            <TerritoryMonthWiseSalesReport selectedDepot={selectedDepot} />
          </div>
          <div
            className={toggleState === 3 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(3)}
          >
            <div>
              <h3>Dealer Month Wise Report</h3>
            </div>
            {/* {selectedTerritory ? (<Wgt_Delear_Ui data={selectedTerritory} />) : (<div>Please select a territory</div>)} */}
            {selectedTerritory ? (
              <DealerMonthSale selectedTerritory={selectedTerritory} />
            ) : (
              <div>Please select a territory</div>
            )}
          </div>
        </div>
      </div>

      <div className="w3-clear w3-padding-16"></div>
    </div>
  );
};
export default National;
