import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SHOW_TOAST } from "../../store/constant/types";
import axiosInstance from "./../../auth/api";

const CommonTopSales = ({
  actionType,
  selectedZone,
  selectedDepot,
  selectedTerritory
}) => {
  const dispatch = useDispatch();
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const payload = {
      SummaryParam: [
        {
          entity_type: actionType,
          entity_id:
            actionType === "Zone"
              ? selectedZone
              : actionType === "Depot"
                ? selectedDepot
                  ? selectedDepot
                  : 0
                : actionType === "Territory"
                  ? selectedTerritory
                    ? selectedTerritory
                    : 0
                  : 0,
        },
      ],
    };

    const fetchTerritoryData = async () => {
      try {
        const response = await axiosInstance.post(
          "api/Summary/FYData",
          payload
        );
        console.log("=====FYData====", response);
        if (response?.status === 200) {
          setSummaryData(response.data.Data != null ? response.data.Data : []);
        }
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };
    fetchTerritoryData();
  }, [selectedZone, selectedDepot, selectedTerritory]);

  return (
    <>
      <div className="card-box lightyellow">
        {actionType == 'hod' ? (
        <div className="one-fifth text-center">
          <span className="w3-text-gray h6">
            All Zone{" "}
          </span>
          <hr className="hr1" />
          <span className=" "> Shalimar 6</span>
        </div>) : (
        <div className="one-fifth text-center">
          <span className="w3-text-gray h6">
            {summaryData[0]?.summ_entity_type}
          </span>
          <hr className="hr1" />
          <span className=" "> {summaryData[0]?.summ_entity_name}</span>
        </div>)}
        
          <div className="one-fifth text-center">
            <span className="w3-text-gray h6">
              {" "}
              LLY {summaryData[0]?.summ_lly_fy}{" "}
            </span>
            <hr className="hr1" /> 6
            <span className=" ">{summaryData[0]?.summ_lly_sale_value.toFixed(0)}</span>
          </div>

          <div className="one-fifth text-center">
            <span className="w3-text-gray h6">
              {" "}
              LY {summaryData[0]?.summ_ly_fy}{" "}
            </span>
            <hr className="hr1" />
            <span className=" "> {summaryData[0]?.summ_ly_sale_value.toFixed(0)} </span>
          </div>

          <div className="one-fifth text-center">
            <span className="w3-text-gray h6">
              {" "}
              TARGET {summaryData[0]?.summ_cy_fy}{" "}
            </span>
            <hr className="hr1" />

            <b>
            {" "}
              [v.0 :{" "}
              <u className=" w3-text-red">
                {" "}
                {summaryData[0]?.summ_cy_plan_value.toFixed(0)} (
                {summaryData[0]?.summ_cy_sale_percentage}%){" "}
              </u>{" "}
              ]{" "}
              {" "}
              [v.1 :{" "}
              <u className=" w3-text-red">
                {" "}
                {summaryData[0]?.summ_cy_plan_value_v1.toFixed(0)} (
                {summaryData[0]?.summ_cy_sale_percentage}%){" "}
              </u>{" "}
              ]{" "}
            </b>

            <span
              className=" btn btn-sm w3-small text-left w3-text-red "
              title={
                summaryData[0]?.isLock != 1
                  ? "Click to Un-Lock"
                  : "Click to Lock"
              }
            >
              <i className="fa fa-lock"></i>{" "}
              {summaryData[0]?.isLock == 1 ? "Un-Lock" : "Lock"}{" "}
            </span>

            {/* <div className="w3-col l6 m6 s3 ">
            <span className="  w3-text-gray  w3-left ">
              [v.2 :{" "}
              <u className=" w3-text-red">
                {" "}
                {summaryData[0]?.summ_cy_plan_v2_percentage} Cr. (
                {summaryData[0]?.summ_cy_target_v2_percentage}%){" "}
              </u>{" "}
              ]<i className="fa fa-unlock w3-text-red"> </i>
            </span>
          </div> */}
          </div>

          <div className="one-fifth text-center">
            <span className="w3-text-gray h6"> YTD </span>
            <hr className="hr1" />
            <span className=" "> {summaryData[0]?.summ_cy_sale_value.toFixed(0)} </span>
            <i className="w3-text-gray">
              {" "}
              ( {summaryData[0]?.summ_cy_plan_percentage} %){" "}
            </i>
          </div>
          
      </div>
    </>
  );
};

export default CommonTopSales;
