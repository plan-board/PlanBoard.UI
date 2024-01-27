import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CommonTopSales from "../components/CommonTopSales";
import ZoneDropDown from "../components/ZoneDropDown";
import DepoMonthWiseSalesReport from "../components/DepoMonthWiseSalesReport";
import AllFigureText from "../components/AllFigureText";
import LogSummary from "../components/LogSummary";
import ZoneBar from "./ZoneBarChart";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";

const Zone = () => {
  const dispatch = useDispatch();
  const { AuthData } = useSelector((state) => state.auth);
  const flag = useSelector((state) => state.sidebarStatus.flag);
  const [monthWiseSalesData, setMonthWiseSalesData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState(
    AuthData?.Zone[0]?.ZoneID ? AuthData?.Zone[0]?.ZoneID : 0
  );
  const [selectedDepot, setSelectedDepot] = useState(0);

  const handleSelectionChange = (newValue) => {
    setSelectedZone(newValue);
  };

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      ZoneId: selectedZone,
      DepotId: 0,
    };
    const fetchDepotSalesPlan = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post("DepotMonthPlan", payload);
        // console.log("=====DepotMonthPlan====", response);
        if (response?.status === 200) {
          setMonthWiseSalesData(
            response.data.Data != null ? response.data.Data : []
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    fetchDepotSalesPlan();
  }, [selectedZone]);

  return (
    <div className="main" style={{ marginLeft: flag ? "150px" : "0px" }}>
      <div className="w3-row">
        <span className="main-title">
          Shalimar Paints Limited <AllFigureText />
        </span>
      </div>
      <div className="card-box px-0 lightblue">
        <div className="row justify-content-between w-100 align-items-center m-0">
          <div className="one-fourth">
            <ZoneDropDown
              selectedZone={selectedZone}
              onValueChange={handleSelectionChange}
            />
          </div>
        </div>
      </div>

      <CommonTopSales actionType="Zone" selectedZone={selectedZone} />
      <div className="card-box lightblue">
        <div className="tbl-container">
          <ZoneBar
            selectedZone={selectedZone}
            monthWiseSalesData={monthWiseSalesData}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div class="card-box lightblue">
        <div className="w3-bar tab-container">
          <div
            className={
              toggleState === 1 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(1)}
          >
            <span className="h6"> Depots Monthly Plan </span>
          </div>
          <div
            className={
              toggleState === 2 ? "w3-button tab tab-active" : "w3-button tab"
            }
            onClick={() => toggleTab(2)}
          >
            <span className="h6">
              <i className="fa fa-list"></i> Lock Summary{" "}
            </span>
          </div>
        </div>
        <div class="w3-row w-100" style={{ minheight: "300px" }}>
          <div>
            <h3>Depot Wise Monthly Plan / Achievement</h3>
          </div>
          <div className={toggleState === 1 ? "  " : " w3-hide  "}>
            {toggleState === 1 && (
              <DepoMonthWiseSalesReport
                selectedZone={selectedZone}
                selectedDepot={selectedDepot}
                monthWiseSalesData={monthWiseSalesData}
                isLoading={isLoading}
              />
            )}
          </div>
          <div className={toggleState === 2 ? "  " : " w3-hide  "}>
            {toggleState === 2 && (
              <LogSummary actionType="Zone" selectedId={selectedZone} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Zone;
