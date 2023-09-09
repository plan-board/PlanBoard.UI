import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";

const NationalZoneMonthSale = ({ selectedZone }) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const [zoneMonthPlan, setZoneMonthPlan] = useState([]);

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

  const totalCYValue = zoneMonthPlan.reduce(
    (acc, item) => acc + (item.CY_Value || 0),
    0
  );
  const totalYTDValue = zoneMonthPlan.reduce(
    (acc, item) => acc + (item.YTD_Value || 0),
    0
  );
  const totalAprValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Apr_Month_Value || 0),
    0
  );
  const totalAprValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Apr_Month_Value_v1 || 0),
    0
  );
  const totalMayValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.May_Month_Value || 0),
    0
  );
  const totalMayValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.May_Month_Value_v1 || 0),
    0
  );
  const totalJunValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Jun_Month_Value || 0),
    0
  );
  const totalJunValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Jun_Month_Value_v1 || 0),
    0
  );
  const totalJulValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Jul_Month_Value || 0),
    0
  );
  const totalJulValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Jul_Month_Value_v1 || 0),
    0
  );
  const totalAugValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Aug_Month_Value || 0),
    0
  );
  const totalAugValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Aug_Month_Value_v1 || 0),
    0
  );
  const totalSepValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Sep_Month_Value || 0),
    0
  );
  const totalSepValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Sep_Month_Value_v1 || 0),
    0
  );
  const totalOctValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Oct_Month_Value || 0),
    0
  );
  const totalOctValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Oct_Month_Value_v1 || 0),
    0
  );
  const totalNovValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Nov_Month_Value || 0),
    0
  );
  const totalNovValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Nov_Month_Value_v1 || 0),
    0
  );
  const totalDecValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Dec_Month_Value || 0),
    0
  );
  const totalDecValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Dec_Month_Value_v1 || 0),
    0
  );
  const totalJanValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Jan_Month_Value || 0),
    0
  );
  const totalJanValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Jan_Month_Value_v1 || 0),
    0
  );
  const totalFebValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Feb_Month_Value || 0),
    0
  );
  const totalFebValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Feb_Month_Value_v1 || 0),
    0
  );
  const totalMarValue = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Mar_Month_Value || 0),
    0
  );
  const totalMarValue_v1 = zoneMonthPlan?.reduce(
    (acc, item) => acc + (item?.Mar_Month_Value_v1 || 0),
    0
  );

  const tableRows = zoneMonthPlan.map((item, index) => (
    <tr key={index}>
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
        {item?.Apr_Month_Value}
        <hr className="hr0" />
        {item?.Apr_Month_Value_v1}
      </td>
      <td className="">
        {item?.May_Month_Value}
        <hr className="hr0" />
        {item?.May_Month_Value_v1}
      </td>
      <td className="">
        {item?.Jun_Month_Value}
        <hr className="hr0" />
        {item?.Jun_Month_Value_v1}
      </td>
      <td className="">
        {item?.Jul_Month_Value}
        <hr className="hr0" />
        {item?.Jul_Month_Value_v1}
      </td>
      <td className="">
        {item?.Aug_Month_Value}
        <hr className="hr0" />
        {item?.Aug_Month_Value_v1}
      </td>
      <td className="">
        {item?.Sep_Month_Value}
        <hr className="hr0" />
        {item?.Sep_Month_Value_v1}
      </td>
      <td className="">
        {item?.Oct_Month_Value}
        <hr className="hr0" />
        {item?.Oct_Month_Value_v1}
      </td>
      <td className="">
        {item?.Nov_Month_Value}
        <hr className="hr0" />
        {item?.Nov_Month_Value_v1}
      </td>
      <td className="">
        {item?.Dec_Month_Value}
        <hr className="hr0" />
        {item?.Dec_Month_Value_v1}
      </td>
      <td className="">
        {item?.Jan_Month_Value}
        <hr className="hr0" />
        {item?.Jan_Month_Value_v1}
      </td>
      <td className="">
        {item?.Feb_Month_Value}
        <hr className="hr0" />
        {item?.Feb_Month_Value_v1}
      </td>
      <td className="">
        {item?.Mar_Month_Value}
        <hr className="hr0" />
        {item?.Mar_Month_Value_v1}
      </td>
    </tr>
  ));

  // Add a new row for total CY_Value and YTD_Value
  const totalRow = (
    <tr key="total" className="colrdrow">
      <td className="" colSpan={2}>
        Total
      </td>
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
    <div id="mom-north" className="w3-row w3-margin-top ">
      <div id="mom-bar-north" className=" ">
        <table className="w3-table w3-stripped table-bordered">
          <tr>
            <td className="w3-red" rowspan="2">
              {" "}
              Zone{" "}
            </td>
            <td className="w3-red" rowspan="2">
              {" "}
              LY 22-23{" "}
            </td>
            <td className="w3-red" rowspan="2">
              {" "}
              Plan 2023 <hr className="hr0" /> YTD{" "}
            </td>

            <td className="w3-gray" colspan="12">
              {" "}
              Month Wise Plan{" "}
            </td>
          </tr>
          <tr>
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
              <td colSpan="12">
                <LoadingPlaceholder numberOfRows={4}></LoadingPlaceholder>
              </td>
            </tr>
          ) : (
            <>
              {zoneMonthPlan?.length === 0 ? (
                <tr>
                  <td colSpan="12">No data found</td>
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

export default NationalZoneMonthSale;
