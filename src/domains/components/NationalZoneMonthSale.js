import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";

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
    (acc, item) => acc + (item.LY_Value || 0),
    0
  );
  const totalCYValue = sortedData.reduce(
    (acc, item) => acc + (item.CY_Value || 0),
    0
  );
  const totalYTDValue = sortedData.reduce(
    (acc, item) => acc + (item.YTD_Value || 0),
    0
  );
  const totalAprValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Apr_Month_Value_v1 || 0),
    0
  );
  const totalAprValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Apr_Month_Sale || 0),
    0
  );
  const totalMayValue = sortedData?.reduce(
    (acc, item) => acc + (item?.May_Month_Value_v1 || 0),
    0
  );
  const totalMayValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.May_Month_Sale || 0),
    0
  );
  const totalJunValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Jun_Month_Value_v1 || 0),
    0
  );
  const totalJunValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Jun_Month_Sale || 0),
    0
  );
  const totalJulValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Jul_Month_Value_v1 || 0),
    0
  );
  const totalJulValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Jul_Month_Sale || 0),
    0
  );
  const totalAugValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Aug_Month_Value_v1 || 0),
    0
  );
  const totalAugValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Aug_Month_Sale || 0),
    0
  );
  const totalSepValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Sep_Month_Value_v1 || 0),
    0
  );
  const totalSepValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Sep_Month_Sale || 0),
    0
  );
  const totalOctValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Oct_Month_Value_v1 || 0),
    0
  );
  const totalOctValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Oct_Month_Sale || 0),
    0
  );
  const totalNovValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Nov_Month_Value_v1 || 0),
    0
  );
  const totalNovValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Nov_Month_Sale || 0),
    0
  );
  const totalDecValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Dec_Month_Value_v1 || 0),
    0
  );
  const totalDecValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Dec_Month_Sale || 0),
    0
  );
  const totalJanValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Jan_Month_Value_v1 || 0),
    0
  );
  const totalJanValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Jan_Month_Sale || 0),
    0
  );
  const totalFebValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Feb_Month_Value_v1 || 0),
    0
  );
  const totalFebValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Feb_Month_Sale || 0),
    0
  );
  const totalMarValue = sortedData?.reduce(
    (acc, item) => acc + (item?.Mar_Month_Value_v1 || 0),
    0
  );
  const totalMarValue_v1 = sortedData?.reduce(
    (acc, item) => acc + (item?.Mar_Month_Sale || 0),
    0
  );

  const tableRows = sortedData.map((item, index) => (
    <tr key={index}>
      <td className="">{++index}</td>
      <td className="">{item?.zone_name}</td>
      <td className="">{item?.LY_Value}</td>
      <td className="">
        {item?.CY_Value} <hr className="hr0" />
        {item?.YTD_Value}
        <span className="w3-text-gray ">
          ({((item?.YTD_Value / item?.CY_Value) * 100)?.toFixed(0)}%)
        </span>
      </td>
      <td className="">
        {item?.Apr_Month_Value_v1}
        <hr className="hr0" />
        {item?.Apr_Month_Sale}
      </td>
      <td className="">
        {item?.May_Month_Value_v1}
        <hr className="hr0" />
        {item?.May_Month_Sale}
      </td>
      <td className="">
        {item?.Jun_Month_Value_v1}
        <hr className="hr0" />
        {item?.Jun_Month_Sale}
      </td>
      <td className="">
        {item?.Jul_Month_Value_v1}
        <hr className="hr0" />
        {item?.Jul_Month_Sale}
      </td>
      <td className="">
        {item?.Aug_Month_Value_v1}
        <hr className="hr0" />
        {item?.Aug_Month_Sale}
      </td>
      <td className="">
        {item?.Sep_Month_Value_v1}
        <hr className="hr0" />
        {item?.Sep_Month_Sale}
      </td>
      <td className="">
        {item?.Oct_Month_Value_v1}
        <hr className="hr0" />
        {item?.Oct_Month_Sale}
      </td>
      <td className="">
        {item?.Nov_Month_Value_v1}
        <hr className="hr0" />
        {item?.Nov_Month_Sale}
      </td>
      <td className="">
        {item?.Dec_Month_Value_v1}
        <hr className="hr0" />
        {item?.Dec_Month_Sale}
      </td>
      <td className="">
        {item?.Jan_Month_Value_v1}
        <hr className="hr0" />
        {item?.Jan_Month_Sale}
      </td>
      <td className="">
        {item?.Feb_Month_Value_v1}
        <hr className="hr0" />
        {item?.Feb_Month_Sale}
      </td>
      <td className="">
        {item?.Mar_Month_Value_v1}
        <hr className="hr0" />
        {item?.Mar_Month_Sale}
      </td>
    </tr>
  ));

  // Add a new row for total CY_Value and YTD_Value
  const totalRow = (
    <tr key="total" className="colrdrow">
      <td className="" colSpan={2}>
        Total
      </td>
      <td className="">{totalLYValue.toFixed(2)}</td>
      <td className="">
        {totalCYValue.toFixed(2)} <hr className="hr0" />
        {totalYTDValue.toFixed(2)}
        <span className="w3-text-gray ">
          ({((totalYTDValue / totalCYValue) * 100).toFixed(0)}%)
        </span>
      </td>
      <td className="">
        {totalAprValue?.toFixed(2)} <hr className="hr0" />
        {totalAprValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalMayValue?.toFixed(2)}
        <hr className="hr0" />
        {totalMayValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalJunValue?.toFixed(2)}
        <hr className="hr0" />
        {totalJunValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalJulValue?.toFixed(2)}
        <hr className="hr0" />
        {totalJulValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalAugValue?.toFixed(2)}
        <hr className="hr0" />
        {totalAugValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalSepValue?.toFixed(2)}
        <hr className="hr0" />
        {totalSepValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalOctValue?.toFixed(2)}
        <hr className="hr0" />
        {totalOctValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalNovValue?.toFixed(2)}
        <hr className="hr0" />
        {totalNovValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalDecValue?.toFixed(2)}
        <hr className="hr0" />
        {totalDecValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalJanValue?.toFixed(2)}
        <hr className="hr0" />
        {totalJanValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalFebValue?.toFixed(2)}
        <hr className="hr0" />
        {totalFebValue_v1?.toFixed(2)}
      </td>
      <td className="">
        {totalMarValue?.toFixed(2)}
        <hr className="hr0" />
        {totalMarValue_v1?.toFixed(2)}
      </td>
    </tr>
  );

  const tableWithTotalRow = [...tableRows, totalRow];

  return (
    <div id="mom-north" className="w3-row">
      <div id="mom-bar-north" className=" ">
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
