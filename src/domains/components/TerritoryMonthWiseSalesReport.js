import React, { useEffect, useState } from "react";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import ExportExcel from "../ExportExcel";
import { GetPercent, fNWCommas, getMonths } from "../../utils/utils";

const itemsPerPage = 10; // Number of items to display per page

const TerritoryMonthWiseSalesReport = ({ selectedDepot }) => {
  const dispatch = useDispatch();
  const [territoryMonthPlan, setTerritoryMonthPlan] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState(''); // To store the current sorting field (empty for no sorting)
  const [sortDirection, setSortDirection] = useState(''); // To store the current sorting direction ('asc' or 'desc')

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      DepotId: selectedDepot,
      TerritoryId: 0, //selectedZone
    };
    const fetchTerritoryMonthPlan = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post(
          "TerritoryMonthPlan",
          payload
        );
        console.log("=====TerritoryMonthPlan====", response);

        if (response?.status === 200) {
          setTerritoryMonthPlan(
            response.data.Data != null ? response.data.Data : []
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    fetchTerritoryMonthPlan();
  }, [selectedDepot]);

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
  let sortedData = [...territoryMonthPlan,];
  if (sortField === 'Depot') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.depot_name?.localeCompare(b.depot_name);
      } else {
        return b.depot_name?.localeCompare(a.depot_name);
      }
    });
  } else if (sortField === 'Territory') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.territory_name?.localeCompare(b.territory_name);
      } else {
        return b.territory_name?.localeCompare(a.territory_name);
      }
    });
  } else if (sortField === 'LLY') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return (a.LLY_Value || 0) - (b.LLY_Value || 0);
      } else {
        return (b.LLY_Value || 0) - (a.LLY_Value || 0);
      }
    });
  }
  else if (sortField === 'LY') {
    sortedData.sort((a, b) => {
      if (sortDirection === 'asc') {
        return (a.LY_Value || 0) - (b.LY_Value || 0);
      } else {
        return (b.LY_Value || 0) - (a.LY_Value || 0);
      }
    });
  }

  const filterData = (data) => {
    const filterTextLowerCase = filterText.toLowerCase();
    return data.filter((item) => (
      (item?.zone_name && item?.zone_name?.toLowerCase().includes(filterTextLowerCase)) ||
      (item?.depot_name && item?.depot_name?.toLowerCase().includes(filterTextLowerCase)) ||
      (!isNaN(item.LLY_Value) && item?.LLY_Value.toString().toLowerCase().includes(filterTextLowerCase)) ||
      (!isNaN(item.LY_Value) && item?.LY_Value.toString().toLowerCase().includes(filterTextLowerCase))
    ));
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

  const totalLLYValue = filteredItems.reduce(
    (acc, item) => acc + (parseInt(item.LLY_Value.toFixed(0)) || 0),
    0
  );
  const totalLYValue = filteredItems.reduce(
    (acc, item) => acc + (parseInt(item.LY_Value.toFixed(0)) || 0),
    0
  );
  const totalCYValue = filteredItems.reduce(
    (acc, item) => acc + (parseInt(item.CY_Value.toFixed(0)) || 0),
    0
  );
  const totalYTDValue = filteredItems.reduce(
    (acc, item) => acc + (parseInt(item.YTD_Value.toFixed(0)) || 0),
    0
  );
  const totalAprValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Apr_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalAprValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Apr_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalMayValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.May_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalMayValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.May_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalJunValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Jun_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalJunValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Jun_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalJulValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Jul_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalJulValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Jul_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalAugValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Aug_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalAugValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Aug_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalSepValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Sep_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalSepValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Sep_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalOctValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Oct_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalOctValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Oct_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalNovValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Nov_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalNovValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Nov_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalDecValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Dec_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalDecValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Dec_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalJanValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Jan_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalJanValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Jan_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalFebValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Feb_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalFebValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Feb_Month_Sale.toFixed(0)) || 0),
    0
  );
  const totalMarValue = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Mar_Month_Value_v1.toFixed(0)) || 0),
    0
  );
  const totalMarValue_v1 = filteredItems?.reduce(
    (acc, item) => acc + (parseInt(item?.Mar_Month_Sale.toFixed(0)) || 0),
    0
  );

  const tableRows = filteredItems.map((item, index) => (
    <tr key={index}>
      <td>{++index}</td>
      <td>{item?.depot_name}</td>
      <td>{item?.territory_name}</td>
      <td>{fNWCommas(item?.LY_Value)}</td>
      <td>{fNWCommas(item?.LLY_Value)}</td>
      <td>{fNWCommas(item?.CY_Value)} <hr className="hr0" />{fNWCommas(item?.YTD_Value)}</td>
    </tr>
  ));

  // Add a new row for total CY_Value and YTD_Value
  const totalRow = (
    <tr key="total" className="totalRow">
      <td colSpan={3}>
        Total
      </td>
      <td>
        {fNWCommas(totalLLYValue)}
      </td>
      <td>
        {fNWCommas(totalLYValue)}
      </td>
      <td>
        {fNWCommas(totalCYValue)}
        <hr className="hr0" />
        {fNWCommas(totalYTDValue)}
        {GetPercent(totalYTDValue, totalCYValue)}
      </td>
    </tr>
  );

  const tableRows2 = filteredItems.map((item, index) => (
    <tr key={index}>
      {getMonths().map((month) => (
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
  const totalRow2 = (
    <tr key="total" className="totalRow">
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
  const tableWithTotalRow2 = [...tableRows2, totalRow2];

  const handleExportClick = () => {
    const arrObj = sortedData.map((element, index) => ({
      "S.No": index + 1,
      "Depot": element.depot_name,
      "Zone": element.zone_name,
      "LLY": element.LLY_Value,
      "LY": element.LY_Value,
      "CY Plan": element.CY_Value,
      "YTD": element.YTD_Value,
      "Apr": element.Apr_Month_Value_v1,
      "Apr Sale": element.Apr_Month_Sale,
      "May": element.May_Month_Value_v1,
      "May Sale": element.May_Month_Sale,
      "Jun": element.Jun_Month_Value_v1,
      "Jun Sale": element.Jun_Month_Sale,
      "Jul": element.Jul_Month_Value_v1,
      "Jul Sale": element.Jul_Month_Sale,
      "Aug": element.Aug_Month_Value_v1,
      "Aug Sale": element.Aug_Month_Sale,
      "Sep": element.Sep_Month_Value_v1,
      "Sep Sale": element.Sep_Month_Sale,
      "Oct": element.Oct_Month_Value_v1,
      "Oct Sale": element.Oct_Month_Sale,
      "Nov": element.Nov_Month_Value_v1,
      "Nov Sale": element.Nov_Month_Sale,
      "Dec": element.Dec_Month_Value_v1,
      "Dec Sale": element.Dec_Month_Sale,
      "Jan": element.Jan_Month_Value_v1,
      "Jan Sale": element.Feb_Month_Sale,
      "Feb": element.Feb_Month_Value_v1,
      "Feb Sale": element.Feb_Month_Sale,
      "Mar": element.Mar_Month_Value_v1,
      "Mar Sale": element.Mar_Month_Sale
    }));
    console.log("-arrObj", arrObj)
    ExportExcel('Territory-Wise-Monthly-Plan-Achievement', arrObj)
  };

  return (
    <div id="mom-north" className="w-100">
      {filteredItems?.length ? (<div><button className="w3-btn w3-gray" onClick={handleExportClick}> Export</button></div>) : null}

      <div id="mom-bar-north" className="row">
        <div className="one-half mt-3">
          <input className="w3-margin-bottom w3-input w3-border "
            type="text"
            placeholder="Filter By Territory, Depot, LLY and LY"
            aria-label="Search Input"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="full">
          <div className="table-container ">
            <table border="table-bordered table-striped" style={{ width: "75%" }}>
              <thead>
                <tr>
                  <th> S.No </th>
                  <th onClick={() => handleSort('Depot')}>Depot  {sortField === 'Depot' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th onClick={() => handleSort('Territory')}>Zone  {sortField === 'Territory' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th onClick={() => handleSort('LLY')}>LLY  {sortField === 'LLY' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th onClick={() => handleSort('LY')}>LY  {sortField === 'LY' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th> CY Plan / YTD </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6">
                      <LoadingPlaceholder numberOfRows={4}></LoadingPlaceholder>
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredItems?.length === 0 ? (
                      <tr>
                        <td colSpan="6">No data found</td>
                      </tr>
                    ) : (
                      tableWithTotalRow
                    )}
                  </>
                )}
              </tbody>
            </table>
            <div class="table-scroll">
              <table border="1" className="scrollable-container table-bordered table-striped" >
                <thead>
                  <tr>
                    {getMonths().map((month) => (
                      <td>{month}</td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="12">
                        <LoadingPlaceholder numberOfRows={4}></LoadingPlaceholder>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {filteredItems?.length === 0 ? (
                        <tr>
                          <td colSpan="12">No data found</td>
                        </tr>
                      ) : (
                        tableWithTotalRow2
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`page-button ${currentPage === index ? "active" : ""}`}
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

export default TerritoryMonthWiseSalesReport;
