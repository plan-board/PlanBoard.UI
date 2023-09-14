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
  const tabs = ['Depot Monthly Plan', 'Territory Monthly Plan', 'Dealer Monthly Plan'];

  const { AuthData } = useSelector((state) => state.auth);
  // console.log("====auth====", AuthData);
  // Set Select Zone
  const [selectedZone, setSelectedZone] = useState(0);
  const [selectedZoneDrop, setSelectedZoneDrop] = useState(
    AuthData?.Zone[0].ZoneID ? AuthData?.Zone[0].ZoneID : 0
  );
  const [filteredZones, setFilteredZones] = useState([]);
  const [filteredZonesData, setFilteredZonesData] = useState([]);

  const [data, setData] = useState(null);

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
      <div id="Wgt_Zone_Id" className="card-box lightblue">
        <h4>Zone Wise Monthly Plan / Achievement</h4>
        <div className="tbl-container">
          <NationalZoneMonthSale selectedZone={selectedZone} />
        </div>
      </div>
        {/* <div className="w3-bar w3-gray">
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
        </div> */}
        <div className="card-box lightred">
          <div className="row w-100 mb-4 mt-2">
            {toggleState === 1 || toggleState === 2 || toggleState === 3 ? (
              <div className="one-fourth">
                <ZoneDropDown
                  selectedZone={selectedZoneDrop}
                  onValueChange={handleSelectionChangeDrop}
                />
              </div>
            ) : null}

            {toggleState === 2 || toggleState === 3 ? (
              <div className="one-fourth">
                <DepoSelectionBox
                  selectedZone={selectedZoneDrop}
                  selectedDepot={selectedDepot}
                  onSelectedDepoChange={onSelectedDepoChange}
                />
              </div>
            ) : null}

            {toggleState === 3 ? (
              <div className="one-fourth">
                <TerritorySelectionBox
                  selectedZone={selectedZoneDrop}
                  selectedDepot={selectedDepot}
                  selectedTerritory={selectedTerritory}
                  onSelectedTerritoryChange={onSelectedTerritoryChange}
                />
              </div>
            ) : null}
          </div>
          {/* <div className="w3-bar tab-container">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={
                  toggleState === 1
                    ? " w3-bar-item w3-button w3-white  w3-hover-white  "
                    : " w3-bar-item w3-button w3-gray  w3-hover-white  "
                }
                  
                onClick={() => setToggleState(++index)}
              >
                {tab}
              </div>
            ))}
          </div> */}
          <div className="w3-bar tab-container">
            <div
              className={
                toggleState === 1
                  ? "w3-button tab tab-active"
                  : "w3-button tab"
              }
              onClick={() => toggleTab(1)}
            >
              <span className="h6"> Dealer Monthly Plan </span>
            </div>
            <div
              className={
                toggleState === 2
                  ? "w3-button tab tab-active"
                  : "w3-button tab"
              }
              onClick={() => toggleTab(2)}
            >
              <span className="h6"> Dealer Weakly Plan </span>
            </div>
            <div
              className={
                toggleState === 3
                  ? "w3-button tab tab-active"
                  : "w3-button tab"
              }
              onClick={() => toggleTab(3)}
            >
              <span className="h6"> Dealer Activity Plan </span>
            </div>
          </div>
          <div class="w-100"> 
          {/* <div className="table-container"> */}
            {toggleState === 1 && (
              <>
                <div>
                  <h3>Depot Wise Monthly Plan / Achievement</h3>
                </div>
                <DepoMonthWiseSalesReport
                  selectedZone={selectedZoneDrop}
                  selectedDepot={0}
                />
              </>
            )}
            {toggleState === 2 && (
              <>
                <div>
                  <h3>Territory Wise Monthly Plan / Achievement</h3>
                </div>
                <TerritoryMonthWiseSalesReport selectedDepot={selectedDepot} />
              </>
            )}
            {toggleState === 3 && (
              <>
                <div>
                  <h3>Dealer Wise Monthly Plan / Achievement</h3>
                </div>
                {selectedTerritory ? (
                  <DealerMonthSale selectedTerritory={selectedTerritory} />
                ) : (
                  <div>Please select a territory</div>
                )}
              </>
            )}
          </div>
        </div>

    </div>
  );
};
export default National;
