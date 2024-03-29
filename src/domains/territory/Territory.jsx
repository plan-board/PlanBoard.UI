import { useEffect, useState, useRef } from "react";

import Wgt_Delear_Ui from "./Wgt_Delear_Ui";

import Wgt_Delear_Weekly_Ui from "./Wgt_Delear_Weekly_Ui";

import CommonTopSales from "../components/CommonTopSales";
import { useSelector } from "react-redux";
import ZoneSelectionBox from "../components/ZoneSelectionBox";
import DepoSelectionBox from "../components/DepoSelectionBox";
import TerritorySelectionBox from "../components/TerritorySelectionBox";
import { useParams } from "react-router";
import TerritoryMonthSale from "../components/TerritoryMonthSale";
import CustomPopup from "../CustomPopup";
import DelearActivityPlan from "./DelearActivityPlan";
import AllFigureText from "../components/AllFigureText";
import PainterMeet from "./PainterMeet";
import { DealarPopup } from "./newDealerPopup";
const Territory = () => {
  const { AuthData } = useSelector((state) => state.auth);
  let Wgt_DelearUiGridInstance = useRef();
  const { zoneId, depotId, territoryId } = useParams();
  const flag = useSelector((state) => state.sidebarStatus.flag);

  const [selectedZone, setSelectedZone] = useState(
    zoneId ?? (AuthData?.Zone[0]?.ZoneID ? AuthData?.Zone[0]?.ZoneID : 0)
  );
  const [selectedDepot, setSelectedDepot] = useState(
    depotId
      ? depotId
      : AuthData?.Depot[0]?.DepotID
      ? AuthData?.Depot[0]?.DepotID
      : 0
  );
  const [selectedTerritory, setSelectedTerritory] = useState(territoryId ?? 0);

  const [toggleState, setToggleState] = useState(1);
  const [visibilityForPopup, setVisibilityForPopup] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleSelectionChange = (newValue) => {
    setSelectedZone(newValue);
    console.log("45-selectedZone", selectedZone);
  };

  const onSelectedDepoChange = (newValue) => {
    setSelectedDepot(newValue);
    console.log("45-setSelectedDepo", selectedDepot);
  };

  const onSelectedTerritoryChange = (newValue) => {
    setSelectedTerritory(newValue);
    console.log("45-setselectedTerritory", newValue);
  };
  const handleDealerPopup = () => {
    setVisibilityForPopup(true);
  };
  const handleCloseDealerPopup = () => {
    setVisibilityForPopup(false);
  };

  return (
    <div className="main" style={{ marginLeft: flag ? "150px" : "0px" }}>
      <div className="w3-row">
        <span className="main-title">
          Shalimar Paints Limited <AllFigureText />
        </span>
      </div>
      <div className="card-box lightblue">
        {AuthData?.Data[0].EmployeeTpye === "HOD" ||
        AuthData?.Data[0].EmployeeTpye === "ZM" ? (
          <div className="row w-100">
            <div className="one-fourth">
              <ZoneSelectionBox
                selectedZone={selectedZone}
                onValueChange={handleSelectionChange}
              />
            </div>
            <div className="one-fourth">
              <DepoSelectionBox
                selectedDepot={selectedDepot}
                selectedZone={selectedZone}
                onSelectedDepoChange={onSelectedDepoChange}
              />
            </div>
            <div className="one-fourth">
              <TerritorySelectionBox
                selectedZone={selectedZone}
                selectedDepot={selectedDepot}
                selectedTerritory={selectedTerritory}
                onSelectedTerritoryChange={onSelectedTerritoryChange}
              />
            </div>
          </div>
        ) : AuthData?.Data[0].EmployeeTpye === "DM" ? (
          <div className="row w-100">
            <div className="one-fourth">
              <DepoSelectionBox
                selectedZone={selectedZone}
                selectedDepot={selectedDepot}
                onSelectedDepoChange={onSelectedDepoChange}
              />
            </div>
            <div className="one-fourth">
              <TerritorySelectionBox
                selectedZone={selectedZone}
                selectedDepot={selectedDepot}
                onSelectedDepoChange={onSelectedDepoChange}
                onSelectedTerritoryChange={onSelectedTerritoryChange}
              />
            </div>
          </div>
        ) : AuthData?.Data[0].EmployeeTpye === "AM" ? (
          <div className="one-fourth">
            <TerritorySelectionBox
              selectedZone={selectedZone}
              selectedDepot={selectedDepot}
              onSelectedDepoChange={onSelectedDepoChange}
              onSelectedTerritoryChange={onSelectedTerritoryChange}
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <CommonTopSales
        actionType="Territory"
        selectedZone={selectedZone}
        selectedTerritory={selectedTerritory}
      />

      <div class="card-box lightblue">
        <TerritoryMonthSale selectedTerritory={selectedTerritory} />
      </div>
      <div class="card-box lightred">
        <div className="w3-bar tab-container">
          <div
            className={
              toggleState === 1 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(1)}
          >
            <span className="h6"> Dealer Monthly Plan </span>
          </div>
          <div
            className={
              toggleState === 2 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(2)}
          >
            <span className="h6"> Dealer Weakly Plan </span>
          </div>
          {/* <div
            className={
              toggleState === 3
              ? "w3-button tab tab-active"
              : "w3-button tab"
            }
            onClick={() => toggleTab(3)}
          >
            <span className="h6"> Dealer Activity Plan </span>
          </div> */}
          {/* <div
            className={
              toggleState === 4 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(4)}
          >
            <span className="h6"> Painter Meet </span>
          </div> */}
        </div>
        <br />
        <div class="w-100">
          <div className={toggleState === 1 ? "w-100" : "w3-hide"}>
            <h3>Dealer Wise Monthly Plan / Achievement</h3>
            {selectedTerritory ? (
              <>
                {toggleState === 1 && (
                  <Wgt_Delear_Ui
                    data={selectedTerritory}
                    handleDealerPopup={handleDealerPopup}
                  />
                )}
                {/* <DealarPopup
                  visibility={visibilityForPopup}
                  handleOnClose={handleCloseDealerPopup}
                /> */}
              </>
            ) : (
              <>Select Territory</>
            )}
          </div>
          <div className={toggleState === 2 ? "w-100" : "w3-hide"}>
            <h3>Dealer Wise Weekly Plan / Achievement</h3>
            {selectedTerritory ? (
              toggleState === 2 && (
                <Wgt_Delear_Weekly_Ui data={selectedTerritory} />
              )
            ) : (
              <>Select Territory</>
            )}
          </div>
          {/* <div className={toggleState === 3 ? "  " : "w3-hide"} onClick={() => toggleTab(3)}>
            <h3>Dealer Wise Monthly Activity Plan </h3>
            {selectedTerritory ? (<DelearActivityPlan data={selectedTerritory} />) : (<>Select Territory</>)}
          </div> */}
          {/* <div className={toggleState === 4 ? "  " : "w3-hide"}>
            <h3>Painter Meet </h3>
            {selectedTerritory ? (
              <PainterMeet data={selectedTerritory} />
            ) : (
              <>Select Territory</>
            )}
          </div> */}
        </div>
      </div>

      <div class="w3-row w3-padding-16"> </div>
    </div>
  );
};

export default Territory;
