import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SHOW_TOAST } from "../../store/constant/types";
import axiosInstance from "./../../auth/api";
import { fNWCommas, GetPercent } from "../../utils/utils";
const date = new Date();
const cMName = date.toLocaleString("default", { month: "short" });
const mStartName = cMName.substring(0, 3);

const CommonTopSales = ({
  actionType,
  selectedZone,
  selectedDepot,
  selectedTerritory,
  selectedSegment,
}) => {
  const dispatch = useDispatch();
  const [summaryData, setSummaryData] = useState([]);
  const [selectedDepotMonthPlan, setselectedDepotMonthPlan] = useState({});
  const [territoryMonthPlan, setTerritoryMonthPlan] = useState({
    totalCurMonV1: 0,
    curMonSale: 0,
  });

  const fetchTerritoryData = async () => {
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
              : actionType === "IH"
              ? selectedSegment
                ? selectedSegment
                : 0
              : actionType === "SH"
              ? selectedSegment
                ? selectedSegment
                : 0
              : 0,
        },
      ],
    };
    try {
      const response = await axiosInstance.post("api/Summary/FYData", payload);

      if (response?.status === 200) {
        setSummaryData(response.data.Data != null ? response.data.Data : []);
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  useEffect(() => {
    if (actionType === "hod" || actionType === "IH" || actionType === "SH") {
      fetchTerritoryData();
    } else if (
      actionType === "Zone" &&
      selectedZone !== undefined &&
      selectedZone != 0
    ) {
      fetchTerritoryData();
    } else if (
      actionType === "Depot" &&
      selectedDepot !== undefined &&
      selectedDepot != 0
    ) {
      fetchTerritoryData();
    } else if (
      actionType === "Territory" &&
      selectedTerritory !== undefined &&
      selectedTerritory != 0
    ) {
      fetchTerritoryData();
    }
  }, [selectedZone, selectedDepot, selectedTerritory, selectedSegment]);

  return (
    <>
      <div className="card-box lightyellow">
        {actionType == "hod" ? (
          <div className="one-fifth text-center">
            <span className="w3-text-gray h6">All Zone</span>
            <hr className="hr1" />
            <span className=" "> Shalimar</span>
          </div>
        ) : actionType == "IH" ? (
          <div className="one-fifth text-center">
            <span className="w3-text-gray h6">All Segment</span>
            <hr className="hr1" />
            <span className=" "> Shalimar</span>
          </div>
        ) : (
          <div className="one-fifth text-center">
            <span className="w3-text-gray h6">
              {summaryData.length ? summaryData[0]?.summ_entity_type : "-"}
            </span>
            <hr className="hr1" />
            <span className=" ">
              {" "}
              {summaryData.length ? summaryData[0]?.summ_entity_name : "-"}
            </span>
          </div>
        )}

        {actionType === "IH" || actionType === "SH" ? null : (
          <div className="one-fifth text-center">
            <span className="w3-text-gray h6">
              LLY {summaryData.length ? summaryData[0]?.summ_lly_fy : ""}
            </span>
            <hr className="hr1" />
            <span className=" ">
              {summaryData.length
                ? fNWCommas(summaryData[0]?.summ_lly_sale_value)
                : "-"}
            </span>
          </div>
        )}

        <div className="one-fifth text-center">
          <span className="w3-text-gray h6">
            LY {summaryData.length ? summaryData[0]?.summ_ly_fy : ""}
          </span>
          <hr className="hr1" />
          <span className=" ">
            {" "}
            {summaryData.length
              ? fNWCommas(summaryData[0]?.summ_ly_sale_value)
              : "-"}{" "}
          </span>
        </div>

        <div className="one-fifth text-center">
          <span className="w3-text-gray h6">
            TARGET {summaryData.length ? summaryData[0]?.summ_cy_fy : ""}
          </span>
          <hr className="hr1" />
          <b>
            [v.0 :
            <u className=" w3-text-red">
              {summaryData.length
                ? fNWCommas(summaryData[0]?.summ_cy_plan_value.toFixed(0))
                : ""}
            </u>
            ] [v.1 :
            <u className=" w3-text-red">
              {summaryData.length
                ? fNWCommas(summaryData[0]?.summ_cy_plan_value_v1.toFixed(0))
                : ""}
            </u>
            ]
          </b>
          <span
            className=" btn btn-sm w3-small text-left w3-text-red "
            title={
              summaryData[0]?.isLock != 1 ? "Click to Un-Lock" : "Click to Lock"
            }
          >
            <i className="fa fa-lock"></i>
            {summaryData.length && summaryData[0]?.isLock == 1
              ? "Un-Lock"
              : "Lock"}
          </span>
        </div>

        <div className="one-fifth text-center">
          <span className="w3-text-gray h6"> YTD </span>
          <hr className="hr1" />
          <span className=" ">
            {" "}
            {summaryData.length &&
              fNWCommas(summaryData[0]?.summ_cy_sale_value)}{" "}
          </span>
          <i className="w3-text-gray">
            ({" "}
            {summaryData.length &&
              (
                (summaryData[0]?.summ_cy_sale_value /
                  summaryData[0]?.summ_cy_plan_value_v1) *
                100
              )?.toFixed(2)}{" "}
            %)
          </i>
        </div>

        <div className="one-fifth text-center">
          <span className="w3-text-gray h6"> MTD </span>
          <hr className="hr1" />
          Plan:
          {fNWCommas(summaryData[0]?.CurrentMonthPlan.toFixed(0))}
          ,Actual:
          {fNWCommas(summaryData[0]?.CurrentMonthSale.toFixed(0))}
          {GetPercent(
            summaryData[0]?.CurrentMonthSale,
            summaryData[0]?.CurrentMonthPlan
          )}
        </div>
        <div className="one-fifth text-center">
          <span className="w3-text-gray h6"> OS vs OD </span>
          <hr className="hr1" />
          OS:
          {fNWCommas(summaryData[0]?.CurrentMonthOS)}
          {" || OD:"}
          {fNWCommas(summaryData[0]?.CurrentMonthOD)}
          {GetPercent(
            summaryData[0]?.CurrentMonthOD,
            summaryData[0]?.CurrentMonthOS
          )}
        </div>
        <div className="one-fifth text-center">
          <span className="w3-text-gray h6"> Visit Plan </span>
          <hr className="hr1" />
          {fNWCommas(summaryData[0]?.Visitplan_V1)}
        </div>
      </div>
    </>
  );
};

export default CommonTopSales;
