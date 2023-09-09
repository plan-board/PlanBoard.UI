import { useEffect, useState } from "react";

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

const Territory = () => {
  const { AuthData } = useSelector((state) => state.auth);
  const { zoneId, depotId, territoryId } = useParams();
  console.log("🚀 ~ file: Territory.jsx:25 ~ Territory ~ depotId:", depotId);

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

  const payload = {
    Token: localStorage.getItem("access_token"),
    entity_id: 0,
  };
   
  

  return (
    <div className=" main ">
      <div className="w3-row w3-padding-16">
        {AuthData?.Data[0].EmployeeTpye === "HOD" ||
          AuthData?.Data[0].EmployeeTpye === "ZM" ? (
          <>
            <div className="w3-col l3 m3 s6">
              <ZoneSelectionBox
                selectedZone={selectedZone}
                onValueChange={handleSelectionChange}
              />
            </div>
            <div className="w3-col l3 m3 s6">
              <DepoSelectionBox
                selectedDepot={selectedDepot}
                selectedZone={selectedZone}
                onSelectedDepoChange={onSelectedDepoChange}
              />
            </div>
            <div className="w3-col l3 m3 s6">
              <TerritorySelectionBox
                selectedZone={selectedZone}
                selectedDepot={selectedDepot}
                selectedTerritory={selectedTerritory}
                onSelectedTerritoryChange={onSelectedTerritoryChange}
              />
            </div>
          </>
        ) : AuthData?.Data[0].EmployeeTpye === "DM" ? (
          <>
            <div className="w3-col l3 m3 s6">
              <DepoSelectionBox
                selectedZone={selectedZone}
                selectedDepot={selectedDepot}
                onSelectedDepoChange={onSelectedDepoChange}
              />
            </div>
            <div className="w3-col l3 m3 s6">
              <TerritorySelectionBox
                selectedZone={selectedZone}
                selectedDepot={selectedDepot}
                onSelectedDepoChange={onSelectedDepoChange}
                onSelectedTerritoryChange={onSelectedTerritoryChange}
              />
            </div>
          </>
        ) : AuthData?.Data[0].EmployeeTpye === "AM" ? (
          <div className="w3-col l3 m3 s6">
            <TerritorySelectionBox
              selectedZone={selectedZone}
              selectedDepot={selectedDepot}
              onSelectedDepoChange={onSelectedDepoChange}
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

      <TerritoryMonthSale selectedTerritory={selectedTerritory} />

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
            <span className=" h6  w3-text-gray "> Dealer Monthly Plan </span>
          </div>
          <div
            className={
              toggleState === 2
                ? " w3-bar-item w3-button  w3-white  w3-hover-white "
                : " w3-bar-item w3-button w3-gray w3-hover-white "
            }
            onClick={() => toggleTab(2)}
          >
            <span className=" h6  w3-text-gray "> Dealer Weakly Plan </span>
          </div>
          <div
            className={
              toggleState === 3
                ? " w3-bar-item w3-button  w3-white  w3-hover-white "
                : " w3-bar-item w3-button w3-gray w3-hover-white "
            }
            onClick={() => toggleTab(3)}
          >
            <span className=" h6 w3-text-gray "> Dealer Activity Plan </span>
          </div>
        </div>
        <div class="w3-row w3-padding ">
          <div
            className={toggleState === 1 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(1)}
          >
            <div>
            <h3>Delaer Month Wise Report</h3>
          </div>
            {selectedTerritory ? (<Wgt_Delear_Ui data={selectedTerritory} />) : (<>Select Territory</>)}
          </div>
          <div
            className={toggleState === 2 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(2)}
          >
            <div>
            <h3>Delaer Weekly Wise Report</h3>
          </div>
            {selectedTerritory ? (<Wgt_Delear_Weekly_Ui data={selectedTerritory} />) : (<>Select Territory</>)}

          </div>
          <div
            className={toggleState === 3 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(3)}
          >
            <div>
            <h3>Delaer Month Wise Report</h3>
          </div>
          </div>
        </div>
      </div>

      <div class="w3-row w3-padding-16"> </div>


      
    </div>
  );
};

export default Territory;
