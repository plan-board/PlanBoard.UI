import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import { GetPercent, fNWCommas, getMonths } from "../../utils/utils";
import { fetchTerritoryMonthSale } from "../../store/actions/zone";
import { Link } from "react-router-dom";

const date = new Date();
const cMName = date.toLocaleString("default", { month: "short" });
const mStartName = cMName.substring(0, 3);

const TerritoryMonthSale = ({ selectedTerritory }) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [territoryMonthPlan, setselectedDepotMonthPlan] = useState([]);

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
        console.log("=====TerritoryMonthPlan====", response.data.Data);
        setselectedDepotMonthPlan(
          response.data.Data != null ? response.data.Data : []
        );
        // dispatch(
        //   fetchTerritoryMonthSale(
        //     response.data.Data != null ? response.data.Data : []
        //   )
        // );
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  useEffect(() => {
    if (selectedTerritory != 0) {
      setLoading(true);
      getZoneMonthPlan();
    }
  }, [selectedTerritory]);

  const generateTableRows = (item) => {
    const headers = [];
    for (let i = 0; i < getMonths().length; i++) {
      const monName = getMonths()[i];
      headers.push(
        <Fragment>
          <td className={`  ${monName === mStartName ? "active" : ""}`}>
            {/* {fNWCommas(item[`${monName}_Month_Value_v1`].toFixed(2))}{" "} */}
            {item[`${monName}_Month_Value_v1`].toFixed(2)}
            <hr className="hr0" />{" "}
            {/* {fNWCommas(item[`${monName}_Month_Sale_act`])}{" "} */}
            {item[`${monName}_Month_Sale_act`].toFixed(2)}
            {GetPercent(
              item[`${monName}_Month_Sale_act`],
              item[`${monName}_Month_Value_v1`]
            )}
          </td>
        </Fragment>
      );
    }
    return headers;
  };

  return (
    <div className="tbl-container">
      <table className="table-bordered table-striped ">
        <thead>
          <tr>
            <th>Territory</th>
            <th> Apr </th>
            <th> May </th>
            <th> Jun </th>
            <th> Jul </th>
            <th> Aug </th>
            <th> Sep </th>
            <th> Oct </th>
            <th> Nov </th>
            <th> Dec </th>
            <th> Jan </th>
            <th> Feb </th>
            <th> Mar </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="13">
                <LoadingPlaceholder numberOfRows={2}></LoadingPlaceholder>
              </td>
            </tr>
          ) : (
            <>
              {territoryMonthPlan.length == 0 ? (
                <tr>
                  <td
                    colSpan="13"
                    className="w3-large w3-text-gray w3-padding h4"
                  >
                    {" "}
                    No Data Found, Select Territory
                  </td>
                </tr>
              ) : (
                territoryMonthPlan.map((item, index) => (
                  <tr key={index + "tms"}>
                    <td className="h3">
                      <Link to={"/territory-dashobard"}>
                        {item?.territory_name}
                      </Link>
                    </td>
                    {generateTableRows(item)}
                  </tr>
                ))
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TerritoryMonthSale;
