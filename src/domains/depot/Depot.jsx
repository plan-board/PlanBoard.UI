import { useEffect, useState } from "react";
import CommonTopSales from "../components/CommonTopSales";
import TerritoryMonthWiseSalesReport from "../components/TerritoryMonthWiseSalesReport";
import TerritorySales from "../components/TerritorySales";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import ZoneSelectionBox from "../components/ZoneSelectionBox";
import DepoSelectionBox from "../components/DepoSelectionBox";
import AllFigureText from "../components/AllFigureText";
import LogSummary from "../components/LogSummary";

const Depot = () => {
  const [toggleState, setToggleState] = useState(1);
  const flag = useSelector((state) => state.sidebarStatus.flag);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const { zoneId, depotId } = useParams();

  const { AuthData } = useSelector((state) => state.auth);

  const [selectedZone, setSelectedZone] = useState(
    AuthData?.Zone[0]?.ZoneID ? AuthData?.Zone[0]?.ZoneID : 0
  );
  const [selectedDepot, setSelectedDepot] = useState(
    AuthData?.Depot[0]?.DepotID ? AuthData?.Depot[0]?.DepotID : 0
  );
  const handleSelectionChange = (newValue) => {
    setSelectedZone(newValue);
  };

  const onSelectedDepoChange = (newValue) => {
    setSelectedDepot(newValue);
  };

  useEffect(() => {
    console.log("--zoneId", zoneId);

    if (zoneId != undefined) {
      setSelectedZone(parseInt(zoneId));
    }
    if (depotId != undefined) {
      console.log("--depotId", depotId);
      setSelectedDepot(parseInt(depotId));
    }
  }, []);

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
                selectedZone={selectedZone}
                selectedDepot={selectedDepot}
                onSelectedDepoChange={onSelectedDepoChange}
              />
            </div>
          </div>
        ) : AuthData?.Data[0].EmployeeTpye === "DM" ? (
          <div className="one-fourth">
            <DepoSelectionBox
              selectedZone={selectedZone}
              selectedDepot={selectedDepot}
              onSelectedDepoChange={onSelectedDepoChange}
            />
          </div>
        ) : null}
      </div>

      <CommonTopSales
        actionType="Depot"
        selectedZone={selectedZone}
        selectedDepot={selectedDepot}
      />
      <div class="card-box lightblue">
        <div className="w3-bar tab-container">
          <div
            className={
              toggleState === 1 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(1)}
          >
            <span className="h6"> Territory Monthly Plan</span>
          </div>

          <div
            className={
              toggleState === 2 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(2)}
          >
            <span className="h6">
              {" "}
              <i className="fa fa-list"></i>
              <span style={{ fontFamily: "Nunito sans" }}>Lock Summary</span>
            </span>
          </div>
        </div>
        <div class="w3-row w-100">
          <div className={toggleState === 1 ? "  " : " w3-hide  "}>
            <div>
              <h3>Territory Wise Monthly Plan / Achievement</h3>
            </div>
            {toggleState === 1 && (
              <TerritoryMonthWiseSalesReport selectedDepot={selectedDepot} />
            )}
          </div>
          <div className={toggleState === 2 ? "  " : " w3-hide  "}>
            <div>
              <h3 style={{ fontFamily: "Nunito sans" }}>Lock Summary</h3>
            </div>
            {toggleState === 2 && (
              <LogSummary actionType="Depot" selectedId={selectedDepot} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Depot;
