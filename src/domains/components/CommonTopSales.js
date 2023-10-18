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
    if (actionType === "hod") {
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
  }, [selectedZone, selectedDepot, selectedTerritory]);

  const getZoneMonthPlan = async () => {
    try {
      const payload = {
        Token: localStorage.getItem("access_token"),
        ZoneId: 0,
        DepotId: 0,
        TerritoryId: selectedTerritory,
      };

      const response = await axiosInstance.post("TerritoryMonthPlan", payload);

      if (response?.status === 200) {
        setselectedDepotMonthPlan(
          response.data.Data != null ? response.data.Data[0] : []
        );
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  const fetchTerritoryMonthPlan = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      DepotId: selectedDepot,
      TerritoryId: 0, //selectedZone
    };
    try {
      const response = await axiosInstance.post("TerritoryMonthPlan", payload);

      if (response?.status === 200) {
        if (response.data.Data.length > 0) {
          const totalCurMonV1 = response.data.Data.reduce(
            (acc, item) =>
              acc +
              (parseInt(item[`${mStartName}_Month_Value_v1`].toFixed(0)) || 0),
            0
          );
          const curMonSale = response.data.Data.reduce(
            (acc, item) =>
              acc +
              (parseInt(item[`${mStartName}_Month_Sale`].toFixed(0)) || 0),
            0
          );
          setTerritoryMonthPlan({
            totalCurMonV1: totalCurMonV1,
            curMonSale: curMonSale,
          });
        }
        // );
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const convertZoneFormat = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      ZoneId: selectedZone,
      DepotId: 0,
    };

    try {
      const response = await axiosInstance.post("DepotMonthPlan", payload);
      // console.log("=====DepotMonthPlan====", response);
      if (response?.status === 200) {
        if (response.data.Data.length > 0) {
          const totalCurMonV1 = response.data.Data.reduce(
            (acc, item) =>
              acc +
              (parseInt(item[`${mStartName}_Month_Value_v1`].toFixed(0)) || 0),
            0
          );
          const curMonSale = response.data.Data.reduce(
            (acc, item) =>
              acc +
              (parseInt(item[`${mStartName}_Month_Sale`].toFixed(0)) || 0),
            0
          );
          setTerritoryMonthPlan({
            totalCurMonV1: totalCurMonV1,
            curMonSale: curMonSale,
          });
        }
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const convertNationalFormat = async () => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      ZoneId: selectedZone,
    };

    try {
      const response = await axiosInstance.post("ZoneMonthPlan", payload);
      // console.log("=====DepotMonthPlan====", response);
      if (response?.status === 200) {
        if (response.data.Data.length > 0) {
          const totalCurMonV1 = response.data.Data.reduce(
            (acc, item) =>
              acc +
              (parseInt(item[`${mStartName}_Month_Value_v1`].toFixed(0)) || 0),
            0
          );
          const curMonSale = response.data.Data.reduce(
            (acc, item) =>
              acc +
              (parseInt(item[`${mStartName}_Month_Sale`].toFixed(0)) || 0),
            0
          );
          setTerritoryMonthPlan({
            totalCurMonV1: totalCurMonV1,
            curMonSale: curMonSale,
          });
        }
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  useEffect(() => {
    if (actionType === "hod") {
      convertNationalFormat();
    } else if (
      actionType === "Zone" &&
      selectedZone !== undefined &&
      selectedZone != 0
    ) {
      convertZoneFormat();
    } else if (
      actionType === "Depot" &&
      selectedDepot !== undefined &&
      selectedDepot != 0
    ) {
      fetchTerritoryMonthPlan();
    } else if (
      actionType === "Territory" &&
      selectedTerritory !== undefined &&
      selectedTerritory != 0
    ) {
      getZoneMonthPlan();
    }
  }, [actionType, selectedTerritory, selectedDepot, selectedZone]);

  return (
    <>
      <div className="card-box lightyellow">
        {actionType == "hod" ? (
          <div className="one-fifth text-center">
            <span className="w3-text-gray h6">All Zone</span>
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
                ? fNWCommas(summaryData[0]?.summ_cy_plan_value)
                : ""}
            </u>
            ] [v.1 :
            <u className=" w3-text-red">
              {summaryData.length
                ? fNWCommas(summaryData[0]?.summ_cy_plan_value_v1)
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
        {actionType === "hod" ? (
          <div className="one-fifth text-center">
            <span className="w3-text-gray h6"> MTD </span>
            <hr className="hr1" />
            Plan:
            {fNWCommas(territoryMonthPlan.totalCurMonV1)}
            ,Actual:
            {fNWCommas(territoryMonthPlan.curMonSale)}
            {GetPercent(
              territoryMonthPlan.curMonSale,
              territoryMonthPlan.totalCurMonV1
            )}
          </div>
        ) : actionType === "Zone" ? (
          <div className="one-fifth text-center">
            <span className="w3-text-gray h6"> MTD </span>
            <hr className="hr1" />
            Plan:
            {fNWCommas(territoryMonthPlan.totalCurMonV1)}
            ,Actual:
            {fNWCommas(territoryMonthPlan.curMonSale)}
            {GetPercent(
              territoryMonthPlan.curMonSale,
              territoryMonthPlan.totalCurMonV1
            )}
          </div>
        ) : actionType === "Depot" ? (
          <div className="one-fifth text-center">
            <span className="w3-text-gray h6"> MTD </span>
            <hr className="hr1" />
            Plan:
            {fNWCommas(territoryMonthPlan.totalCurMonV1)}
            ,Actual:
            {fNWCommas(territoryMonthPlan.curMonSale)}
            {GetPercent(
              territoryMonthPlan.curMonSale,
              territoryMonthPlan.totalCurMonV1
            )}
          </div>
        ) : actionType === "Territory" ? (
          <div className="one-fifth text-center">
            <span className="w3-text-gray h6"> MTD </span>
            <hr className="hr1" />
            Plan:
            {fNWCommas(selectedDepotMonthPlan[`${mStartName}_Month_Value_v1`])}
            ,Actual:
            {fNWCommas(selectedDepotMonthPlan[`${mStartName}_Month_Sale`])}
            {GetPercent(
              selectedDepotMonthPlan[`${mStartName}_Month_Sale`],
              selectedDepotMonthPlan[`${mStartName}_Month_Value_v1`]
            )}
          </div>
        ) : (
          "Error"
        )}
      </div>
    </>
  );
};

export default CommonTopSales;
