import React, { useEffect, useState } from "react";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";

import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import ExportExcel from "../ExportExcel";
import { GetPercent, fNWCommas, getMoths } from "../../utils/utils";

const itemsPerPage = 10; // Number of items to display per page

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
  const [sortField, setSortField] = useState(""); // To store the current sorting field (empty for no sorting)
  const [sortDirection, setSortDirection] = useState(""); // To store the current sorting direction ('asc' or 'desc')

  const [currentPage, setCurrentPage] = useState(0);

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

  const handleSort = (field) => {
    if (sortField === field) {
      // If the same column is clicked again, toggle the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set the new sort field and direction
      setSortField(field);
      setSortDirection("asc"); // Default to ascending order
    }
  };

  // Sort the data based on the current sorting field and direction
  let sortedData = [...monthWiseSalesData];
  if (sortField === "Zone") {
    sortedData.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.zone_name?.localeCompare(b.zone_name);
      } else {
        return b.zone_name?.localeCompare(a.zone_name);
      }
    });
  } else if (sortField === "Depot") {
    sortedData.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.depot_name?.localeCompare(b.depot_name);
      } else {
        return b.depot_name?.localeCompare(a.depot_name);
      }
    });
  } else if (sortField === "LLY") {
    sortedData.sort((a, b) => {
      if (sortDirection === "asc") {
        return (a.LLY_Value || 0) - (b.LLY_Value || 0);
      } else {
        return (b.LLY_Value || 0) - (a.LLY_Value || 0);
      }
    });
  } else if (sortField === "LY") {
    sortedData.sort((a, b) => {
      if (sortDirection === "asc") {
        return (a.LY_Value || 0) - (b.LY_Value || 0);
      } else {
        return (b.LY_Value || 0) - (a.LY_Value || 0);
      }
    });
  }

  const filterData = (data) => {
    const filterTextLowerCase = filterText.toLowerCase();
    return data.filter(
      (item) =>
        (item?.zone_name &&
          item?.zone_name?.toLowerCase().includes(filterTextLowerCase)) ||
        (item?.depot_name &&
          item?.depot_name?.toLowerCase().includes(filterTextLowerCase)) ||
        (!isNaN(item.LLY_Value) &&
          item?.LLY_Value.toString()
            .toLowerCase()
            .includes(filterTextLowerCase)) ||
        (!isNaN(item.LY_Value) &&
          item?.LY_Value.toString().toLowerCase().includes(filterTextLowerCase))
    );
  };

  // Paginate the sorted data
  const pageCount = Math.ceil(sortedData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const dataToShow = sortedData.slice(offset, offset + itemsPerPage);

  // Filter the paginated and sorted data
  const filteredItems = filterData(dataToShow);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalLYValue = filteredItems.reduce(
    (acc, item) => acc + (parseInt(item.LY_Value.toFixed(0)) || 0),
    0
  );
  const totalLLYValue = filteredItems.reduce(
    (acc, item) => acc + (parseInt(item.LLY_Value.toFixed(0)) || 0),
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

  const tableRows = filteredItems.map((item, index) => (
    <tr key={index}>
      <td>{++index}</td>
      <td>{item?.zone_name}</td>
      <td>{item?.depot_name}</td>
      <td>{fNWCommas(item?.LLY_Value)}</td>
      <td>{fNWCommas(item?.LY_Value)}</td>
      <td>
        {fNWCommas(item?.CY_Value)} <hr className="hr0" />
        {fNWCommas(item?.YTD_Value)}
      </td>
      {getMoths().map((month) => (
        <td key={month}>
          {fNWCommas(item[`${month}_Month_Value_v1`])}
          <hr className="hr0" />
          {fNWCommas(item[`${month}_Month_Sale`])}
          {GetPercent(
            item[`${month}_Month_Sale`],
            item[`${month}_Month_Value_v1`]
          )}
        </td>
      ))}
    </tr>
  ));

  // Add a new row for total CY_Value and YTD_Value
  const totalRow = (
    <tr key="total" className="totalRow">
      <td colSpan={3}>Total</td>
      <td>{fNWCommas(totalLLYValue)}</td>
      <td>{fNWCommas(totalLYValue)}</td>
      <td>
        {fNWCommas(totalCYValue)}
        <hr className="hr0" />
        {fNWCommas(totalYTDValue)}
        {GetPercent(totalYTDValue, totalCYValue)}
      </td>
      <td>
        {fNWCommas(totalAprValue)}
        <hr className="hr0" />
        {fNWCommas(totalAprValue_v1)}
        {GetPercent(totalAprValue_v1, totalAprValue)}
      </td>
      <td>
        {fNWCommas(totalMayValue)}
        <hr className="hr0" />
        {fNWCommas(totalMayValue_v1)}
        {GetPercent(totalMayValue_v1, totalMayValue)}
      </td>
      <td>
        {fNWCommas(totalJunValue)}
        <hr className="hr0" />
        {fNWCommas(totalJunValue_v1)}
        {GetPercent(totalJunValue_v1, totalJunValue)}
      </td>
      <td>
        {fNWCommas(totalJulValue)}
        <hr className="hr0" />
        {fNWCommas(totalJulValue_v1)}
        {GetPercent(totalJulValue_v1, totalJulValue)}
      </td>
      <td>
        {fNWCommas(totalAugValue)}
        <hr className="hr0" />
        {fNWCommas(totalAugValue_v1)}
        {GetPercent(totalAugValue_v1, totalAugValue)}
      </td>
      <td>
        {fNWCommas(totalSepValue)}
        <hr className="hr0" />
        {fNWCommas(totalSepValue_v1)}
        {GetPercent(totalSepValue_v1, totalSepValue)}
      </td>
      <td>
        {fNWCommas(totalOctValue)}
        <hr className="hr0" />
        {fNWCommas(totalOctValue_v1)}
        {GetPercent(totalOctValue_v1, totalOctValue)}
      </td>
      <td>
        {fNWCommas(totalNovValue)}
        <hr className="hr0" />
        {fNWCommas(totalNovValue_v1)}
        {GetPercent(totalNovValue_v1, totalNovValue)}
      </td>
      <td>
        {fNWCommas(totalDecValue)}
        <hr className="hr0" />
        {fNWCommas(totalDecValue_v1)}
        {GetPercent(totalDecValue_v1, totalDecValue)}
      </td>
      <td>
        {fNWCommas(totalJanValue)}
        <hr className="hr0" />
        {fNWCommas(totalJanValue_v1)}
        {GetPercent(totalJanValue_v1, totalJanValue)}
      </td>
      <td>
        {fNWCommas(totalFebValue)}
        <hr className="hr0" />
        {fNWCommas(totalFebValue_v1)}
        {GetPercent(totalFebValue_v1, totalFebValue)}
      </td>
      <td>
        {fNWCommas(totalMarValue)}
        <hr className="hr0" />
        {fNWCommas(totalMarValue_v1)}
        {GetPercent(totalMarValue_v1, totalMarValue)}
      </td>
    </tr>
  );

  const tableWithTotalRow = [...tableRows, totalRow];

  const handleExportClick = () => {
    const arrObj = monthWiseSalesData.map((element, index) => ({
      "S.No": index + 1,
      Zone: element.zone_name,
      Depot: element.depot_name,
      LLY: parseInt(element.LLY_Value).toFixed(0),
      LY: parseInt(element.LY_Value).toFixed(0),
      "CY Plan": parseInt(element.CY_Value).toFixed(0),
      YTD: parseInt(element.YTD_Value).toFixed(0),
      Apr: parseInt(element.Apr_Month_Value_v1).toFixed(0),
      "Apr Sale": parseInt(element.Apr_Month_Sale).toFixed(0),
      May: parseInt(element.May_Month_Value_v1).toFixed(0),
      "May Sale": parseInt(element.May_Month_Sale).toFixed(0),
      Jun: parseInt(element.Jun_Month_Value_v1).toFixed(0),
      "Jun Sale": parseInt(element.Jun_Month_Sale).toFixed(0),
      Jul: parseInt(element.Jul_Month_Value_v1).toFixed(0),
      "Jul Sale": parseInt(element.Jul_Month_Sale).toFixed(0),
      Aug: parseInt(element.Aug_Month_Value_v1).toFixed(0),
      "Aug Sale": parseInt(element.Aug_Month_Sale).toFixed(0),
      Sep: parseInt(element.Sep_Month_Value_v1).toFixed(0),
      "Sep Sale": parseInt(element.Sep_Month_Sale).toFixed(0),
      Oct: parseInt(element.Oct_Month_Value_v1).toFixed(0),
      "Oct Sale": parseInt(element.Oct_Month_Sale).toFixed(0),
      Nov: parseInt(element.Nov_Month_Value_v1).toFixed(0),
      "Nov Sale": parseInt(element.Nov_Month_Sale).toFixed(0),
      Dec: parseInt(element.Dec_Month_Value_v1).toFixed(0),
      "Dec Sale": parseInt(element.Dec_Month_Sale).toFixed(0),
      Jan: parseInt(element.Jan_Month_Value_v1).toFixed(0),
      "Jan Sale": parseInt(element.Feb_Month_Sale).toFixed(0),
      Feb: parseInt(element.Feb_Month_Value_v1).toFixed(0),
      "Feb Sale": parseInt(element.Feb_Month_Sale).toFixed(0),
      Mar: parseInt(element.Mar_Month_Value_v1).toFixed(0),
      "Mar Sale": parseInt(element.Mar_Month_Sale).toFixed(0),
    }));
    console.log("-arrObj", arrObj);
    ExportExcel("Depot-Wise-Monthly-Plan-Achievement", arrObj);
  };

  return (
    <div id="mom-north" className="row">
      {monthWiseSalesData?.length ? (
        <div style={{ marginLeft: "15px" }}>
          <button onClick={handleExportClick} className="green_button_css">
            {" "}
            <i className="fa fa-pdf">Export</i>
          </button>
        </div>
      ) : null}

      <div id="mom-bar-north" className="w-100">
        <div className="one-half mt-3">
          <input
            className="w3-margin-bottom w3-input w3-border "
            type="text"
            placeholder="Filter By Zone, Depot, LLY, LY "
            aria-label="Search Input"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="full">
          <div className="tbl-container">
            <table className="table-bordered table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th onClick={() => handleSort("Zone")}>
                    Zone{" "}
                    {sortField === "Zone" &&
                      (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => handleSort("Depot")}>
                    Depot{" "}
                    {sortField === "Depot" &&
                      (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => handleSort("LLY")}>
                    LLY{" "}
                    {sortField === "LLY" &&
                      (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => handleSort("LY")}>
                    LY{" "}
                    {sortField === "LY" &&
                      (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                  <th>CY Plan / YTD</th>
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
              </tbody>
            </table>
          </div>
        </div>
        <div className="full">
          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`page-button ${
                  currentPage === index ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepoMonthWiseSalesReport;
