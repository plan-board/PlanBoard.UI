import React, { useEffect, useState } from "react";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";


const ReactTableFixedColumns = withFixedColumns(ReactTable);
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
  let sortedData = [...territoryMonthPlan, ];
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
      <td>{item?.depot_name}</td>
      <td>{item?.territory_name}</td>
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
    <div id="mom-north" className="w-100">
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
          <div className="tbl-container">
            <table className="table-bordered table-striped">
              <thead>
                <tr>
                  <th> S.No </th>
                  <th onClick={() => handleSort('Depot')}>Depot  {sortField === 'Depot' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th onClick={() => handleSort('Territory')}>Zone  {sortField === 'Territory' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th onClick={() => handleSort('LLY')}>LLY  {sortField === 'LLY' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th onClick={() => handleSort('LY')}>LY  {sortField === 'LY' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                  <th> CY Plan / YTD </th>
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
