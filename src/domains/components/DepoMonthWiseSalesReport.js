import React, { useEffect, useState } from "react";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
// import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
// import ZoneDropDown from "./ZoneDropDown";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

const DepoMonthWiseSalesReport = ({
  selectedZone,
  selectedDepot,
  forVersion,
}) => {
  // console.log('"-----on click');
  const dispatch = useDispatch();
  const [monthWiseSalesData, setMonthWiseSalesData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    console.log("-calling DepotMonthPlan api from dpo mon wise re");
    const payload = {
      Token: localStorage.getItem("access_token"),
      ZoneId: selectedZone,
      DepotId: 0, //selectedDepot
    };
    const fetchDepotSalesPlan = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post("DepotMonthPlan", payload);
        console.log("=====DepotMonthPlan====", response);
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

  // builkd table colunms

  const filteredItems = monthWiseSalesData.filter(
    (item) =>
      item.depot_name &&
      item.depot_name.toLowerCase().includes(filterText.toLowerCase())
  );


  const totalLYValue = filteredItems.reduce(
    (acc, item) => acc + (item.LY_Value || 0),
    0
  );
  const totalLLYValue = filteredItems.reduce(
    (acc, item) => acc + (item.LLY_Value || 0),
    0
  );
  const totalCYValue = filteredItems.reduce(
    (acc, item) => acc + (item.CY_Value || 0),
    0
  );
  const totalYTDValue = filteredItems.reduce(
    (acc, item) => acc + (item.YTD_Value || 0),
    0
  );
  const totalAprValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Apr_Month_Value_v1 || 0),
    0
  );
  const totalAprValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Apr_Month_Sale || 0),
    0
  );
  const totalMayValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.May_Month_Value_v1 || 0),
    0
  );
  const totalMayValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.May_Month_Sale || 0),
    0
  );
  const totalJunValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Jun_Month_Value_v1 || 0),
    0
  );
  const totalJunValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Jun_Month_Sale || 0),
    0
  );
  const totalJulValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Jul_Month_Value_v1 || 0),
    0
  );
  const totalJulValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Jul_Month_Sale || 0),
    0
  );
  const totalAugValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Aug_Month_Value_v1 || 0),
    0
  );
  const totalAugValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Aug_Month_Sale || 0),
    0
  );
  const totalSepValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Sep_Month_Value_v1 || 0),
    0
  );
  const totalSepValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Sep_Month_Sale || 0),
    0
  );
  const totalOctValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Oct_Month_Value_v1 || 0),
    0
  );
  const totalOctValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Oct_Month_Sale || 0),
    0
  );
  const totalNovValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Nov_Month_Value_v1 || 0),
    0
  );
  const totalNovValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Nov_Month_Sale || 0),
    0
  );
  const totalDecValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Dec_Month_Value_v1 || 0),
    0
  );
  const totalDecValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Dec_Month_Sale || 0),
    0
  );
  const totalJanValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Jan_Month_Value_v1 || 0),
    0
  );
  const totalJanValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Jan_Month_Sale || 0),
    0
  );
  const totalFebValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Feb_Month_Value_v1 || 0),
    0
  );
  const totalFebValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Feb_Month_Sale || 0),
    0
  );
  const totalMarValue = filteredItems?.reduce(
    (acc, item) => acc + (item?.Mar_Month_Value_v1 || 0),
    0
  );
  const totalMarValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (item?.Mar_Month_Sale || 0),
    0
  );

  const tableRows = filteredItems.map((item, index) => (
    <tr key={index}> 
      <td>{++index}</td> 
      <td>{item?.zone_name}</td>
      <td>{item?.depot_name}</td>
      <td>{item?.LY_Value}</td>
      <td>{item?.LLY_Value}</td>
      <td>{item?.CY_Value} <hr className="hr0" />{item?.YTD_Value}</td>
      <td>
        {item?.Apr_Month_Value_v1}
        <hr className="hr0" />
        {item?.Apr_Month_Sale}
      </td>
      <td>
        {item?.May_Month_Value_v1}
        <hr className="hr0" />
        {item?.May_Month_Sale}
      </td>
      <td>
        {item?.Jun_Month_Value_v1}
        <hr className="hr0" />
        {item?.Jun_Month_Sale}
      </td>
      <td>
        {item?.Jul_Month_Value_v1}
        <hr className="hr0" />
        {item?.Jul_Month_Sale}
      </td>
      <td>
        {item?.Aug_Month_Value_v1}
        <hr className="hr0" />
        {item?.Aug_Month_Sale}
      </td>
      <td>
        {item?.Sep_Month_Value_v1}
        <hr className="hr0" />
        {item?.Sep_Month_Sale}
      </td>
      <td>
        {item?.Oct_Month_Value_v1}
        <hr className="hr0" />
        {item?.Oct_Month_Sale}
      </td>
      <td>
        {item?.Nov_Month_Value_v1}
        <hr className="hr0" />
        {item?.Nov_Month_Sale}
      </td>
      <td>
        {item?.Dec_Month_Value_v1}
        <hr className="hr0" />
        {item?.Dec_Month_Sale}
      </td>
      <td>
        {item?.Jan_Month_Value_v1}
        <hr className="hr0" />
        {item?.Jan_Month_Sale}
      </td>
      <td>
        {item?.Feb_Month_Value_v1}
        <hr className="hr0" />
        {item?.Feb_Month_Sale}
      </td>
      <td>
        {item?.Mar_Month_Value_v1}
        <hr className="hr0" />
        {item?.Mar_Month_Sale}
      </td>
    </tr>
  ));

  // Add a new row for total CY_Value and YTD_Value
  const totalRow = (
    <tr key="total" className="colrdrow">
      <td colSpan={3}>
        Total
      </td>
      <td>
        {totalLLYValue.toFixed(2)}
      </td>
      <td>
        {totalLYValue.toFixed(2)}
      </td>
      <td>
        {totalCYValue.toFixed(2)}
        <hr className="hr0" />
        {totalYTDValue.toFixed(2)}
      </td>
      <td>
        {totalAprValue?.toFixed(2)}
        <hr className="hr0" />
        {totalAprValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalMayValue?.toFixed(2)}
        <hr className="hr0" />
        {totalMayValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalJunValue?.toFixed(2)}
        <hr className="hr0" />
        {totalJunValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalJulValue?.toFixed(2)}
        <hr className="hr0" />
        {totalJulValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalAugValue?.toFixed(2)}
        <hr className="hr0" />
        {totalAugValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalSepValue?.toFixed(2)}
        <hr className="hr0" />
        {totalSepValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalOctValue?.toFixed(2)}
        <hr className="hr0" />
        {totalOctValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalNovValue?.toFixed(2)}
        <hr className="hr0" />
        {totalNovValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalDecValue?.toFixed(2)}
        <hr className="hr0" />
        {totalDecValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalJanValue?.toFixed(2)}
        <hr className="hr0" />
        {totalJanValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalFebValue?.toFixed(2)}
        <hr className="hr0" />
        {totalFebValue_v1?.toFixed(2)}
      </td>
      <td>
        {totalMarValue?.toFixed(2)}
        <hr className="hr0" />
        {totalMarValue_v1?.toFixed(2)}
      </td>
    </tr>
  );

  const tableWithTotalRow = [...tableRows, totalRow];

  return (
    <div id="mom-north" className="w3-row w3-margin-top ">
      <div id="mom-bar-north" >
        <div className="form-group filterInput">
          <input className="w3-margin-bottom w3-input w3-border "
            type="text"
            placeholder="Filter By Depot  Name"
            aria-label="Search Input"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <table className="w3-table w3-stripped table-bordered">
          <tr className="colrdrow">
            <td > 
              S.No
            </td>
            <td > 
              Zone
            </td>
            <td >
              Depot
            </td>
            <td >
              LLY
            </td>
            <td >
              LY
            </td>
            <td >
              CY Plan / YTD
            </td>
            <td className="w3-gray"> Apr </td>
            <td className="w3-gray"> May </td>
            <td className="w3-gray"> Jun </td>
            <td className="w3-gray"> Jul </td>
            <td className="w3-gray"> Aug </td>
            <td className="w3-gray"> Sep </td>
            <td className="w3-gray"> Oct </td>
            <td className="w3-gray"> Nov </td>
            <td className="w3-gray"> Dec </td>
            <td className="w3-gray"> Jan </td>
            <td className="w3-gray"> Feb </td>
            <td className="w3-gray"> Mar </td>
          </tr>
          {isLoading ? (
            <tr>
              <td colSpan="18">
                <LoadingPlaceholder numberOfRows={4}></LoadingPlaceholder>
              </td>
            </tr>
          ) : (
            <>
              {filteredItems?.length === 0 ? (
                <tr>
                  <td colSpan="18">No data found</td>
                </tr>
              ) : (
                tableWithTotalRow
              )}
            </>
          )}
        </table>
      </div>
    </div>
  );
};

export default DepoMonthWiseSalesReport;
