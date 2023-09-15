import React, { useEffect, useState } from "react";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";

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
      <td>{item?.depot_name}</td>
      <td>{item?.territory_name}</td>
      <td>{item?.LY_Value?.toFixed(0)}</td>
      <td>{item?.LLY_Value?.toFixed(0)}</td>
      <td>{item?.CY_Value?.toFixed(0)} <hr className="hr0" />{item?.YTD_Value?.toFixed(0)}</td>
      <td>
        {item?.Apr_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Apr_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.May_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.May_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.Jun_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Jun_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.Jul_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Jul_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.Aug_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Aug_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.Sep_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Sep_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.Oct_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Oct_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.Nov_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Nov_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.Dec_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Dec_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.Jan_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Jan_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.Feb_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Feb_Month_Sale?.toFixed(0)}
      </td>
      <td>
        {item?.Mar_Month_Value_v1?.toFixed(0)}
        <hr className="hr0" />
        {item?.Mar_Month_Sale?.toFixed(0)}
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
        {totalLLYValue}
      </td>
      <td>
        {totalLYValue}
      </td>
      <td>
        {totalCYValue}
        <hr className="hr0" />
        {totalYTDValue}
      </td>
      <td>
        {totalAprValue}
        <hr className="hr0" />
        {totalAprValue_v1}
      </td>
      <td>
        {totalMayValue}
        <hr className="hr0" />
        {totalMayValue_v1}
      </td>
      <td>
        {totalJunValue}
        <hr className="hr0" />
        {totalJunValue_v1}
      </td>
      <td>
        {totalJulValue}
        <hr className="hr0" />
        {totalJulValue_v1}
      </td>
      <td>
        {totalAugValue}
        <hr className="hr0" />
        {totalAugValue_v1}
      </td>
      <td>
        {totalSepValue}
        <hr className="hr0" />
        {totalSepValue_v1}
      </td>
      <td>
        {totalOctValue}
        <hr className="hr0" />
        {totalOctValue_v1}
      </td>
      <td>
        {totalNovValue}
        <hr className="hr0" />
        {totalNovValue_v1}
      </td>
      <td>
        {totalDecValue}
        <hr className="hr0" />
        {totalDecValue_v1}
      </td>
      <td>
        {totalJanValue}
        <hr className="hr0" />
        {totalJanValue_v1}
      </td>
      <td>
        {totalFebValue}
        <hr className="hr0" />
        {totalFebValue_v1}
      </td>
      <td>
        {totalMarValue}
        <hr className="hr0" />
        {totalMarValue_v1}
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
