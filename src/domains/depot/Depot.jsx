import { useEffect, useState } from "react";
import CommonTopSales from "../components/CommonTopSales";
import TerritoryMonthWiseSalesReport from "../components/TerritoryMonthWiseSalesReport";
import TerritorySales from "../components/TerritorySales";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import ZoneSelectionBox from "../components/ZoneSelectionBox";
import DepoSelectionBox from "../components/DepoSelectionBox";

const Depot = () => {
  const [toggleState, setToggleState] = useState(1);
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
                selectedZone={selectedZone}
                selectedDepot={selectedDepot}
                onSelectedDepoChange={onSelectedDepoChange}
              />
            </div>
          </>
        ) : AuthData?.Data[0].EmployeeTpye === "DM" ? (
          <div className="w3-col l3 m3 s6">
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

      <div class="w3-row w3-padding-16"></div>

      <div class="w3-row w3-white w3-border w3-border-gray">
        <div className="w3-bar w3-gray ">
          <div
            className={
              toggleState === 1
                ? " w3-bar-item w3-button w3-white  w3-hover-white  "
                : " w3-bar-item w3-button w3-gray  w3-hover-white  "
            }
            onClick={() => toggleTab(1)}
          >
            <span className=" h6 w3-text-gray "> Territory Monthly Plan</span>
          </div>
        </div>
        <div class="w3-row w3-padding ">
          <div
            className={toggleState === 1 ? "  " : " w3-hide  "}
            onClick={() => toggleTab(1)}
          >
            <div>
            <h3>Territory Month Wise Report</h3>
          </div>
            <TerritoryMonthWiseSalesReport selectedDepot={selectedDepot} />
          </div>
        </div>
      </div>

      <div class="w3-row w3-padding-16"> </div>
    </div>
  );
};

export default Depot;
