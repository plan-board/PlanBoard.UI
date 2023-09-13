import React from "react";
import { useEffect, useState } from "react";

import CommonTopSales from "../components/CommonTopSales";
import { useSelector } from "react-redux";
import ZoneDropDown from "../components/ZoneDropDown";
import DepoSelectionBox from "../components/DepoSelectionBox";

import NationalZoneMonthSale from "../components/NationalZoneMonthSale";
import DepoMonthWiseSalesReport from "../components/DepoMonthWiseSalesReport";
import TerritoryMonthWiseSalesReport from "../components/TerritoryMonthWiseSalesReport"; 
import TerritorySelectionBox from "../components/TerritorySelectionBox"; 
import DealerMonthSale from "../components/DealerMonthSale";

const National = () => {
  const { AuthData } = useSelector((state) => state.auth);
  // console.log("====auth====", AuthData);
  // Set Select Zone
  const [selectedZone, setSelectedZone] = useState(0);
  const [selectedZoneDrop, setSelectedZoneDrop] = useState(
    AuthData?.Zone[0].ZoneID ? AuthData?.Zone[0].ZoneID : 0
  );
  const [filteredZones, setFilteredZones] = useState([]);
  const [filteredZonesData, setFilteredZonesData] = useState([]);
  // console.log(
  //   "🚀 ~ file: National.jsx:27 ~ National ~ filteredZonesData:",
  //   filteredZonesData
  // );
  const [data, setData] = useState(null);
  // console.log("🚀 ~ file: National.jsx:28 ~ National ~ id:", data);

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
    // console.log("45-setselectedTerritory", newValue);
  };

  const onSelectedDepoChange = (newValue) => {
    // console.log("79-onSelectedDepoChange", newValue);

    setSelectedDepot(newValue);
  };

  return (
    <div className="main">
      <div className="w3-row">
        <span className="main-title">Shalimar Paints Limited</span>
      </div>

      <CommonTopSales actionType="hod" selectedZone={0} />
      <div id="Wgt_Zone_Id" className="card-box">
        <h4>Zone Wise Monthly Plan / Achievement</h4>
        <div className="tbl-container">
          <NationalZoneMonthSale selectedZone={selectedZone} />
        </div>
      </div>
      <div className="w3-clear w3-padding-16"> </div>

      <div class="card-box">
        <div className="w3-bar tab-container">
          <div
            className={
              toggleState === 1
              ? "w3-button tab tab-active"
              : "w3-button tab"
            }
            onClick={() => toggleTab(1)}
          >
            <span className="h6"> Depot Monthly Plan </span>
          </div>
          <div
            className={
              toggleState === 2
              ? "w3-button tab tab-active"
              : "w3-button tab"
            }
            onClick={() => toggleTab(2)}
          >
            <span className="h6"> Territory Monthly Plan </span>
          </div>
          <div
            className={
              toggleState === 3
              ? "w3-button tab tab-active"
              : "w3-button tab"
            }
            onClick={() => toggleTab(3)}
          >
            <span className="h6"> Dealer Monthly Plan </span>
          </div>
        </div>
        <div class="tbl-container">
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
              <h3>Depot Wise Monthly Plan / Achievement</h3>
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
              <h3>Territory Wise Monthly Plan / Achievement</h3>
            </div>
            <TerritoryMonthWiseSalesReport selectedDepot={selectedDepot} />
          </div>
          <div
            className={toggleState === 3 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(3)}
          >
            <div>
              <h3>Dealer Wise Monthly Plan / Achievement</h3>
            </div> 
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
