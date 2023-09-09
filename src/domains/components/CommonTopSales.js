import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      <div className=" w3-leftbar w3-border-red w3-row w3-row-padding w3-padding-16 w3-white w3-margin-bottom ">
        {actionType == 'hod' ? (<div className="w3-col l2 w3-center">
          <span className="w3-text-gray h6">
            All Zone{" "}
          </span>
          <hr className="hr1" />
          <span className=" "> Shalimar</span>
        </div>) : (<div className="w3-col l2 w3-center">
          <span className="w3-text-gray h6">
            {summaryData[0]?.summ_entity_type}
          </span>
          <hr className="hr1" />
          <span className=" "> {summaryData[0]?.summ_entity_name}</span>
        </div>)}


        <div className="w3-col l10 w3-center">
          <div className="w3-col l3 m3 s3 w3-center">
            <span className="w3-text-gray h6">
              {" "}
              LLY {summaryData[0]?.summ_lly_fy}{" "}
            </span>
            <hr className="hr1" />
            <span className=" ">{summaryData[0]?.summ_lly_sale_value}</span>
          </div>

          <div className="w3-col l3 m3 s3 w3-center">
            <span className="w3-text-gray h6">
              {" "}
              LY {summaryData[0]?.summ_ly_fy}{" "}
            </span>
            <hr className="hr1" />
            <span className=" "> {summaryData[0]?.summ_ly_sale_value} </span>
          </div>

          <div className="w3-col l3 m3 s3 w3-center w3-row-padding">
            <span className="w3-text-gray h6">
              {" "}
              TARGET {summaryData[0]?.summ_cy_fy}{" "}
            </span>
            <hr className="hr1" />

            <b>
              {" "}
              [v.1 :{" "}
              <u className=" w3-text-red">
                {" "}
                {summaryData[0]?.summ_cy_plan_v1_value} (
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

          <div className="w3-col l3 m3 s3  w3-center">
            <span className="w3-text-gray h6"> YTD </span>
            <hr className="hr1" />
            <span className=" "> {summaryData[0]?.summ_cy_sale_value} </span>
            <i className="w3-text-gray">
              {" "}
              ( {summaryData[0]?.summ_cy_plan_percentage} %){" "}
            </i>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonTopSales;
