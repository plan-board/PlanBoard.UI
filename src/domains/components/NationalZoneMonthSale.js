import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import ExportExcel from "../ExportExcel";
import { GetPercent, fNWCommas, getMoths } from "../../utils/utils";

const NationalZoneMonthSale = ({ selectedZone }) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const [zoneMonthPlan, setZoneMonthPlan] = useState([]);
  const [sortField, setSortField] = useState(''); // To store the current sorting field (empty for no sorting)
  const [sortDirection, setSortDirection] = useState(''); // To store the current sorting direction ('asc' or 'desc')

  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      ZoneId: selectedZone,
    };
    const getZoneMonthPlan = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post("ZoneMonthPlan", payload);

        if (response?.status === 200) {
          console.log("=====getZoneMonthPlan====", response.data.Data);
          setZoneMonthPlan(
            response.data.Data != null ? response.data.Data : []
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    getZoneMonthPlan();
  }, [selectedZone]);

  const handleSort = (field) => {
    if (sortField === field) {
      // If the same column is clicked again, toggle the sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If a different column is clicked, set the new sort field and direction
      setSortField(field);
      setSortDirection('asc'); // Default to ascending order
    }
  };

  // Sort the data based on the current sorting field and direction
  let sortedData = [...zoneMonthPlan];
  if (sortField === 'Zone') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.zone_name.localeCompare(b.zone_name);
      } else {
        return b.zone_name.localeCompare(a.zone_name);
      }
    });
  } else if (sortField === 'LY 22-23') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return (a.LY_Value || 0) - (b.LY_Value || 0);
      } else {
        return (b.LY_Value || 0) - (a.LY_Value || 0);
      }
    });
  }

  const totalLYValue = sortedData.reduce(
    (acc, item) => acc + (parseInt(item.LY_Value.toFixed(0)) || 0),
    0
  );
  const totalCYValue = sortedData.reduce(
    (acc, item) => acc + (parseInt(item.CY_Value.toFixed(0)) || 0),
    0
  );
  const totalYTDValue = sortedData.reduce(
    (acc, item) => acc + (parseInt(item.YTD_Value.toFixed(0)) || 0),
    0
  );
  const totalAprValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Apr_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalAprValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Apr_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalMayValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.May_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalMayValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.May_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalJunValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Jun_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalJunValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Jun_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalJulValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Jul_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalJulValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Jul_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalAugValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Aug_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalAugValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Aug_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalSepValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Sep_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalSepValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Sep_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalOctValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Oct_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalOctValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Oct_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalNovValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Nov_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalNovValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Nov_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalDecValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Dec_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalDecValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Dec_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalJanValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Jan_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalJanValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Jan_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalFebValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Feb_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalFebValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Feb_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalMarValue = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Mar_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalMarValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (parseInt(item?.Mar_Month_Sale.toFixed(0)) || 0),
    0
  );



  const tableRows = sortedData.map((item, index) => (
    <tr key={index}>
      <td className="">{++index}</td>
      <td className="">{item?.zone_name}</td>
      <td className="">{fNWCommas(item?.LY_Value)}</td>
      <td className="">
        {fNWCommas(item?.CY_Value)} <hr className="hr0" />
        {fNWCommas(item?.YTD_Value)}
        {GetPercent(item?.YTD_Value, item?.CY_Value)}
      </td>
      {getMoths().map((month) => (
        <td key={month}>
          {fNWCommas(item[`${month}_Month_Value_v1`])}
          <hr className="hr0" />
          {fNWCommas(item[`${month}_Month_Sale`])}
          {GetPercent(item[`${month}_Month_Sale`], item[`${month}_Month_Value_v1`])}
        </td>
      ))}
    </tr>
  ));

  // Add a new row for total CY_Value and YTD_Value
  const totalRow = (
    <tr key="total" className="totalRow">
      <td className="" colSpan={2}>
        Total
      </td>
      <td className="">{fNWCommas(totalLYValue)}</td>
      <td className="">
        {totalCYValue} <hr className="hr0" />
        {totalYTDValue}
        {GetPercent(totalYTDValue, totalCYValue)}
      </td>
      <td className="">
        {totalAprValue} <hr className="hr0" />
        {totalAprValue_v1}
        {GetPercent(totalAprValue_v1, totalAprValue)}
      </td>
      <td className="">
        {totalMayValue}
        <hr className="hr0" />
        {totalMayValue_v1}
        {GetPercent(totalMayValue_v1, totalMayValue)}
      </td>
      <td className="">
        {totalJunValue}
        <hr className="hr0" />
        {totalJunValue_v1}
        {GetPercent(totalJunValue_v1, totalJunValue)}
      </td>
      <td className="">
        {totalJulValue}
        <hr className="hr0" />
        {totalJulValue_v1}
        {GetPercent(totalJulValue_v1, totalJulValue)}
      </td>
      <td className="">
        {totalAugValue}
        <hr className="hr0" />
        {totalAugValue_v1}
        {GetPercent(totalAugValue_v1, totalAugValue)}
      </td>
      <td className="">
        {totalSepValue}
        <hr className="hr0" />
        {totalSepValue_v1}
        {GetPercent(totalSepValue_v1, totalSepValue)}
      </td>
      <td className="">
        {totalOctValue}
        <hr className="hr0" />
        {totalOctValue_v1}
        {GetPercent(totalOctValue_v1, totalOctValue)}
      </td>
      <td className="">
        {totalNovValue}
        <hr className="hr0" />
        {totalNovValue_v1}
        {GetPercent(totalNovValue_v1, totalNovValue)}
      </td>
      <td className="">
        {totalDecValue}
        <hr className="hr0" />
        {totalDecValue_v1}
        {GetPercent(totalDecValue_v1, totalDecValue)}
      </td>
      <td className="">
        {totalJanValue}
        <hr className="hr0" />
        {totalJanValue_v1}
        {GetPercent(totalJanValue_v1, totalJanValue)}
      </td>
      <td className="">
        {totalFebValue}
        <hr className="hr0" />
        {totalFebValue_v1}
        {GetPercent(totalFebValue_v1, totalFebValue)}
      </td>
      <td className="">
        {totalMarValue}
        <hr className="hr0" />
        {totalMarValue_v1}
        {GetPercent(totalMarValue_v1, totalMarValue)}
      </td>
    </tr>
  );

  const tableWithTotalRow = [...tableRows, totalRow];

  const handleExportClick = () => {
    const headArr = ["S.No", "Zone", "LY 22-23", "Plan 2023", "YTD", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    const arrObj = zoneMonthPlan.map((element, index) => ({
      "S.No": index + 1,
      "Zone": element.zone_name,
      "LY 22-23": parseInt(element.LY_Value).toFixed(0),
      "Plan 2023": parseInt(element.CY_Value).toFixed(0),
      "YTD": parseInt(element.YTD_Value).toFixed(0),
      "Apr": parseInt(element.Apr_Month_Value_v1).toFixed(0),
      "Apr Sale": parseInt(element.Apr_Month_Sale).toFixed(0),
      "May": parseInt(element.May_Month_Value_v1).toFixed(0),
      "May Sale": parseInt(element.May_Month_Sale).toFixed(0),
      "Jun": parseInt(element.Jun_Month_Value_v1).toFixed(0),
      "Jun Sale": parseInt(element.Jun_Month_Sale).toFixed(0),
      "Jul": parseInt(element.Jul_Month_Value_v1).toFixed(0),
      "Jul Sale": parseInt(element.Jul_Month_Sale).toFixed(0),
      "Aug": parseInt(element.Aug_Month_Value_v1).toFixed(0),
      "Aug Sale": parseInt(element.Aug_Month_Sale).toFixed(0),
      "Sep": parseInt(element.Sep_Month_Value_v1).toFixed(0),
      "Sep Sale": parseInt(element.Sep_Month_Sale).toFixed(0),
      "Oct": parseInt(element.Oct_Month_Value_v1).toFixed(0),
      "Oct Sale": parseInt(element.Oct_Month_Sale).toFixed(0),
      "Nov": parseInt(element.Nov_Month_Value_v1).toFixed(0),
      "Nov Sale": parseInt(element.Nov_Month_Sale).toFixed(0),
      "Dec": parseInt(element.Dec_Month_Value_v1).toFixed(0),
      "Dec Sale": parseInt(element.Dec_Month_Sale).toFixed(0),
      "Jan": parseInt(element.Jan_Month_Value_v1).toFixed(0),
      "Jan Sale": parseInt(element.Feb_Month_Sale).toFixed(0),
      "Feb": parseInt(element.Feb_Month_Value_v1).toFixed(0),
      "Feb Sale": parseInt(element.Feb_Month_Sale).toFixed(0),
      "Mar": parseInt(element.Mar_Month_Value_v1).toFixed(0),
      "Mar Sale": parseInt(element.Mar_Month_Sale).toFixed(0)
    }));
    console.log("-arrObj", arrObj)
    ExportExcel('Zone-Wise-Monthly-Plan-Achievement', arrObj)
  };

  return (
    <div id="mom-north" className="w3-row">
      <div id="mom-bar-north" className="w-100">
        {zoneMonthPlan?.length ? (<div><button onClick={handleExportClick}> <i className="fa fa-pdf">Export</i></button></div>) : null}

        <table className="table-bordered table-striped">
          <thead>
            <tr>
              <th rowspan="2"> S.No </th>
              <th rowspan="2" onClick={() => handleSort('Zone')}>
                Zone {sortField === 'Zone' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th rowspan="2" onClick={() => handleSort('LY 22-23')}>
                LY 22-23 {sortField === 'LY 22-23' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th rowspan="2"> Plan 2023 <hr className="hr0" /> YTD </th>
              <th colspan="12"> Month Wise Plan </th>
            </tr>
            <tr>
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
                <td colSpan="16">
                  <LoadingPlaceholder numberOfRows={4}></LoadingPlaceholder>
                </td>
              </tr>
            ) : (
              <>
                {zoneMonthPlan?.length === 0 ? (
                  <tr>
                    <td colSpan="16">No data found</td>
                  </tr>
                ) : (
                  tableWithTotalRow
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NationalZoneMonthSale;
